import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_TITLE, getLoginUrl } from "@/const";
import { Headphones, BookOpen, Calendar, Waves, Sparkles, ArrowRight, Gift, ShoppingBag } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
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
                      {/* Curved gold circle decoration */}
                      <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)]" viewBox="0 0 220 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="110" cy="45" rx="105" ry="40" stroke="#D4AF37" strokeWidth="2" fill="none" className="animate-pulse" style={{animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'}} />
                      </svg>
                      <Button size="lg" variant="outline" className="relative gap-2 bg-background hover:bg-accent/10 border-transparent">
                        <ShoppingBag className="w-5 h-5" />
                        Shop (Opens Jan 1st)
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
                      {/* Curved gold circle decoration */}
                      <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)]" viewBox="0 0 220 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="110" cy="45" rx="105" ry="40" stroke="#D4AF37" strokeWidth="2" fill="none" className="animate-pulse" style={{animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'}} />
                      </svg>
                      <Button size="lg" variant="outline" className="relative gap-2 bg-background hover:bg-accent/10 border-transparent">
                        <ShoppingBag className="w-5 h-5" />
                        Shop (Opens Jan 1st)
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

      {/* Meet Your Guide - Amara Section */}
      <section className="py-24 bg-gradient-to-b from-background to-card/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Amara Image */}
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl" />
                <img 
                  src="/amara-welcome-v2.jpg" 
                  alt="Amara - Your Wellness Guide"
                  className="relative rounded-3xl shadow-2xl w-full"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 md:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent border border-accent/40">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Meet Your Guide</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold">
                This is{" "}
                <span className="text-accent">Amara</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Your personal wellness companion on the journey to inner peace. Amara combines ancient wisdom with modern mindfulness to guide you through meditation, breathwork, and self-discovery.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                With her warm presence and intuitive guidance, Amara helps you navigate life's challenges and find moments of tranquility in your daily routine.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/ai-coach">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Chat with Amara
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
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
      <footer className="border-t border-border/50 py-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 {APP_TITLE}. Find your stillness.</p>
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
    title: "Advent Calendar",
    description: "Daily wellness gifts throughout December. Meditations, exercises, and a chance to win premium prizes.",
    link: "/advent-calendar",
  },
  {
    icon: <Waves className="w-6 h-6" />,
    title: "Real-time Soundscapes",
    description: "Mix your perfect ambient sound. Control rain, ocean waves, wind, and birdsong to create your sanctuary.",
    link: "/soundscapes",
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
