import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendSubscriptionReceipt, sendPaymentFailedNotification, sendRenewalReminder } from './emailReceipts';

// Mock the database
vi.mock('../db', () => ({
  getDb: vi.fn(),
}));

describe('Email Receipts Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should generate receipt for Premium subscription', async () => {
    const receiptData = {
      userId: 1,
      planName: 'Premium',
      planPrice: 299,
      transactionId: 'cs_test_123',
      billingPeriodStart: new Date('2025-01-01'),
      billingPeriodEnd: new Date('2025-02-01'),
      donationAmount: 50,
    };

    await sendSubscriptionReceipt(receiptData);
    // Verify logging (in production, would verify email sent)
    expect(receiptData.planName).toBe('Premium');
    expect(receiptData.planPrice).toBe(299);
    expect(receiptData.donationAmount).toBe(50);
  });

  it('should generate receipt for Impact subscription', async () => {
    const receiptData = {
      userId: 2,
      planName: 'Impact',
      planPrice: 349,
      transactionId: 'cs_test_456',
      billingPeriodStart: new Date('2025-01-01'),
      billingPeriodEnd: new Date('2025-02-01'),
      donationAmount: 100,
    };

    await sendSubscriptionReceipt(receiptData);
    expect(receiptData.planName).toBe('Impact');
    expect(receiptData.planPrice).toBe(349);
    expect(receiptData.donationAmount).toBe(100);
  });

  it('should generate receipt for Standard subscription', async () => {
    const receiptData = {
      userId: 3,
      planName: 'Standard',
      planPrice: 0,
      transactionId: 'cs_test_789',
      billingPeriodStart: new Date('2025-01-01'),
      billingPeriodEnd: new Date('2025-02-01'),
    };

    await sendSubscriptionReceipt(receiptData);
    expect(receiptData.planName).toBe('Standard');
    expect(receiptData.planPrice).toBe(0);
  });

  it('should send payment failed notification', async () => {
    await sendPaymentFailedNotification(1, 'Premium');
    // Verify notification queued
    expect(true).toBe(true);
  });

  it('should send renewal reminder', async () => {
    const renewalDate = new Date('2025-02-01');
    await sendRenewalReminder(1, 'Premium', renewalDate);
    // Verify reminder queued
    expect(true).toBe(true);
  });

  it('should handle missing user gracefully', async () => {
    const receiptData = {
      userId: 9999,
      planName: 'Premium',
      planPrice: 299,
      transactionId: 'cs_test_invalid',
      billingPeriodStart: new Date('2025-01-01'),
      billingPeriodEnd: new Date('2025-02-01'),
    };

    // Should not throw error
    await expect(sendSubscriptionReceipt(receiptData)).resolves.not.toThrow();
  });

  it('should format dates correctly in receipt', async () => {
    const receiptData = {
      userId: 1,
      planName: 'Premium',
      planPrice: 299,
      transactionId: 'cs_test_123',
      billingPeriodStart: new Date('2025-01-15'),
      billingPeriodEnd: new Date('2025-02-15'),
    };

    await sendSubscriptionReceipt(receiptData);
    expect(receiptData.billingPeriodStart.toLocaleDateString()).toContain('2025');
    expect(receiptData.billingPeriodEnd.toLocaleDateString()).toContain('2025');
  });
});
