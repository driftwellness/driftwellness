import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { cart: cartItems, removeFromCart, updateQuantity } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Norway",
  });

  const removeItem = (id: number) => {
    removeFromCart(id);
    toast.success("Item removed from cart");
  };

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9900; // 99 NOK shipping
  const total = subtotal + shipping;

  const formatPrice = (priceInOre: number) => {
    return `${(priceInOre / 100).toFixed(0)} NOK`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!formData.email || !formData.name || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    try {
      // PayPal checkout will be connected in the final payment setup.
      // For preview, keep the flow safe and do not call Stripe.
      toast.success("PayPal checkout is ready for final setup ✨", {
        description: "Add your PayPal Client ID / merchant setup, then this button can open live PayPal payment.",
      });
      setIsProcessing(false);
      return;
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error("Payment could not be completed. PayPal checkout will be connected in the final payment setup.");
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5D5C0] via-[#E8DCC4] to-[#F5D5C0] flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some products to your cart to continue shopping
          </p>
          <Link href="/shop">
            <Button className="bg-[#8B4049] hover:bg-[#8B4049]/90">
              Continue Shopping
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5D5C0] via-[#E8DCC4] to-[#F5D5C0] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <Link href="/shop">
          <Button variant="ghost" className="mb-8 text-[#8B4049]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </Link>

        <h1 className="text-4xl font-serif text-[#8B4049] mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Customer Info Form */}
          <div className="lg:col-span-2">
            <Card className="border-[#8B4049]/20">
              <CardHeader>
                <CardTitle className="text-2xl text-[#8B4049]">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Oslo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        placeholder="0123"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="Norway"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-[#8B4049]/20 sticky top-4">
              <CardHeader>
                <CardTitle className="text-2xl text-[#8B4049]">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-[#8B4049]/10">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-[#8B4049]">{item.name}</h3>
                      <p className="text-sm text-[#8B4049]/60">
                        {formatPrice(item.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="text-sm">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 ml-auto text-red-500"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Price Summary */}
                <div className="space-y-2 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8B4049]/70">Subtotal</span>
                    <span className="text-[#8B4049]">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8B4049]/70">Shipping</span>
                    <span className="text-[#8B4049]">{formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-[#8B4049]/20">
                    <span className="text-[#8B4049]">Total</span>
                    <span className="text-[#8B4049]">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Shipping Notice */}
                <div className="bg-[#D4AF37]/10 rounded-lg p-3 text-sm text-[#8B4049]/80">
                  📦 Ships in 5–7 business days after PayPal payment confirmation
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full bg-[#8B4049] hover:bg-[#8B4049]/90 text-white"
                >
                  {isProcessing ? "Processing..." : "Continue to PayPal"}
                </Button>

                <p className="text-xs text-center text-[#8B4049]/60">
                  Secure PayPal payment will be connected before launch
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
