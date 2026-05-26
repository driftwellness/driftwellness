import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Package, Home } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function OrderSuccess() {
  const [, setLocation] = useLocation();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Get session_id from URL params
    const params = new URLSearchParams(window.location.search);
    const id = params.get('session_id');
    setSessionId(id);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5D5C0] via-[#E8DCC4] to-[#F5D5C0] flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-serif text-[#8B4049]">
            Order Confirmed!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-lg text-[#8B4049]">
              Thank you for your order! 🎉
            </p>
            <p className="text-[#8B4049]/70">
              Your order has been successfully placed and will be prepared with care.
            </p>
          </div>

          {sessionId && (
            <div className="bg-[#D4AF37]/10 rounded-lg p-4 text-sm">
              <p className="text-[#8B4049]/70">
                <strong>Order ID:</strong> {sessionId.slice(-12)}
              </p>
            </div>
          )}

          <div className="bg-white/50 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-4">
              <Package className="w-6 h-6 text-[#8B4049] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-[#8B4049] mb-1">What happens next?</h3>
                <ul className="text-sm text-[#8B4049]/70 space-y-2">
                  <li>✅ You'll receive an order confirmation email shortly</li>
                  <li>📦 Your order will be prepared and packed within 1–2 business days</li>
                  <li>🚚 You'll receive a shipping notification with tracking info</li>
                  <li>💝 Your wellness essentials will arrive within 5-7 business days</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Link href="/shop" className="flex-1">
              <Button className="w-full bg-[#8B4049] hover:bg-[#8B4049]/90">
                Continue Shopping
              </Button>
            </Link>
          </div>

          <p className="text-xs text-center text-[#8B4049]/60">
            Questions? Contact us at support@drift.com
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
