import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Clock, CreditCard, LogOut } from 'lucide-react';
import { useLocation } from 'wouter';

interface Subscription {
  id: number;
  planId: string;
  status: 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  createdAt: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const PLAN_DETAILS: Record<string, { name: string; price: number; features: string[] }> = {
  'req_oVa0P4RQRFd9la': {
    name: 'Standard',
    price: 0,
    features: [
      'Chapter 1 of guided audiobook',
      'New Year Calendar (31 days)',
      'Shop access with pre-orders',
    ],
  },
  'req_M6MWuNq2YYWSVQ': {
    name: 'Premium',
    price: 299,
    features: [
      'All 5 audiobook chapters',
      'AI Wellness Coach (Maria)',
      'Daily inspirational poems',
      'Personalized meditation recommendations',
      'Priority support',
      '50 NOK donated to clean water',
      'Clean Water Supporter badge',
    ],
  },
  'req_wVuVfy6PQ32LaR': {
    name: 'Impact',
    price: 349,
    features: [
      'All Premium features',
      '100 NOK donated to clean water',
      'Clean Water Champion badge',
      'Monthly impact report with photos',
      'Vote on future donation projects',
      'Exclusive community access',
    ],
  },
};

export default function SubscriptionDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [, navigate] = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user info
        const userRes = await fetch('/api/trpc/auth.me');
        const userData = await userRes.json();
        if (userData.result?.data) {
          setUser(userData.result.data);
        }

        // Fetch subscription info
        const subRes = await fetch('/api/subscription/current');
        const subData = await subRes.json();
        if (subData) {
          setSubscription(subData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Clock className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-foreground">Loading your subscription...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-center mb-4">Not Logged In</h2>
          <p className="text-center text-muted-foreground mb-6">
            Please log in to view your subscription details.
          </p>
          <Button onClick={() => navigate('/')} className="w-full">
            Go to Home
          </Button>
        </Card>
      </div>
    );
  }

  const currentPlan = subscription ? PLAN_DETAILS[subscription.planId] : null;
  const statusColors: Record<string, string> = {
    active: 'text-green-600',
    canceled: 'text-red-600',
    past_due: 'text-yellow-600',
    trialing: 'text-blue-600',
    incomplete: 'text-orange-600',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Subscription</h1>
          <p className="text-muted-foreground">Manage your Drift membership</p>
        </div>

        {/* User Info Card */}
        <Card className="p-6 mb-6 border-border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{user.name || 'User'}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="font-semibold text-foreground">
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })}
              </p>
            </div>
          </div>
        </Card>

        {/* Current Plan Card */}
        {subscription && currentPlan ? (
          <Card className="p-6 mb-6 border-2 border-primary bg-primary/5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{currentPlan.name} Plan</h3>
                <div className="flex items-center gap-2">
                  {subscription.status === 'active' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className={`font-semibold ${statusColors[subscription.status] || 'text-foreground'}`}>
                        {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <span className={`font-semibold ${statusColors[subscription.status] || 'text-foreground'}`}>
                        {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-foreground">{currentPlan.price} NOK</p>
                <p className="text-sm text-muted-foreground">/month</p>
              </div>
            </div>

            {/* Billing Period */}
            <div className="bg-background rounded-lg p-4 mb-4">
              <p className="text-sm text-muted-foreground mb-2">Current Billing Period</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">
                  {new Date(subscription.currentPeriodStart).toLocaleDateString()}
                </span>
                <span className="text-muted-foreground">→</span>
                <span className="font-semibold text-foreground">
                  {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <h4 className="font-semibold text-foreground mb-3">Included Features</h4>
              <ul className="space-y-2">
                {currentPlan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ) : (
          <Card className="p-6 mb-6 border-border">
            <p className="text-center text-muted-foreground">No active subscription</p>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate('/pricing')}
          >
            <CreditCard className="w-4 h-4" />
            Change Plan
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <LogOut className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        {/* Billing Info */}
        <Card className="p-6 border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Billing Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-semibold text-foreground">Stripe</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Auto-Renewal</span>
              <span className="font-semibold text-foreground">
                {subscription?.status === 'active' ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next Billing Date</span>
              <span className="font-semibold text-foreground">
                {subscription ? new Date(subscription.currentPeriodEnd).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            For billing support, contact support@driftapp.no
          </p>
        </Card>
      </div>
    </div>
  );
}
