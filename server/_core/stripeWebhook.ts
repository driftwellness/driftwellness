import Stripe from 'stripe';
import { getDb } from '../db';
import { subscriptions } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { sendSubscriptionReceipt, sendPaymentFailedNotification } from './emailReceipts';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function handleStripeWebhook(event: Stripe.Event) {
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return { received: true };
  } catch (error) {
    console.error('Webhook error:', error);
    throw error;
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  const priceId = session.metadata?.priceId;

  if (!userId || !priceId) {
    console.error('Missing userId or priceId in session metadata');
    return;
  }

  const db = await getDb();
  if (!db) {
    console.error('Database not available');
    return;
  }

  // Create subscription record
  await db
    .insert(subscriptions)
    .values({
      userId: parseInt(userId),
      stripeCustomerId: session.customer as string,
      stripeSubscriptionId: session.subscription as string,
      stripePriceId: priceId,
      status: 'active',
    });

  // Determine plan name and donation amount
  const planMap: Record<string, { name: string; price: number; donation: number }> = {
    'req_oVa0P4RQRFd9la': { name: 'Standard', price: 0, donation: 0 },
    'req_M6MWuNq2YYWSVQ': { name: 'Premium', price: 299, donation: 50 },
    'req_wVuVfy6PQ32LaR': { name: 'Impact', price: 349, donation: 100 },
  };

  const planInfo = planMap[priceId] || { name: 'Unknown', price: 0, donation: 0 };
  const now = new Date();
  const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  // Send receipt email
  await sendSubscriptionReceipt({
    userId: parseInt(userId),
    planName: planInfo.name,
    planPrice: planInfo.price,
    transactionId: session.id,
    billingPeriodStart: now,
    billingPeriodEnd: endDate,
    donationAmount: planInfo.donation > 0 ? planInfo.donation : undefined,
  });

  console.log(`Subscription created for user ${userId} with price ${priceId}`);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const db = await getDb();
  if (!db) {
    console.error('Database not available');
    return;
  }

  const status = subscription.status === 'active' ? 'active' : subscription.status;

  await db
    .update(subscriptions)
    .set({ status })
    .where(eq(subscriptions.stripeSubscriptionId, subscription.id));

  console.log(`Subscription ${subscription.id} updated to ${status}`);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const db = await getDb();
  if (!db) {
    console.error('Database not available');
    return;
  }

  await db
    .update(subscriptions)
    .set({ status: 'canceled' })
    .where(eq(subscriptions.stripeSubscriptionId, subscription.id));

  console.log(`Subscription ${subscription.id} cancelled`);
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log(`Payment succeeded for invoice ${invoice.id}`);
  // Could send email receipt here
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log(`Payment failed for invoice ${invoice.id}`);
  
  // Find subscription and send notification
  const db = await getDb();
  if (!db) return;

  try {
    const subscriptionId = (invoice as any).subscription as string;
    if (!subscriptionId) return;

    const subscription = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.stripeSubscriptionId, subscriptionId))
      .limit(1);

    if (subscription && subscription.length > 0) {
      const planMap: Record<string, string> = {
        'req_oVa0P4RQRFd9la': 'Standard',
        'req_M6MWuNq2YYWSVQ': 'Premium',
        'req_wVuVfy6PQ32LaR': 'Impact',
      };
      const planName = planMap[subscription[0].stripePriceId] || 'Unknown';
      await sendPaymentFailedNotification(subscription[0].userId, planName);
    }
  } catch (error) {
    console.error('Error handling payment failed:', error);
  }
}

export async function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
): Promise<Stripe.Event> {
  return stripe.webhooks.constructEvent(body, signature, secret);
}
