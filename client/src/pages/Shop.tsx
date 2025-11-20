import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Home, Sparkles } from "lucide-react";

// Product data - will be moved to database later
const products = [
  // Candles
  {
    id: 1,
    name: "Serenity Candle - Beige",
    description: "Hand-poured soy wax candle with calming lavender and vanilla notes. Burns for 40+ hours.",
    category: "candles",
    price: 29900,
    imageUrl: "/product-candle-beige-v2.jpg",
    featured: true,
  },
  {
    id: 2,
    name: "Tranquility Candle - Burgundy",
    description: "Luxurious burgundy candle with warm sandalwood and amber. Perfect for evening meditation.",
    category: "candles",
    price: 29900,
    imageUrl: "/product-candle-burgundy-v2.jpg",
    featured: true,
  },
  {
    id: 3,
    name: "Harmony Candle - Terracotta",
    description: "Earthy terracotta candle with eucalyptus and sage. Brings nature indoors.",
    category: "candles",
    price: 29900,
    imageUrl: "/product-candle-terracotta-v2.jpg",
    featured: false,
  },
  {
    id: 4,
    name: "Bliss Candle - Gold",
    description: "Golden luxury candle with jasmine and rose. Elevate your self-care ritual.",
    category: "candles",
    price: 29900,
    imageUrl: "/product-candle-gold-v2.jpg",
    featured: false,
  },
  
  // Essential Oils
  {
    id: 5,
    name: "Essential Oils Collection",
    description: "Premium set of 3 therapeutic-grade oils: Lavender, Eucalyptus, and Sandalwood. Perfect for aromatherapy.",
    category: "oils",
    price: 19900,
    imageUrl: "/product-oils.jpg",
    featured: true,
  },
  
  // Yoga Mat
  {
    id: 6,
    name: "Drift Yoga Mat",
    description: "Premium eco-friendly yoga mat with Drift logo. Non-slip, 6mm thick, perfect for all practices.",
    category: "yoga",
    price: 59900,
    imageUrl: "/product-yoga-mat.jpg",
    featured: true,
  },
  
  // Meditation Cushions
  {
    id: 7,
    name: "Meditation Cushion - Nordic",
    description: "Minimalist zafu cushion in soft beige. Filled with buckwheat hulls for perfect support.",
    category: "yoga",
    price: 39900,
    imageUrl: "/product-cushion-nordic.jpg",
    featured: false,
  },
  {
    id: 8,
    name: "Meditation Cushion - Luxury",
    description: "Luxurious burgundy meditation cushion with gold accents. Handcrafted with premium materials.",
    category: "yoga",
    price: 49900,
    imageUrl: "/product-cushion-luxury.jpg",
    featured: true,
  },
  
  // Ankh Necklace
  {
    id: 9,
    name: "Ankh Necklace - Gold",
    description: "Elegant gold-plated brass Ankh pendant. Symbol of eternal life and wellness.",
    category: "jewelry",
    price: 49900,
    imageUrl: "/product-ankh-necklace.jpg",
    featured: true,
  },
  
  // Yoga Pants
  {
    id: 10,
    name: "Yoga Pants - Earth Brown",
    description: "Soft, breathable yoga pants in warm earth brown. Perfect for practice and lounging.",
    category: "clothing",
    subcategory: "pants",
    price: 79900,
    imageUrl: "/product-pants-brown.jpg",
    featured: false,
  },
  {
    id: 11,
    name: "Yoga Pants - Pure White",
    description: "Classic white yoga pants with elegant fit. Made from sustainable bamboo blend.",
    category: "clothing",
    subcategory: "pants",
    price: 79900,
    imageUrl: "/product-pants-white.jpg",
    featured: false,
  },
  {
    id: 12,
    name: "Yoga Pants - Natural Beige",
    description: "Versatile beige yoga pants that go with everything. Soft and stretchy.",
    category: "clothing",
    subcategory: "pants",
    price: 79900,
    imageUrl: "/product-pants-beige.jpg",
    featured: false,
  },
  {
    id: 13,
    name: "Yoga Pants - Deep Plum",
    description: "Rich plum-colored yoga pants for a bold statement. High-waisted and flattering.",
    category: "clothing",
    subcategory: "pants",
    price: 79900,
    imageUrl: "/product-pants-plum.jpg",
    featured: false,
  },
  
  // Yoga Tops
  {
    id: 14,
    name: "Wrap Top - Earth Brown",
    description: "Elegant wrap-style yoga top in earth brown. Adjustable fit, perfect for all body types.",
    category: "clothing",
    subcategory: "tops",
    price: 69900,
    imageUrl: "/product-top-brown.jpg",
    featured: false,
  },
  {
    id: 15,
    name: "Wrap Top - Pure White",
    description: "Timeless white wrap top with delicate details. Breathable and comfortable.",
    category: "clothing",
    subcategory: "tops",
    price: 69900,
    imageUrl: "/product-top-white.jpg",
    featured: false,
  },
  {
    id: 16,
    name: "Wrap Top - Natural Beige",
    description: "Soft beige wrap top that flatters every skin tone. Perfect for yoga and everyday wear.",
    category: "clothing",
    subcategory: "tops",
    price: 69900,
    imageUrl: "/product-top-beige.jpg",
    featured: false,
  },
  {
    id: 17,
    name: "Wrap Top - Deep Plum",
    description: "Luxurious plum wrap top with elegant draping. Makes you feel beautiful.",
    category: "clothing",
    subcategory: "tops",
    price: 69900,
    imageUrl: "/product-top-plum.jpg",
    featured: false,
  },
  
  // Kimonos
  {
    id: 18,
    name: "Meditation Kimono - Luxury",
    description: "Exquisite burgundy kimono with gold lotus embroidery. Perfect for meditation and relaxation.",
    category: "clothing",
    subcategory: "kimonos",
    price: 99900,
    imageUrl: "/product-kimono-luxury.jpg",
    featured: true,
  },
  {
    id: 19,
    name: "Meditation Kimono - Minimal",
    description: "Minimalist beige kimono in soft linen blend. Effortless elegance for your wellness routine.",
    category: "clothing",
    subcategory: "kimonos",
    price: 89900,
    imageUrl: "/product-kimono-minimal.jpg",
    featured: false,
  },
];

