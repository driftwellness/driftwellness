import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleStripeWebhook } from './stripeWebhook';
import Stripe from 'stripe';

// Mock the database
vi.mock('../db', () => ({
  getDb: vi.fn(),
}));

describe('Stripe Webhook Handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle checkout.session.completed event', async () => {
    const event: Stripe.Event = {
      id: 'evt_test',
      object: 'event',
      api_version: '2025-11-17.clover',
      created: Math.floor(Date.now() / 1000),
      data: {
        object: {
          id: 'cs_test',
          object: 'checkout.session',
          customer: 'cus_test',
          subscription: 'sub_test',
          metadata: {
            userId: '1',
            priceId: 'price_test',
          },
        } as any,
      },
      livemode: false,
      pending_webhooks: 0,
      request: {
        id: null,
        idempotency_key: null,
      },
      type: 'checkout.session.completed',
    };

    const result = await handleStripeWebhook(event);
    expect(result).toEqual({ received: true });
  });

  it('should handle customer.subscription.updated event', async () => {
    const event: Stripe.Event = {
      id: 'evt_test',
      object: 'event',
      api_version: '2025-11-17.clover',
      created: Math.floor(Date.now() / 1000),
      data: {
        object: {
          id: 'sub_test',
          object: 'subscription',
          status: 'active',
          metadata: {
            userId: '1',
          },
        } as any,
      },
      livemode: false,
      pending_webhooks: 0,
      request: {
        id: null,
        idempotency_key: null,
      },
      type: 'customer.subscription.updated',
    };

    const result = await handleStripeWebhook(event);
    expect(result).toEqual({ received: true });
  });

  it('should handle customer.subscription.deleted event', async () => {
    const event: Stripe.Event = {
      id: 'evt_test',
      object: 'event',
      api_version: '2025-11-17.clover',
      created: Math.floor(Date.now() / 1000),
      data: {
        object: {
          id: 'sub_test',
          object: 'subscription',
          status: 'canceled',
          metadata: {
            userId: '1',
          },
        } as any,
      },
      livemode: false,
      pending_webhooks: 0,
      request: {
        id: null,
        idempotency_key: null,
      },
      type: 'customer.subscription.deleted',
    };

    const result = await handleStripeWebhook(event);
    expect(result).toEqual({ received: true });
  });

  it('should handle invoice.payment_succeeded event', async () => {
    const event: Stripe.Event = {
      id: 'evt_test',
      object: 'event',
      api_version: '2025-11-17.clover',
      created: Math.floor(Date.now() / 1000),
      data: {
        object: {
          id: 'in_test',
          object: 'invoice',
          status: 'paid',
        } as any,
      },
      livemode: false,
      pending_webhooks: 0,
      request: {
        id: null,
        idempotency_key: null,
      },
      type: 'invoice.payment_succeeded',
    };

    const result = await handleStripeWebhook(event);
    expect(result).toEqual({ received: true });
  });

  it('should handle invoice.payment_failed event', async () => {
    const event: Stripe.Event = {
      id: 'evt_test',
      object: 'event',
      api_version: '2025-11-17.clover',
      created: Math.floor(Date.now() / 1000),
      data: {
        object: {
          id: 'in_test',
          object: 'invoice',
          status: 'open',
        } as any,
      },
      livemode: false,
      pending_webhooks: 0,
      request: {
        id: null,
        idempotency_key: null,
      },
      type: 'invoice.payment_failed',
    };

    const result = await handleStripeWebhook(event);
    expect(result).toEqual({ received: true });
  });

  it('should handle unhandled event types gracefully', async () => {
    const event: Stripe.Event = {
      id: 'evt_test',
      object: 'event',
      api_version: '2025-11-17.clover',
      created: Math.floor(Date.now() / 1000),
      data: {
        object: {} as any,
      },
      livemode: false,
      pending_webhooks: 0,
      request: {
        id: null,
        idempotency_key: null,
      },
      type: 'charge.succeeded',
    };

    const result = await handleStripeWebhook(event);
    expect(result).toEqual({ received: true });
  });
});
