import { getDb } from '../db';
import { users } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

interface ReceiptData {
  userId: number;
  planName: string;
  planPrice: number;
  transactionId: string;
  billingPeriodStart: Date;
  billingPeriodEnd: Date;
  donationAmount?: number;
}

/**
 * Generate HTML email receipt for subscription
 */
function generateReceiptHTML(data: ReceiptData, userEmail: string): string {
  const startDate = data.billingPeriodStart.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const endDate = data.billingPeriodEnd.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8B4513 0%, #D4AF37 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 32px; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .receipt-item { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #D4AF37; }
        .receipt-item-label { color: #666; font-size: 12px; text-transform: uppercase; }
        .receipt-item-value { font-size: 18px; font-weight: bold; color: #333; margin-top: 5px; }
        .total { background: white; padding: 20px; margin: 20px 0; border: 2px solid #D4AF37; border-radius: 4px; text-align: center; }
        .total-label { color: #666; font-size: 14px; }
        .total-value { font-size: 28px; font-weight: bold; color: #8B4513; margin-top: 10px; }
        .features { background: white; padding: 20px; margin: 20px 0; border-radius: 4px; }
        .features h3 { margin-top: 0; color: #8B4513; }
        .features ul { list-style: none; padding: 0; }
        .features li { padding: 8px 0; border-bottom: 1px solid #eee; }
        .features li:before { content: "✓ "; color: #4CAF50; font-weight: bold; margin-right: 8px; }
        .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
        .donation-note { background: #e8f5e9; padding: 15px; border-radius: 4px; margin: 20px 0; }
        .donation-note p { margin: 0; color: #2e7d32; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to Drift</h1>
          <p>Your subscription is confirmed!</p>
        </div>
        
        <div class="content">
          <p>Thank you for subscribing to Drift! Your journey to tranquility begins now.</p>
          
          <div class="receipt-item">
            <div class="receipt-item-label">Subscription Plan</div>
            <div class="receipt-item-value">${data.planName}</div>
          </div>
          
          <div class="receipt-item">
            <div class="receipt-item-label">Billing Period</div>
            <div class="receipt-item-value">${startDate} - ${endDate}</div>
          </div>
          
          <div class="receipt-item">
            <div class="receipt-item-label">Transaction ID</div>
            <div class="receipt-item-value">${data.transactionId}</div>
          </div>
          
          <div class="total">
            <div class="total-label">Amount Charged</div>
            <div class="total-value">${data.planPrice} NOK</div>
          </div>
          
          ${
            data.donationAmount
              ? `
            <div class="donation-note">
              <p>🌊 <strong>${data.donationAmount} NOK</strong> from your subscription will be donated to clean water projects!</p>
            </div>
          `
              : ''
          }
          
          <div class="features">
            <h3>What's Included</h3>
            <ul>
              ${
                data.planName === 'Premium'
                  ? `
                <li>All 5 audiobook chapters</li>
                <li>AI Wellness Coach (Maria)</li>
                <li>Daily inspirational poems</li>
                <li>Personalized meditation recommendations</li>
                <li>Priority support</li>
              `
                  : data.planName === 'Impact'
                    ? `
                <li>All Premium features</li>
                <li>Clean Water Champion badge</li>
                <li>Monthly impact report with photos</li>
                <li>Vote on future donation projects</li>
                <li>Exclusive community access</li>
              `
                    : `
                <li>Chapter 1 of guided audiobook</li>
                <li>New Year Calendar (31 days)</li>
                <li>Shop access with pre-orders</li>
              `
              }
            </ul>
          </div>
          
          <p style="margin-top: 30px;">
            <strong>Next Steps:</strong><br>
            1. Log in to your Drift account<br>
            2. Visit your subscription dashboard to manage your plan<br>
            3. Start exploring your new features!
          </p>
          
          <p style="margin-top: 20px;">
            Questions? Contact us at <strong>support@driftapp.no</strong>
          </p>
        </div>
        
        <div class="footer">
          <p>© 2025 Drift. All rights reserved.</p>
          <p>This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Send subscription receipt email
 */
export async function sendSubscriptionReceipt(receiptData: ReceiptData): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.error('Database not available for sending receipt');
    return;
  }

  try {
    // Get user email
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, receiptData.userId))
      .limit(1);

    if (!user || user.length === 0) {
      console.error(`User ${receiptData.userId} not found`);
      return;
    }

    const userEmail = user[0].email;
    if (!userEmail) {
      console.error(`User ${receiptData.userId} has no email`);
      return;
    }

    const htmlContent = generateReceiptHTML(receiptData, userEmail);

    // Log receipt (in production, integrate with SendGrid/Resend)
    console.log(`📧 Receipt Email Queued for ${userEmail}`);
    console.log(`   Plan: ${receiptData.planName}`);
    console.log(`   Amount: ${receiptData.planPrice} NOK`);
    console.log(`   Period: ${receiptData.billingPeriodStart.toISOString()} - ${receiptData.billingPeriodEnd.toISOString()}`);

    // TODO: Integrate with SendGrid or Resend
    // const response = await sendgrid.send({
    //   to: userEmail,
    //   from: 'noreply@driftapp.no',
    //   subject: `Drift Subscription Confirmation - ${receiptData.planName}`,
    //   html: htmlContent,
    // });
  } catch (error) {
    console.error('Error sending subscription receipt:', error);
  }
}

/**
 * Send payment failed notification
 */
export async function sendPaymentFailedNotification(userId: number, planName: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.error('Database not available for sending notification');
    return;
  }

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user || user.length === 0) {
      console.error(`User ${userId} not found`);
      return;
    }

    const userEmail = user[0].email;
    if (!userEmail) {
      console.error(`User ${userId} has no email`);
      return;
    }

    console.log(`📧 Payment Failed Notification Queued for ${userEmail}`);
    console.log(`   Plan: ${planName}`);
    console.log(`   Action Required: Update payment method`);

    // TODO: Send email via SendGrid/Resend
  } catch (error) {
    console.error('Error sending payment failed notification:', error);
  }
}

/**
 * Send subscription renewal reminder
 */
export async function sendRenewalReminder(userId: number, planName: string, renewalDate: Date): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.error('Database not available for sending reminder');
    return;
  }

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user || user.length === 0) {
      console.error(`User ${userId} not found`);
      return;
    }

    const userEmail = user[0].email;
    if (!userEmail) {
      console.error(`User ${userId} has no email`);
      return;
    }

    const renewalDateStr = renewalDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    console.log(`📧 Renewal Reminder Queued for ${userEmail}`);
    console.log(`   Plan: ${planName}`);
    console.log(`   Renewal Date: ${renewalDateStr}`);

    // TODO: Send email via SendGrid/Resend
  } catch (error) {
    console.error('Error sending renewal reminder:', error);
  }
}
