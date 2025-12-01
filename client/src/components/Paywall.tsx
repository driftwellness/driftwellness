import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Sparkles, Clock } from "lucide-react";
import { Link } from "wouter";

interface PaywallProps {
  title?: string;
  description?: string;
  featureName?: string;
  showTrialInfo?: boolean;
  trialDaysRemaining?: number;
}

export default function Paywall({
  title = "Premium Feature",
  description = "This feature is available to Premium members only.",
  featureName = "this feature",
  showTrialInfo = false,
  trialDaysRemaining = 0,
}: PaywallProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-[#D4AF37]" />
          </div>
          
          <div>
            <CardTitle className="text-2xl mb-2">{title}</CardTitle>
            <p className="text-muted-foreground">{description}</p>
          </div>

          {showTrialInfo && trialDaysRemaining > 0 && (
            <Badge className="bg-[#8B4049]/10 text-[#8B4049] border-[#8B4049]/20">
              <Clock className="w-3 h-3 mr-1" />
              {trialDaysRemaining} days left in your free trial
            </Badge>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              Premium Benefits
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1 ml-6">
              <li>• Full access to all audiobook chapters</li>
              <li>• Unlimited AI wellness coaching with Maria & Zane</li>
              <li>• Unlimited journal entries with mood tracking</li>
              <li>• Exclusive sleep soundscapes & videos</li>
              <li>• Advent calendar prizes & competitions</li>
              <li>• Shop discounts & early access</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Link href="/pricing">
              <Button className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white">
                {showTrialInfo && trialDaysRemaining > 0
                  ? "Start Your 7-Day Free Trial"
                  : "Upgrade to Premium"}
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            {showTrialInfo && trialDaysRemaining === 0
              ? "Your free trial has ended. Subscribe to continue enjoying premium features."
              : "Cancel anytime. No commitments."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
