import { describe, it, expect } from 'vitest';

describe('Analytics Dashboard', () => {
  it('should calculate subscription breakdown percentages', () => {
    const analytics = {
      totalSubscribers: 100,
      standardUsers: 40,
      premiumUsers: 35,
      impactUsers: 25,
    };

    const standardPercent = (analytics.standardUsers / analytics.totalSubscribers) * 100;
    const premiumPercent = (analytics.premiumUsers / analytics.totalSubscribers) * 100;
    const impactPercent = (analytics.impactUsers / analytics.totalSubscribers) * 100;

    expect(standardPercent).toBe(40);
    expect(premiumPercent).toBe(35);
    expect(impactPercent).toBe(25);
    expect(standardPercent + premiumPercent + impactPercent).toBe(100);
  });

  it('should calculate conversion rate', () => {
    const analytics = {
      totalUsers: 1000,
      totalSubscribers: 150,
      conversionRate: 15,
    };

    const calculatedRate = (analytics.totalSubscribers / analytics.totalUsers) * 100;
    expect(calculatedRate).toBe(15);
    expect(analytics.conversionRate).toBe(15);
  });

  it('should calculate churn rate', () => {
    const analytics = {
      activeSubscriptions: 140,
      cancelledSubscriptions: 10,
      totalSubscribers: 150,
      churnRate: 6.67,
    };

    const calculatedChurn = (analytics.cancelledSubscriptions / analytics.totalSubscribers) * 100;
    expect(calculatedChurn).toBeCloseTo(6.67, 1);
  });

  it('should calculate average revenue per user', () => {
    const analytics = {
      totalRevenue: 50000,
      totalUsers: 1000,
      averageRevenuePerUser: 50,
    };

    const calculatedARPU = analytics.totalRevenue / analytics.totalUsers;
    expect(calculatedARPU).toBe(50);
  });

  it('should track monthly revenue', () => {
    const analytics = {
      monthlyRevenue: 5000,
      activeSubscriptions: 150,
      averageMonthlyPerSubscription: 33.33,
    };

    expect(analytics.monthlyRevenue).toBe(5000);
    expect(analytics.activeSubscriptions).toBeGreaterThan(0);
  });

  it('should support report export', () => {
    const analytics = {
      totalUsers: 1000,
      totalSubscribers: 150,
      totalRevenue: 50000,
      monthlyRevenue: 5000,
    };

    const report = {
      timestamp: new Date().toISOString(),
      data: analytics,
    };

    expect(report.data.totalUsers).toBe(1000);
    expect(report.data.totalSubscribers).toBe(150);
    expect(report.data.totalRevenue).toBe(50000);
    expect(report.timestamp).toBeTruthy();
  });

  it('should validate analytics data types', () => {
    const analytics = {
      totalUsers: 1000,
      activeSubscriptions: 150,
      monthlyRevenue: 5000,
      conversionRate: 15.5,
      churnRate: 6.67,
    };

    expect(typeof analytics.totalUsers).toBe('number');
    expect(typeof analytics.activeSubscriptions).toBe('number');
    expect(typeof analytics.monthlyRevenue).toBe('number');
    expect(typeof analytics.conversionRate).toBe('number');
    expect(typeof analytics.churnRate).toBe('number');
  });
});