const categories = [
  { id: "all", name: "All Products", icon: Sparkles },
  { id: "candles", name: "Candles" },
  { id: "oils", name: "Essential Oils" },
  { id: "yoga", name: "Yoga & Meditation" },
  { id: "jewelry", name: "Jewelry" },
  { id: "clothing", name: "Clothing" },
];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<number[]>([]);

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

  const formatPrice = (priceInOre: number) => {
    return `${(priceInOre / 100).toFixed(0)} NOK`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5D5C0] via-[#E8DCC4] to-[#F5D5C0]">
      {/* Header */}
      <header className="border-b border-[#8B4049]/20 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </Button>
            </Link>
            
            <h1 className="text-2xl sm:text-3xl font-serif text-[#8B4049]">
              Drift Shop
            </h1>
            
            <Button variant="ghost" className="gap-2 relative">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-[#D4AF37] text-white">
                  {cart.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Launch Date Banner */}
      <section className="bg-gradient-to-r from-[#8B4049] via-[#C97C5D] to-[#D4AF37] py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white font-semibold text-lg sm:text-xl">
            🎉 Grand Opening: <span className="font-bold">January 1st, 2026</span> ✨
          </p>
          <p className="text-white/90 text-sm mt-1">
            Browse our collection now - Shopping opens New Year's Day!
          </p>
        </div>
      </section>

      {/* Video Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/shop-hero-video-v2.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-[#F5D5C0]/80" />
        
        {/* Content */}
        <div className="relative h-full flex items-end justify-center pb-12 sm:pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full mb-4">
              <span className="text-[#8B4049] text-sm font-medium">✨ Curated Wellness Collection</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white mb-4 drop-shadow-lg">
              Elevate Your Self-Care Ritual
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Handpicked products to enhance your mindfulness practice. From luxurious candles to elegant yoga wear.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-y border-[#8B4049]/10 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                className={`whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-[#8B4049] text-white hover:bg-[#8B4049]/90"
                    : "border-[#8B4049]/30 text-[#8B4049] hover:bg-[#8B4049]/10"
                }`}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="group overflow-hidden border-[#8B4049]/20 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#E8DCC4] to-[#F5D5C0]">
                  {product.featured && (
                    <Badge className="absolute top-3 right-3 bg-[#D4AF37] text-white z-10">
                      Featured
                    </Badge>
                  )}
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-serif text-lg text-[#8B4049] mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[#8B4049]/60 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-semibold text-[#8B4049]">
                      {formatPrice(product.price)}
                    </span>
                    <Button
                      disabled
                      className="bg-[#8B4049]/50 text-white cursor-not-allowed"
                      title="Available January 1st, 2026"
                    >
                      Coming Jan 1st
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Curated by Amara Section */}
      <section className="py-16 bg-white/80">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Amara Image */}
              <div className="order-2 md:order-1">
                <img 
                  src="/amara-lifestyle-v2.jpg" 
                  alt="Amara - Wellness Curator"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
              
              {/* Content */}
              <div className="order-1 md:order-2 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#8B4049] border border-[#D4AF37]/40">
                  <span className="text-sm font-medium">Curated by Amara</span>
                </div>
                
                <h3 className="text-3xl font-serif text-[#8B4049]">
                  Handpicked for Your Wellness Journey
                </h3>
                
                <p className="text-[#8B4049]/70 leading-relaxed">
                  Every product in our collection has been carefully selected by Amara to enhance your mindfulness practice and bring serenity to your daily rituals.
                </p>
                
                <p className="text-[#8B4049]/70 leading-relaxed">
                  From luxurious candles to elegant yoga wear, each item reflects our commitment to quality, sustainability, and timeless beauty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-[#8B4049] to-[#C97C5D] text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-serif mb-4">
            Free Shipping on Orders Over 500 NOK
          </h3>
          <p className="text-white/90 mb-6">
            Experience luxury wellness delivered to your door
          </p>
          <Button 
            size="lg" 
            className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#8B4049] font-semibold"
          >
            Continue Shopping
          </Button>
        </div>
      </section>
    </div>
  );
}
