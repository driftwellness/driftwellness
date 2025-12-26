import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Droplet, 
  Heart, 
  Users, 
  Vote, 
  Camera, 
  CheckCircle2,
  Sparkles,
  Globe,
  HandHeart,
  MessageCircle,
  Trophy
} from "lucide-react";
import { Link } from "wouter";

export default function OurMission() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">Our Mission</h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#8B4049]/10 via-background to-[#D4AF37]/10">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20 text-sm px-4 py-2">
            <Droplet className="w-4 h-4 mr-2" />
            Clean Water Changes Everything
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Your Peace of Mind,<br />
            <span className="text-[#D4AF37]">Their Source of Life</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            When you find tranquility with Drift, you're also giving the gift of clean water 
            to communities who need it most. Here's our story and how we make it happen.
          </p>
        </div>
      </section>

      {/* Why We Help Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              💧 Why We Help
            </h2>
            <p className="text-lg text-muted-foreground">The story behind our mission</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Card className="border-l-4 border-l-[#D4AF37]">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#8B4049]" />
                    The Connection
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our app helps you find inner peace and clarity. But for millions of people around 
                    the world, the daily struggle isn't about finding calm—it's about finding clean water.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-[#8B4049]">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#D4AF37]" />
                    The Reality
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    771 million people lack access to clean water. Children walk miles every day 
                    instead of going to school. Families get sick from waterborne diseases. 
                    Without clean water, there can be no peace.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-[#D4AF37]">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#8B4049]" />
                    Our Promise
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We believe that when you invest in your wellbeing, you should also be able to 
                    invest in someone else's survival. That's why a portion of every subscription 
                    goes directly to clean water projects.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-br from-[#8B4049]/20 to-[#D4AF37]/20 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold mb-2">Our 5-Year Goal</h3>
              <p className="text-4xl font-bold text-[#D4AF37] mb-2">35 Million NOK</p>
              <p className="text-muted-foreground">
                in donations to bring clean water, sanitation, and hygiene to vulnerable communities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Step by Step */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              🚀 How It Works
            </h2>
            <p className="text-lg text-muted-foreground">Your journey from subscriber to changemaker</p>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-[#D4AF37] text-white p-6 md:w-24 flex items-center justify-center">
                    <span className="text-4xl font-bold">1</span>
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                      <HandHeart className="w-5 h-5 text-[#D4AF37]" />
                      You Subscribe
                    </h3>
                    <p className="text-muted-foreground">
                      When you become a Drift member, a portion of your subscription is automatically 
                      set aside for clean water projects. Premium members contribute 50 NOK/month, 
                      Impact members contribute 100 NOK/month.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-[#8B4049] text-white p-6 md:w-24 flex items-center justify-center">
                    <span className="text-4xl font-bold">2</span>
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#8B4049]" />
                      We Grow Together
                    </h3>
                    <p className="text-muted-foreground">
                      As our community grows, so does our impact fund. We track our progress publicly 
                      and celebrate every milestone together. When we reach 15,000 members, we unlock 
                      our first major donation!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-[#D4AF37] text-white p-6 md:w-24 flex items-center justify-center">
                    <span className="text-4xl font-bold">3</span>
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                      <Vote className="w-5 h-5 text-[#D4AF37]" />
                      You Vote!
                    </h3>
                    <p className="text-muted-foreground">
                      Here's the fun part! When we reach a milestone, YOU get to decide where the 
                      money goes. Submit project proposals, vote for your favorites, and watch 
                      democracy in action!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-[#8B4049] text-white p-6 md:w-24 flex items-center justify-center">
                    <span className="text-4xl font-bold">4</span>
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                      <Camera className="w-5 h-5 text-[#8B4049]" />
                      We Document Everything
                    </h3>
                    <p className="text-muted-foreground">
                      Transparency is everything. Our founder personally travels to the winning project 
                      to document the impact. You'll see photos, videos, and meet the families whose 
                      lives you've changed.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 5 */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-gradient-to-r from-[#D4AF37] to-[#8B4049] text-white p-6 md:w-24 flex items-center justify-center">
                    <span className="text-4xl font-bold">5</span>
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-[#D4AF37]" />
                      Celebrate & Repeat
                    </h3>
                    <p className="text-muted-foreground">
                      We celebrate our collective impact, share the stories, and then set our sights 
                      on the next milestone. Every 15,000 new members = another community with clean water!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Voting System */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              🗳️ The Voting System
            </h2>
            <p className="text-lg text-muted-foreground">Democracy meets charity—here's how you decide!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto">
                  <MessageCircle className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="font-bold text-lg">Week 1: Propose</h3>
                <p className="text-sm text-muted-foreground">
                  Members submit project ideas. Want to fund a well in Kenya? A water purification 
                  system in Bangladesh? Share your vision!
                </p>
                <Badge variant="outline">Open to all members</Badge>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#8B4049]/10 flex items-center justify-center mx-auto">
                  <Vote className="w-8 h-8 text-[#8B4049]" />
                </div>
                <h3 className="font-bold text-lg">Week 2: Vote</h3>
                <p className="text-sm text-muted-foreground">
                  We narrow it down to the top 5 proposals. Every member gets one vote. 
                  The top 3 move to the final round!
                </p>
                <Badge variant="outline">1 member = 1 vote</Badge>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#8B4049]/20 flex items-center justify-center mx-auto">
                  <Trophy className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="font-bold text-lg">Week 3: Winner!</h3>
                <p className="text-sm text-muted-foreground">
                  Final vote decides the winner! We announce the project, partner with trusted 
                  organizations, and make it happen.
                </p>
                <Badge variant="outline">100% transparent</Badge>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-[#8B4049]/10 to-[#D4AF37]/10 border-[#D4AF37]/20">
            <CardContent className="p-8 text-center space-y-4">
              <h3 className="text-2xl font-bold">🎉 Why This Matters</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Most charities decide for you. We believe that when you contribute, you should 
                have a say. This isn't just a donation—it's YOUR impact, YOUR choice, YOUR legacy.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Democratic</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Transparent</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Engaging</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Fun!</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Video Section - Mamie's Story */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              💙 See The Impact
            </h2>
            <p className="text-lg text-muted-foreground">
              Watch how clean water changes everything
            </p>
          </div>

          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dPXVAqwaSJU"
              title="Mamie's Story - charity: water"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Video by charity: water — one of the organizations we partner with
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join Drift today and become part of a community that cares about 
            inner peace AND global impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg" className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white px-8">
                <Heart className="w-5 h-5 mr-2" />
                Join the Movement
              </Button>
            </Link>
            <Link href="/impact">
              <Button size="lg" variant="outline" className="px-8">
                <Droplet className="w-5 h-5 mr-2" />
                See Our Progress
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
