import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Gift, Check } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

const giftCardOptions = [
  {
    id: "1month",
    title: "1 Month Premium",
    description: "Full access to all Premium features for 30 days",
    price: 199,
    value: "199 kr",
  },
  {
    id: "1year",
    title: "1 Year Premium",
    description: "Full year of Premium access - Best Value!",
    price: 1990,
    value: "1,990 kr",
    savings: "Save 398 kr",
  },
  {
    id: "mystery",
    title: "Premium Mystery Gift",
    description: "Luxury wellness package with yoga mat, meditation cushion, essential oils, and more. Actual value 2,000-3,000 kr!",
    price: 999,
    value: "999 kr",
    savings: "Worth 2,000-3,000 kr!",
    badge: "BEST DEAL",
  },
];

export default function GiftCard() {
  const [selectedGift, setSelectedGift] = useState(giftCardOptions[0]);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");

  const handlePurchase = () => {
    if (!recipientEmail || !recipientName || !senderName) {
      toast.error("Please fill in all required fields");
      return;
    }

    // In production, this would process payment via Stripe
    toast.success("Gift card purchased!", {
      description: `A gift code will be sent to ${recipientEmail}`,
    });

    // Reset form
    setRecipientEmail("");
    setRecipientName("");
    setMessage("");
    setSenderName("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-4">
            <Gift className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
            Gift Cards
          </h1>
          <p className="text-muted-foreground text-lg">
            Give the gift of wellness. Share inner peace with someone you care about.
          </p>
        </div>

        {/* Gift Card Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Choose a gift card</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {giftCardOptions.map((option) => (
              <Card
                key={option.id}
                onClick={() => setSelectedGift(option)}
                className={`p-6 cursor-pointer transition-all ${
                  selectedGift.id === option.id
                    ? "border-accent border-2 bg-accent/5"
                    : "border-border hover:border-accent/50"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    {option.badge && (
                      <div className="inline-block bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded mb-2">
                        {option.badge}
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-1">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  {selectedGift.id === option.id && (
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center ml-2">
                      <Check className="h-4 w-4 text-accent-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-accent">{option.value}</span>
                  {option.savings && (
                    <span className="text-sm text-green-600 font-medium">{option.savings}</span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Gift Card Form */}
        <Card className="p-8 bg-card/90 backdrop-blur-sm border-accent/20">
          <h2 className="text-2xl font-semibold mb-6">Gift details</h2>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Recipient's Name *
                </label>
                <Input
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Jane Doe"
                  className="bg-background/50"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Recipient's Email *
                </label>
                <Input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="bg-background/50"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Your Name *
              </label>
              <Input
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="John Doe"
                className="bg-background/50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Personal Message (optional)
              </label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Wishing you peace and tranquility..."
                className="min-h-[100px] bg-background/50 resize-none"
              />
            </div>

            {/* Summary */}
            <div className="bg-muted/50 rounded-lg p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Gift Card:</span>
                <span className="font-medium">{selectedGift.title}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-border">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-accent">{selectedGift.value}</span>
              </div>
            </div>

            <Button
              onClick={handlePurchase}
              className="w-full h-12 text-lg bg-accent hover:bg-accent/90"
              disabled={!recipientEmail || !recipientName || !senderName}
            >
              <Gift className="mr-2 h-5 w-5" />
              Purchase Gift Card
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              The recipient will receive an email with a unique gift code and your personal message.
            </p>
          </div>
        </Card>

        {/* Redeem Section */}
        <Card className="mt-8 p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-accent/20">
          <h2 className="text-2xl font-semibold mb-4">Have a gift code?</h2>
          <p className="text-muted-foreground mb-4">
            Enter your gift code below to redeem your Premium access.
          </p>
          <div className="flex gap-3">
            <Input
              placeholder="Enter gift code"
              className="flex-1 bg-background/50"
            />
            <Button className="bg-accent hover:bg-accent/90">
              Redeem
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
