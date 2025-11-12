import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_TITLE, getLoginUrl } from "@/const";
import { Headphones, BookOpen, Calendar, Waves, Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Ocean wave video background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          >
            <source src="/ocean-waves.mp4" type="video/mp4" />
          </video>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/70" />
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent border border-accent/30">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Your wellness journey starts here</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Drift
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Find your stillness. A sanctuary for mindfulness, rest, and self-care in your pocket.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {isAuthenticated ? (
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground group">
                  Continue Your Journey
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              ) : (
                <>
                  <Button 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => window.location.href = getLoginUrl()}
                  >
                    Get Started Free
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
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
              <span className="text-accent">find peace</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Drift combines guided meditations, AI-powered personalization, and calming soundscapes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <Card 
                key={idx}
                className="group bg-card/50 backdrop-blur border-border/50 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/5"
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container">
          <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-accent/20">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to drift into calm?
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Join thousands finding their daily moment of peace
              </p>
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() => window.location.href = getLoginUrl()}
              >
                Start Your Free Journey
              </Button>
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
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Private Journal",
    description: "A safe space to write your thoughts, dreams, and reflections. Powered by AI dream analysis.",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Advent Calendar",
    description: "Daily wellness gifts throughout December. Meditations, exercises, and a chance to win premium prizes.",
  },
  {
    icon: <Waves className="w-6 h-6" />,
    title: "Real-time Soundscapes",
    description: "Mix your perfect ambient sound. Control rain, ocean waves, wind, and birdsong to create your sanctuary.",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "AI Personalization",
    description: "Daily check-ins adapt content to your mood. Get personalized meditation and exercise recommendations.",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "Sleep Music Library",
    description: "Curated music for deep rest. Includes special sections for babies and children.",
  },
];
