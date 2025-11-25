import { describe, it, expect } from 'vitest';
import Stripe from 'stripe';

describe('Stripe Integration', () => {
  it('should validate Stripe API keys', async () => {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

    // Check that keys exist
    expect(stripeSecretKey).toBeDefined();
    expect(stripePublishableKey).toBeDefined();
    
    // Check key format
    expect(stripeSecretKey).toMatch(/^sk_test_/);
    expect(stripePublishableKey).toMatch(/^pk_test_/);

    // Validate secret key by making a lightweight API call
    const stripe = new Stripe(stripeSecretKey!, {
      apiVersion: '2025-11-17.clover',
    });

    // Try to retrieve account info - this will fail if key is invalid
    const account = await stripe.balance.retrieve();
    
    expect(account).toBeDefined();
    expect(account.object).toBe('balance');
  });
});
