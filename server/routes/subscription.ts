import { Router } from 'express';
import Stripe from 'stripe';
import { getDb } from '../db';
import { subscriptions, users } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

// Pricing plan IDs (these should match your Stripe product/price IDs)
const PRICE_IDS = {
  standard_monthly: process.env.STRIPE_STANDARD_MONTHLY_PRICE_ID || 'price_standard_monthly',
  premium_monthly: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID || 'price_premium_monthly',
  impact_monthly: process.env.STRIPE_IMPACT_MONTHLY_PRICE_ID || 'price_impact_monthly',
  standard_yearly: process.env.STRIPE_STANDARD_YEARLY_PRICE_ID || 'price_standard_yearly',
  premium_yearly: process.env.STRIPE_PREMIUM_YEARLY_PRICE_ID || 'price_premium_yearly',
  impact_yearly: process.env.STRIPE_IMPACT_YEARLY_PRICE_ID || 'price_impact_yearly',
};

/**
 * Create Stripe checkout session for subscription
 */
router.post('/create-subscription-checkout', async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: 'Database not available' });
    }

    const { planId, billingPeriod } = req.body;
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get or create Stripe customer
    let stripeCustomerId = user.stripeCustomerId;
    
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email || undefined,
        name: user.name || undefined,
        metadata: {
          userId: user.id.toString(),
        },
      });
      stripeCustomerId = customer.id;

      // Update user with Stripe customer ID
      await db.update(users)
        .set({ stripeCustomerId })
        .where(eq(users.id, user.id));
    }

    // Determine price ID based on plan and billing period
    const priceKey = `${planId}_${billingPeriod}` as keyof typeof PRICE_IDS;
    const priceId = PRICE_IDS[priceKey];

    if (!priceId) {
      return res.status(400).json({ error: 'Invalid plan or billing period' });
    }

    // Create checkout session with 7-day trial
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      subscription_data: {
        trial_period_days: 7,
        metadata: {
          userId: user.id.toString(),
          planId,
        },
      },
      success_url: `${req.protocol}://${req.get('host')}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.protocol}://${req.get('host')}/pricing`,
      metadata: {
        userId: user.id.toString(),
        planId,
      },
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error('Subscription checkout error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Create Stripe customer portal session for subscription management
 */
router.post('/create-portal-session', async (req, res) => {
  try {
    const user = (req as any).user;

    if (!user || !user.stripeCustomerId) {
      return res.status(401).json({ error: 'No subscription found' });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${req.protocol}://${req.get('host')}/settings`,
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error('Portal session error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get current user's subscription status
 */
router.get('/status', async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: 'Database not available' });
    }

    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get subscription from database
    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, user.id))
      .limit(1);

    if (!subscription) {
      return res.json({ subscription: null });
    }

    // If we have a Stripe subscription ID, fetch latest data from Stripe
    if (subscription.stripeSubscriptionId) {
      try {
        const stripeSubscription = await stripe.subscriptions.retrieve(
          subscription.stripeSubscriptionId
        );

        // Update local database with latest Stripe data
        await db.update(subscriptions)
          .set({
            status: stripeSubscription.status,
          })
          .where(eq(subscriptions.id, subscription.id));

        return res.json({
          subscription: {
            ...subscription,
            status: stripeSubscription.status,
            currentPeriodEnd: (stripeSubscription as any).current_period_end,
            cancelAtPeriodEnd: (stripeSubscription as any).cancel_at_period_end,
          },
        });
      } catch (stripeError) {
        console.error('Error fetching Stripe subscription:', stripeError);
        // Fall back to database data
      }
    }

    res.json({ subscription });
  } catch (error: any) {
    console.error('Subscription status error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
