// User type from database schema
type User = {
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
  lastSignedIn: Date;
  preferredCoach: "maria" | "zane" | null;
  stripeCustomerId: string | null;
};

export interface SubscriptionStatus {
  isActive: boolean;
  isTrialing: boolean;
  isFree: boolean;
  isAdmin: boolean;
  trialEndsAt: Date | null;
  canAccess: boolean;
}

/**
 * Check if user has active premium access
 * Includes: active subscription, active trial, or admin role
 */
export function checkSubscriptionStatus(
  user: User | null,
  subscription: any | null
): SubscriptionStatus {
  // Not logged in - free tier only
  if (!user) {
    return {
      isActive: false,
      isTrialing: false,
      isFree: true,
      isAdmin: false,
      trialEndsAt: null,
      canAccess: false,
    };
  }

  // Admin users get full access
  if (user.role === "admin") {
    return {
      isActive: true,
      isTrialing: false,
      isFree: false,
      isAdmin: true,
      trialEndsAt: null,
      canAccess: true,
    };
  }

  // Check for active subscription
  if (subscription && subscription.status === "active") {
    return {
      isActive: true,
      isTrialing: false,
      isFree: false,
      isAdmin: false,
      trialEndsAt: null,
      canAccess: true,
    };
  }

  // Check for trial period (7 days from account creation)
  const accountCreated = new Date(user.createdAt);
  const trialEndsAt = new Date(accountCreated);
  trialEndsAt.setDate(trialEndsAt.getDate() + 7);
  
  const now = new Date();
  const isTrialing = now < trialEndsAt;

  return {
    isActive: false,
    isTrialing,
    isFree: !isTrialing,
    isAdmin: false,
    trialEndsAt: isTrialing ? trialEndsAt : null,
    canAccess: isTrialing,
  };
}

/**
 * Get days remaining in trial
 */
export function getTrialDaysRemaining(user: User | null): number {
  if (!user) return 0;

  const accountCreated = new Date(user.createdAt);
  const trialEndsAt = new Date(accountCreated);
  trialEndsAt.setDate(trialEndsAt.getDate() + 7);

  const now = new Date();
  const daysRemaining = Math.ceil(
    (trialEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  return Math.max(0, daysRemaining);
}

/**
 * Format trial end date
 */
export function formatTrialEndDate(user: User | null): string {
  if (!user) return "";

  const accountCreated = new Date(user.createdAt);
  const trialEndsAt = new Date(accountCreated);
  trialEndsAt.setDate(trialEndsAt.getDate() + 7);

  return trialEndsAt.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
