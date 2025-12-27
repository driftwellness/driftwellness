import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Clock, CreditCard, LogOut, Zap } from 'lucide-react';
import { useLocation } from 'wouter';
import { toast } from 'sonner';

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
}

const PLANS = [
  {
    id: 'req_oVa0P4RQRFd9la',
    name: 'Standard',
    price: 0,
    color: 'from-gray-400 to-gray-600',
  },
  {
    id: 'req_M6MWuNq2YYWSVQ',
    name: 'Premium',
    price: 299,
    color: 'from-amber-400 to-amber-600',
  },
  {
    id: 'req_wVuVfy6PQ32LaR',
    name: 'Impact',
    price: 349,
    color: 'from-rose-400 to-rose-600',
  },
];

export default function SubscriptionManagement() {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [changingPlan, setChangingPlan] = useState(false);
  const [cancellingSubscription, setCancellingSubscription] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRes = await fetch('/api/trpc/auth.me');
        const userData = await userRes.json();
        if (userData.result?.data) {
          setUser(userData.result.data);
        }

        const subRes = await fetch('/api/subscription/current');
        const subData = await subRes.json();
        if (subData) {
          setSubscription(subData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChangePlan = async (newPlanId: string) => {
    if (!subscription || subscription.planId === newPlanId) {
      toast.error('You are already on this plan');
      return;
    }

    setChangingPlan(true);
    try {
      const response = await fetch('/api/subscription/change-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPriceId: newPlanId }),
      });

      if (response.ok) {
        toast.success('Plan changed successfully!');
        // Redirect to Stripe checkout or show confirmation
        const data = await response.json();
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        }
      } else {
        toast.error('Failed to change plan');
      }
    } catch (error) {
      console.error('Error changing plan:', error);
      toast.error('Error changing plan');
    } finally {
      setChangingPlan(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? You will lose access to premium features.')) {
      return;
    }

    setCancellingSubscription(true);
    try {
      const response = await fetch('/api/subscription/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        toast.success('Subscription cancelled');
        setSubscription(null);
        setTimeout(() => navigate('/'), 2000);
      } else {
        toast.error('Failed to cancel subscription');
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast.error('Error cancelling subscription');
    } finally {
      setCancellingSubscription(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Clock className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-center mb-4">Not Logged In</h2>
          <Button onClick={() => navigate('/')} className="w-full">
            Go to Home
          </Button>
        </Card>
      </div>
    );
  }

  const currentPlan = PLANS.find((p) => p.id === subscription?.planId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Manage Your Plan</h1>
          <p className="text-muted-foreground">Change your subscription or cancel anytime</p>
        </div>

        {/* Current Plan */}
        {currentPlan && subscription && (
          <Card className="p-6 mb-8 border-2 border-primary bg-primary/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{currentPlan.name}</h2>
                <p className="text-muted-foreground">Current Plan</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-foreground">{currentPlan.price} NOK</p>
                <p className="text-sm text-muted-foreground">/month</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">Active</span>
            </div>
          </Card>
        )}

        {/* Plan Options */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Choose a Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLANS.map((plan) => (
              <Card
                key={plan.id}
                className={`p-6 cursor-pointer transition-all ${
                  subscription?.planId === plan.id
                    ? 'border-2 border-primary bg-primary/10'
                    : 'border-border hover:border-primary'
                }`}
              >
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-foreground">{plan.name}</h4>
                  <p className="text-2xl font-bold text-foreground mt-2">
                    {plan.price} NOK
                    <span className="text-sm text-muted-foreground">/month</span>
                  </p>
                </div>

                {subscription?.planId === plan.id ? (
                  <Button disabled className="w-full">
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleChangePlan(plan.id)}
                    disabled={changingPlan}
                    className="w-full"
                  >
                    {changingPlan ? 'Changing...' : 'Switch to ' + plan.name}
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Billing Info */}
        <Card className="p-6 mb-8 border-border">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Billing Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next Billing Date</span>
              <span className="font-semibold text-foreground">
                {subscription ? new Date(subscription.currentPeriodEnd).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subscription Status</span>
              <span className="font-semibold text-foreground capitalize">
                {subscription?.status || 'Inactive'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Member Since</span>
              <span className="font-semibold text-foreground">
                {subscription ? new Date(subscription.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </Card>

        {/* Cancel Subscription */}
        {subscription && subscription.status === 'active' && (
          <Card className="p-6 border-destructive/20 bg-destructive/5">
            <h3 className="text-lg font-bold text-destructive mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Danger Zone
            </h3>
            <p className="text-muted-foreground mb-4">
              Cancelling your subscription will immediately revoke access to all premium features. You can resubscribe anytime.
            </p>
            <Button
              variant="destructive"
              onClick={handleCancelSubscription}
              disabled={cancellingSubscription}
              className="w-full"
            >
              {cancellingSubscription ? 'Cancelling...' : 'Cancel Subscription'}
            </Button>
          </Card>
        )}

        {/* Support */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            Questions? Contact us at{' '}
            <a href="mailto:support@driftapp.no" className="text-primary hover:underline">
              support@driftapp.no
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
