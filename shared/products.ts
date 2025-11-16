/**
 * Drift Subscription Products and Pricing
 * 
 * This file defines all subscription plans available in the Drift wellness app.
 * Products and prices are created in Stripe Dashboard and referenced here by ID.
 */

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number; // in NOK
  priceYearly?: number; // in NOK
  stripePriceIdMonthly: string; // Stripe Price ID for monthly billing
  stripePriceIdYearly?: string; // Stripe Price ID for yearly billing
  features: string[];
  popular?: boolean;
}

/**
 * Drift Subscription Plans
 * 
 * Free Plan: Basic access to limited content
 * Premium Plan: Full access to all features
 */
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Start your wellness journey',
    priceMonthly: 0,
    stripePriceIdMonthly: '', // No Stripe price for free plan
    features: [
      'Access to 2 guided meditations',
      'Basic soundscapes',
      'Limited journal entries',
      'Community access',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Full sanctuary experience',
    priceMonthly: 99, // 99 NOK per month
    priceYearly: 990, // 990 NOK per year (2 months free)
    stripePriceIdMonthly: 'price_premium_monthly', // Replace with actual Stripe Price ID
    stripePriceIdYearly: 'price_premium_yearly', // Replace with actual Stripe Price ID
    features: [
      'Unlimited guided meditations',
      'All 5 audiobook chapters',
      'AI-powered personalization',
      'Private journal with AI dream analysis',
      'Real-time soundscapes (rain, ocean, wind, birdsong)',
      'Sleep music library',
      'Advent calendar wellness challenges',
      'Priority customer support',
      'Ad-free experience',
    ],
    popular: true,
  },
];

/**
 * Get subscription plan by ID
 */
export function getSubscriptionPlan(planId: string): SubscriptionPlan | undefined {
  return SUBSCRIPTION_PLANS.find(plan => plan.id === planId);
}

/**
 * Get premium subscription plan
 */
export function getPremiumPlan(): SubscriptionPlan {
  const premium = SUBSCRIPTION_PLANS.find(plan => plan.id === 'premium');
  if (!premium) {
    throw new Error('Premium plan not found');
  }
  return premium;
}

/**
 * Check if user has active premium subscription
 * This should be called with actual subscription data from database/Stripe
 */
export function isPremiumUser(subscriptionStatus?: string): boolean {
  return subscriptionStatus === 'active' || subscriptionStatus === 'trialing';
}

/**
 * Format price for display
 */
export function formatPrice(amount: number, currency: string = 'NOK'): string {
  if (amount === 0) return 'Free';
  return `${amount} ${currency}`;
}

/**
 * Calculate yearly savings
 */
export function calculateYearlySavings(monthlyPrice: number, yearlyPrice: number): number {
  return (monthlyPrice * 12) - yearlyPrice;
}
