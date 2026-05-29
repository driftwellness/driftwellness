import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { APP_TITLE, getLoginUrl } from "@/const";
import { Headphones, BookOpen, Calendar, Waves, Sparkles, ShoppingBag, ArrowRight, Heart, Moon, Gift } from "lucide-react";
import { Link } from "wouter";
import GetAppBadge from "@/components/GetAppBadge";
import TrustIndicators from "@/components/TrustIndicators";
import ReferralBadge from "@/components/ReferralBadge";

import SocialMediaFeed from "@/components/SocialMediaFeed";
import EmailSubscription from "@/components/EmailSubscription";
import HolderOurCalendar from "@/components/HolderOurCalendar";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <GetAppBadge />
      {/* FlashSaleBanner and ExitIntentPopup removed to prevent overlapping */}
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
                  <Link href="/pricing">
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground group">
                      Join Now
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/shop">
                    <div className="relative inline-block">
                      {/* Hand-drawn organic gold circle */}
                      <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)]" viewBox="0 0 220 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15,45 Q20,20 40,15 Q70,10 110,10 Q150,10 180,15 Q200,20 205,45 Q200,70 180,75 Q150,80 110,80 Q70,80 40,75 Q20,70 15,45 Z" stroke="#D4AF37" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" style={{animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'}} />
                      </svg>
                      <Button size="lg" variant="outline" className="relative gap-2 bg-background hover:bg-accent/10 border-transparent">
                        <ShoppingBag className="w-5 h-5" />
                        Shop Now
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
                    Join Now
                  </Button>
                  <Link href="/shop">
                    <div className="relative inline-block">
                      {/* Hand-drawn organic gold circle */}
                      <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)]" viewBox="0 0 220 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15,45 Q20,20 40,15 Q70,10 110,10 Q150,10 180,15 Q200,20 205,45 Q200,70 180,75 Q150,80 110,80 Q70,80 40,75 Q20,70 15,45 Z" stroke="#D4AF37" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" style={{animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'}} />
                      </svg>
                      <Button size="lg" variant="outline" className="relative gap-2 bg-background hover:bg-accent/10 border-transparent">
                        <ShoppingBag className="w-5 h-5" />
                        Shop Now
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

      {/* App Doors Section */}
      <section className="py-20 bg-card/30">
        <div className="container">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/20 text-accent border border-accent/40 mb-5">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wide">Open your sanctuary</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Choose a <span className="text-accent">door</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything in Drift is organized into calm, simple doors. Tap the one you need today.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {appDoors.map((door, idx) => (
              <Link key={door.title} href={door.link} className="block h-full">
                <Card className="group relative overflow-hidden h-full min-h-[230px] border-border/50 bg-background/75 backdrop-blur hover:border-accent/70 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="relative z-10 p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between gap-4 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                        {door.icon}
                      </div>
                      <span className="text-4xl font-serif text-accent/25">{String(idx + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="mt-auto space-y-3">
                      <h3 className="text-2xl font-bold">{door.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{door.description}</p>
                      <div className="inline-flex items-center text-sm font-semibold text-accent pt-2">
                        Open door
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Your Guides - Maria & Zane Section */}
      <section className="py-20 bg-gradient-to-b from-background to-card/30">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent border border-accent/40 mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Meet Your Guides</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Maria & <span className="text-accent">Zane</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the energy you need: Maria for soft nurturing guidance, Zane for grounded clarity and strength.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {guides.map((guide) => (
              <Link key={guide.name} href="/coach-selection" className="block h-full">
                <Card className="overflow-hidden h-full hover:shadow-2xl hover:border-accent/60 transition-all duration-300 group bg-background/80">
                  <CardContent className="p-0">
                    <div className="grid sm:grid-cols-[0.9fr_1.1fr] h-full">
                      <div className="relative min-h-[280px] overflow-hidden bg-accent/10">
                        <img
                          src={guide.image}
                          alt={`${guide.name} - Your Wellness Guide`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-7 flex flex-col justify-center space-y-4">
                        <Badge className="w-fit bg-accent/15 text-accent border border-accent/30 hover:bg-accent/20">
                          {guide.badge}
                        </Badge>
                        <h3 className="text-4xl font-bold text-accent">{guide.name}</h3>
                        <p className="text-muted-foreground leading-relaxed">{guide.description}</p>
                        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                          Choose {guide.name}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Focused Shop Preview */}
      <section className="py-20 bg-background">
        <div className="container">
          <Card className="max-w-5xl mx-auto overflow-hidden border-accent/20 bg-gradient-to-br from-accent/10 via-background to-primary/10">
            <CardContent className="p-8 md:p-12 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent border border-accent/40">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="text-sm font-medium">Wellness essentials</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold">
                  A calm shop, not a crowded shelf
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Candles, oils, cushions, jewelry and ritual wear are gathered in one simple shop door.
                </p>
                <Link href="/shop">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                    Open Shop
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img src="/product-candle-beige-drift.jpg" alt="Serenity Candle" className="rounded-3xl aspect-square object-cover shadow-lg" />
                <img src="/product-oils.jpg" alt="Essential Oils" className="rounded-3xl aspect-square object-cover shadow-lg mt-8" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <TrustIndicators />

      {/* Simple CTA Section */}
      <section className="py-20">
        <div className="container">
          <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-accent/20">
            <CardContent className="p-10 md:p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to enter Drift?
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Start with one door today. Your sanctuary can grow with you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/pricing">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
                    Join Now
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-accent text-accent hover:bg-accent/10">
                    Shop Now
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

const appDoors = [
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "Audiobook",
    description: "Guided chapters for breath, stillness and soft self-discovery.",
    link: "/audiobook",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Journal",
    description: "Write privately, reflect gently and return to yourself.",
    link: "/journal",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Calendar",
    description: "Daily inspiration, rituals and small wellness surprises.",
    link: "/new-year-calendar",
  },
  {
    icon: <Waves className="w-6 h-6" />,
    title: "Soundscapes",
    description: "Mix rain, ocean, wind and birds into your own calm atmosphere.",
    link: "/soundscapes",
  },
  {
    icon: <Moon className="w-6 h-6" />,
    title: "Sleep",
    description: "Long-form sleep videos and calm night rituals for deeper rest.",
    link: "/sleep-videos",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "AI Coach",
    description: "Talk with Maria or Zane when you need guidance, clarity or care.",
    link: "/coach-selection",
  },
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    title: "Shop",
    description: "Wellness essentials gathered in one clean, calm collection.",
    link: "/shop",
  },
  {
    icon: <Gift className="w-6 h-6" />,
    title: "Membership",
    description: "Choose your Drift path and unlock the full sanctuary.",
    link: "/pricing",
  },
];

const guides = [
  {
    name: "Maria",
    badge: "Soft guidance",
    image: "/maria-yoga.jpg",
    description:
      "Warm, empathetic and nurturing. Maria is for the days when you need softness, breathwork and gentle emotional support.",
  },
  {
    name: "Zane",
    badge: "Grounded clarity",
    image: "/zane.jpg",
    description:
      "Steady, wise and grounding. Zane is for the days when you need focus, confidence and calm strength.",
  },
];
