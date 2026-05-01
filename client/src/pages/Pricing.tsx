import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check, Sparkles, Crown, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";

const pricingPlans = [
  {
    id: "standard",
    name: "Standard",
    price: 0,
    period: "free",
    description: "Get started with essential access",
    features: [
      "Chapter 1 of guided audiobook",
      "New Year Calendar (31 days)",
      "Shop access with pre-orders",
    ],
    icon: Sparkles,
    color: "text-accent",
    buttonText: "Get Started Free",
    priceId: import.meta.env.VITE_STRIPE_STANDARD_PRICE_ID,
  },
  {
    id: "premium",
    name: "Premium",
    price: 299,
    period: "month",
    description: "Complete wellness transformation + support clean water",
    features: [
      "Everything in Standard",
      "AI Wellness Coach (Maria) with daily guidance",
      "Daily inspirational poems",
      "Personalized meditation recommendations",
      "Priority support",
      "50 NOK donated to clean water projects",
      "Clean Water Supporter badge",
    ],
    icon: Crown,
    color: "text-primary",
    buttonText: "Subscribe Now",
    popular: true,
    badge: "Most Popular",
    priceId: import.meta.env.VITE_STRIPE_PREMIUM_PRICE_ID,
  },
  {
    id: "impact",
    name: "Impact",
    price: 349,
    period: "month",
    description: "Maximum impact for yourself and the world",
    features: [
      "Everything in Premium",
      "100 NOK donated to clean water projects",
      "Clean Water Champion badge",
      "Monthly impact report with photos",
      "Vote on future donation projects",
      "Exclusive community access",
    ],
    icon: Crown,
    color: "text-[#D4AF37]",
    buttonText: "Subscribe Now",
    badge: "Maximum Impact",
    priceId: import.meta.env.VITE_STRIPE_IMPACT_PRICE_ID,
  },
];

export default function Pricing() {
  const { user } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [loading, setLoading] = useState<string | null>(null);

  const handleJoinWaitlist = (planId: string) => {
    setLoading(planId);
    
    setTimeout(() => {
      toast.success("You're on the waitlist! 🎉", {
        description: "We'll notify you as soon as Drift launches. Thanks for your interest!",
      });
      setLoading(null);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
            Choose Your Path
          </h1>
          <p className="text-muted-foreground text-lg mb-2">
            Join thousands waiting for Drift's launch.
          </p>
          <p className="text-sm text-muted-foreground/80 mb-8">
            Sign up for early access and exclusive launch benefits.
          </p>

          <div className="inline-flex items-center gap-2 p-2 bg-accent/10 rounded-lg border border-accent/20">
            <span className="text-sm font-medium text-accent">🚀 Launching Soon</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan) => {
            const Icon = plan.icon;
            const yearlyPrice = Math.round(plan.price * 12 * 0.8);
            const displayPrice = billingPeriod === "monthly" ? plan.price : yearlyPrice;
            const displayPeriod = billingPeriod === "monthly" ? "month" : "year";

            return (
              <Card
                key={plan.id}
                className={`relative p-8 ${
                  plan.popular
                    ? "border-accent border-2 shadow-xl"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-accent text-accent-foreground text-sm font-bold px-4 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 mb-4`}>
                  <Icon className={`h-6 w-6 ${plan.color}`} />
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{plan.price} kr</span>
                    <span className="text-muted-foreground">/ {plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Coming {plan.id === 'standard' ? 'immediately' : 'at launch'}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  onClick={() => handleJoinWaitlist(plan.id)}
                  disabled={loading !== null}
                  className={`w-full ${
                    plan.popular
                      ? "bg-accent hover:bg-accent/90"
                      : "bg-primary hover:bg-primary/90"
                  }`}
                  size="lg"
                >
                  {loading === plan.id ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    "Join Waitlist"
                  )}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* FAQ / Additional Info */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4 text-left">
            <div>
              <h3 className="font-semibold mb-1">Can I cancel anytime?</h3>
              <p className="text-muted-foreground text-sm">
                Yes! You can cancel your subscription at any time from your account settings. No questions asked.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">What payment methods do you accept?</h3>
              <p className="text-muted-foreground text-sm">
                We accept all major credit cards, Apple Pay, and Google Pay through our secure payment processor Stripe.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Can I switch plans later?</h3>
              <p className="text-muted-foreground text-sm">
                Absolutely! You can upgrade or downgrade your plan at any time from your account settings.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Is there a free trial?</h3>
              <p className="text-muted-foreground text-sm">
                We offer a 7-day free trial for all new users. No credit card required to start.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
