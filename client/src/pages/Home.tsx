import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { APP_TITLE, getLoginUrl } from "@/const";
import { Headphones, BookOpen, Calendar, Waves, Sparkles, ShoppingBag, ArrowRight, Heart, Moon, Gift } from "lucide-react";
import { Link } from "wouter";
import DownloadAppBanner from "@/components/DownloadAppBanner";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <DownloadAppBanner />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Warm sunset background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: 'url(/sunset-bg.jpg)' }}
          />
          {/* Warm overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/40 to-background/60" />
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/20 text-accent border border-accent/40">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wide">Your sanctuary of serenity awaits</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Drift
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Embrace tranquility. A luxurious sanctuary for mindfulness, restoration, and self-discovery.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {isAuthenticated ? (
                <>
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground group">
                    Continue Your Journey
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Link href="/shop">
                    <div className="relative inline-block">
                      {/* Hand-drawn organic gold circle */}
                      <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)]" viewBox="0 0 220 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15,45 Q20,20 40,15 Q70,10 110,10 Q150,10 180,15 Q200,20 205,45 Q200,70 180,75 Q150,80 110,80 Q70,80 40,75 Q20,70 15,45 Z" stroke="#D4AF37" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" style={{animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'}} />
                      </svg>
                      <Button size="lg" variant="outline" className="relative gap-2 bg-background hover:bg-accent/10 border-transparent">
                        <ShoppingBag className="w-5 h-5" />
                        Shop (Opens Feb 1st)
                      </Button>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Button 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => window.location.href = getLoginUrl()}
                  >
                    Get Started Free
                  </Button>
                  <Link href="/shop">
                    <div className="relative inline-block">
                      {/* Hand-drawn organic gold circle */}
                      <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)]" viewBox="0 0 220 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15,45 Q20,20 40,15 Q70,10 110,10 Q150,10 180,15 Q200,20 205,45 Q200,70 180,75 Q150,80 110,80 Q70,80 40,75 Q20,70 15,45 Z" stroke="#D4AF37" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" style={{animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'}} />
                      </svg>
                      <Button size="lg" variant="outline" className="relative gap-2 bg-background hover:bg-accent/10 border-transparent">
                        <ShoppingBag className="w-5 h-5" />
                        Shop (Opens Feb 1st)
                      </Button>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-3 rounded-full bg-muted-foreground/50" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you need to{" "}
              <span className="text-accent">discover inner peace</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Drift blends guided wisdom, intelligent personalization, and serene soundscapes in perfect harmony
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, idx) => {
              const cardContent = (
                <Card 
                  className="group bg-card/50 backdrop-blur border-border/50 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/5 h-full cursor-pointer"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
              
              return feature.link ? (
                <Link key={idx} href={feature.link} className="block">
                  {cardContent}
                </Link>
              ) : (
                <div key={idx}>
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Shop Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent border border-accent/40 mb-4">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-sm font-medium">Curated by Maria</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Wellness{" "}
              <span className="text-accent">Essentials</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked products to enhance your mindfulness practice and bring serenity to your daily rituals
            </p>
          </div>

          {/* Featured Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-8">
            {/* Product 1: Serenity Candle */}
            <Card className="group overflow-hidden border-border/50 hover:border-accent/50 transition-all hover:shadow-lg">
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-card to-muted">
                <Badge className="absolute top-3 right-3 bg-accent/90 text-accent-foreground z-10">
                  Pre-order
                </Badge>
                <img
                  src="/product-candle-beige-drift.jpg"
                  alt="Serenity Candle"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">Serenity Candle</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Hand-poured soy wax with calming lavender and vanilla
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-bold text-accent">299 NOK</span>
                  <span className="text-xs text-muted-foreground">Ships Jan 1st</span>
                </div>
              </CardContent>
            </Card>

            {/* Product 2: Essential Oils */}
            <Card className="group overflow-hidden border-border/50 hover:border-accent/50 transition-all hover:shadow-lg">
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-card to-muted">
                <Badge className="absolute top-3 right-3 bg-accent/90 text-accent-foreground z-10">
                  Pre-order
                </Badge>
                <img
                  src="/product-oils.jpg"
                  alt="Essential Oils Set"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">Essential Oils Set</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Pure lavender, eucalyptus, and peppermint oils
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-bold text-accent">399 NOK</span>
                  <span className="text-xs text-muted-foreground">Ships Jan 1st</span>
                </div>
              </CardContent>
            </Card>

            {/* Product 3: Meditation Cushion */}
            <Card className="group overflow-hidden border-border/50 hover:border-accent/50 transition-all hover:shadow-lg">
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-card to-muted">
                <Badge className="absolute top-3 right-3 bg-accent/90 text-accent-foreground z-10">
                  Pre-order
                </Badge>
                <img
                  src="/product-cushion-luxury-v2.jpg"
                  alt="Meditation Cushion"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">Meditation Cushion</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Grey-blue velvet with floral embroidery
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xl font-bold text-accent">499 NOK</span>
                  <span className="text-xs text-muted-foreground">Ships Jan 1st</span>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Explore Shop Button */}
          <div className="text-center">
            <Link href="/shop">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                <ShoppingBag className="w-5 h-5" />
                Explore Full Collection
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-3">
              Pre-order now • Ships January 1st, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Meet Your Guides - Maria & Zane Section */}
      <section className="py-24 bg-gradient-to-b from-background to-card/30">
        <div className="container">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent border border-accent/40 mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Meet Your Guides</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your{" "}
              <span className="text-accent">Wellness Companion</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Two experienced guides, one journey. Select the coach that resonates with you.
            </p>
          </div>

          {/* Coaches Grid */}
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Maria */}
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div className="absolute inset-0 bg-accent/10 group-hover:bg-accent/20 transition-colors" />
                  <img 
                    src="/maria-yoga.jpg" 
                    alt="Maria - Your Wellness Guide"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-3xl font-bold">
                    <span className="text-accent">Maria</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Warm, empathetic, and nurturing. Maria combines ancient wisdom with modern mindfulness to guide you through meditation, breathwork, and self-discovery with gentle compassion.
                  </p>
                  <Link href="/coach-selection">
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      Choose Maria
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Zane */}
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div className="absolute inset-0 bg-accent/10 group-hover:bg-accent/20 transition-colors" />
                  <img 
                    src="/zane.jpg" 
                    alt="Zane - Your Wellness Guide"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-3xl font-bold">
                    <span className="text-accent">Zane</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Grounded, wise, and steady. Zane brings calm strength and practical wisdom to help you build resilience, find clarity, and navigate life's challenges with confidence.
                  </p>
                  <Link href="/coach-selection">
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      Choose Zane
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container">
          <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-accent/20">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to embrace serenity?
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Join a global community discovering their path to inner tranquility
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/pricing">
                  <Button 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Start Your Free Journey
                  </Button>
                </Link>
                <Link href="/gift-card">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Gift className="mr-2 h-4 w-4" />
                    Buy Gift Card
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-accent text-accent hover:bg-accent/10">
                    Explore Shop
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">{APP_TITLE}</h3>
              <p className="text-sm text-muted-foreground">
                A luxurious sanctuary for mindfulness, restoration, and self-discovery.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/impact" className="hover:text-foreground transition-colors">
                    Our Impact Mission
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:text-foreground transition-colors">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="hover:text-foreground transition-colors">
                    Settings
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <a href="mailto:support@driftapp.no" className="hover:text-foreground transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border/50 text-center space-y-4">
            <div className="text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} {APP_TITLE}. All rights reserved.</p>
              <p className="mt-2">Find your stillness. Create global change.</p>
            </div>
            
            {/* Mental Health Support */}
            <div className="text-xs text-muted-foreground/80 max-w-2xl mx-auto pt-4 border-t border-border/30">
              <p className="mb-1">
                <Heart className="inline w-3 h-3 mr-1" />
                If you're struggling with your mental health and need someone to talk to, please reach out. You're not alone.
              </p>
              <p>
                Visit{" "}
                <a 
                  href="https://www.befrienders.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground transition-colors"
                >
                  befrienders.org
                </a>
                {" "}to find a helpline in your country.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "Guided Audiobook",
    description: "5 chapters of mindfulness teachings, breathwork, and self-care practices narrated with a calming voice.",
    link: "/audiobook",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Private Journal",
    description: "A safe space to write your thoughts, dreams, and reflections. Powered by AI dream analysis.",
    link: "/journal",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "New Year Calendar",
    description: "31 days of inspiration and motivation. Daily affirmations, wellness tips, and exclusive January rewards.",
    link: "/new-year-calendar",
  },
  {
    icon: <Waves className="w-6 h-6" />,
    title: "Real-time Soundscapes",
    description: "Mix your perfect ambient sound. Control rain, ocean waves, wind, and birdsong to create your sanctuary.",
    link: "/soundscapes",
  },
  {
    icon: <Moon className="w-6 h-6" />,
    title: "Sleep Videos",
    description: "8-hour sleep videos with Norwegian nature, cozy cabins, tropical rain, beach waves, aquarium, and starry nights.",
    link: "/sleep-videos",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "AI Wellness Coach",
    description: "Your personal AI guide. Chat anytime, get daily reminders, and receive personalized wellness recommendations.",
    link: "/ai-coach",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "Sleep Music Library",
    description: "Curated music for deep rest. Includes special sections for babies and children.",
    link: null,
  },
];
