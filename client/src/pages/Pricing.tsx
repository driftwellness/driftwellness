import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check, Sparkles, Crown } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

const pricingPlans = [
  {
    id: "basic",
    name: "Basic",
    price: 99,
    period: "month",
    description: "Perfect for getting started with your wellness journey",
    features: [
      "5-chapter guided audiobook",
      "Private journal with mood tracking",
      "Access to advent calendar",
      "Basic soundscapes library",
      "Community support",
    ],
    icon: Sparkles,
    color: "text-accent",
    buttonText: "Start Basic",
  },
  {
    id: "premium",
    name: "Premium",
    price: 199,
    period: "month",
    description: "Everything you need for complete wellness transformation",
    features: [
      "Everything in Basic",
      "AI Wellness Coach with daily reminders",
      "Personalized meditation recommendations",
      "Advanced soundscapes with mixing",
      "Sleep music library",
      "Priority support",
      "Exclusive premium content",
    ],
    icon: Crown,
    color: "text-primary",
    buttonText: "Start Premium",
    popular: true,
  },
];

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const handleSubscribe = (planId: string) => {
    // In production, this would redirect to Stripe Checkout
    toast.info("Redirecting to payment...", {
      description: "You'll be redirected to secure Stripe checkout",
    });
    
    // TODO: Implement Stripe checkout
    // window.location.href = `/api/create-checkout-session?plan=${planId}&period=${billingPeriod}`;
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
          <p className="text-muted-foreground text-lg mb-8">
            Start your journey to inner peace. Cancel anytime.
          </p>

          {/* Billing Period Toggle */}
          <div className="inline-flex items-center gap-4 p-1 bg-muted rounded-lg">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2 rounded-md transition-all ${
                billingPeriod === "monthly"
                  ? "bg-background shadow-sm font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-6 py-2 rounded-md transition-all ${
                billingPeriod === "yearly"
                  ? "bg-background shadow-sm font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <span className="ml-2 text-xs text-green-600 font-medium">Save 20%</span>
            </button>
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
                    <span className="text-4xl font-bold">{displayPrice} kr</span>
                    <span className="text-muted-foreground">/ {displayPeriod}</span>
                  </div>
                  {billingPeriod === "yearly" && (
                    <p className="text-sm text-green-600 font-medium mt-1">
                      Save {plan.price * 12 - yearlyPrice} kr per year
                    </p>
                  )}
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
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full ${
                    plan.popular
                      ? "bg-accent hover:bg-accent/90"
                      : "bg-primary hover:bg-primary/90"
                  }`}
                  size="lg"
                >
                  {plan.buttonText}
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
