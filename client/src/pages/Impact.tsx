import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Droplet, Users, Heart, Vote, Camera } from "lucide-react";
import { Link } from "wouter";
import { APP_TITLE } from "@/const";

export default function Impact() {
  // TODO: Fetch real member count from database
  const currentMembers = 0;
  const goalMembers = 15000;
  const donationAmount = 10000000; // 10 million NOK
  const progress = (currentMembers / goalMembers) * 100;

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
            <h1 className="text-xl font-bold text-foreground">{APP_TITLE}</h1>
            <div className="w-24" /> {/* Spacer */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20">
            <Droplet className="w-3 h-3 mr-1" />
            Together We Create Change
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Our Mission: Clean Water for All
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Vår app handler om å finne ro og klarhet inni deg. Men for millioner av mennesker handler kampen hver dag om noe enda mer grunnleggende: å finne rent vann.
          </p>
        </div>
      </section>

      {/* Progress Tracker */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-2 border-[#D4AF37]/20 bg-gradient-to-br from-card to-muted/30">
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  🎯 MÅL 1: {goalMembers.toLocaleString()} MEDLEMMER – {(donationAmount / 1000000).toFixed(0)} MILLIONER KR I DONASJONER
                </h2>
              </div>

              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="w-full h-8 bg-muted rounded-full overflow-hidden border border-border">
                  <div 
                    className="h-full bg-gradient-to-r from-[#8B4049] to-[#D4AF37] transition-all duration-500 flex items-center justify-end pr-3"
                    style={{ width: `${Math.max(progress, 5)}%` }}
                  >
                    <span className="text-xs font-bold text-white">
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                </div>
                
                <div className="text-center space-y-1">
                  <p className="text-3xl font-bold text-foreground">
                    {currentMembers.toLocaleString()} <span className="text-muted-foreground">av</span> {goalMembers.toLocaleString()} <span className="text-muted-foreground">medlemmer</span> 🎊
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Vi mangler {(goalMembers - currentMembers).toLocaleString()} medlemmer før vi når vårt første donasjonsmål!
                  </p>
                </div>
              </div>

              <div className="text-center pt-4">
                <Link href="/pricing">
                  <Button size="lg" className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white">
                    <Heart className="w-4 h-4 mr-2" />
                    Join the Movement
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* The Vision */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl space-y-6">
          <h2 className="text-3xl font-bold text-center text-foreground">
            Hvorfor Rent Vann?
          </h2>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p>
              Uten rent vann, er det ingen ro. Uten sanitær, er det ingen helse. Urenset vann forurenser ikke bare kroppen, men også muligheten til å tenke, å lære, og å drømme.
            </p>
            
            <p>
              Derfor har vi satt oss et dristig mål: å donere 10 millioner kroner for å gi de mest sårbare samfunnene tilgang til rent vann, sanitær og hygiene.
            </p>
            
            <p>
              Når du velger vår app, velger du ikke bare din egen mentale helse. Du blir en del av en bevegelse som gir barn muligheten til å gå på skole istedenfor å hente vann, som redder familier fra dødelige sykdommer, og som skaper forutsetningene for at mennesker kan tenke på mer enn bare overlevelse.
            </p>
            
            <p className="font-semibold text-foreground text-xl text-center pt-4">
              Sammen skaper vi en verden hvor alle har mulighet til å søke den indre roen du nettopp fant.
            </p>
          </div>
        </div>
      </section>

      {/* What Happens When We Reach the Goal */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          <h2 className="text-3xl font-bold text-center text-foreground">
            🗳️ Hva Skjer Når Vi Når Målet?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#8B4049]/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#8B4049]" />
                </div>
                <h3 className="font-bold text-lg">1. Innsamling av Forslag</h3>
                <p className="text-sm text-muted-foreground">
                  (1 uke) "Hva skal de 10 millionene støtte? Legg inn ditt forslag!"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <Vote className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="font-bold text-lg">2. Avstemningsrunde</h3>
                <p className="text-sm text-muted-foreground">
                  (1 uke) "Stem på ditt favorittformål! Topp 3 går videre."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#8B4049]/10 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-[#8B4049]" />
                </div>
                <h3 className="font-bold text-lg">3. Reisen</h3>
                <p className="text-sm text-muted-foreground">
                  Jeg drar til prosjektet og dokumenterer alt. Du ser hvor dine penger gikk!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Future Milestones */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl space-y-8">
          <h2 className="text-3xl font-bold text-center text-foreground">
            🔮 Fremtidige Milepæler
          </h2>
          
          <div className="space-y-4">
            <Card className="border-l-4 border-l-[#D4AF37]">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-[#D4AF37]">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">15,000 medlemmer → 10M NOK til rent vann</h3>
                    <p className="text-sm text-muted-foreground">
                      Første donasjon går til rent vann-prosjekter i sårbare samfunn
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#8B4049]">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#8B4049]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-[#8B4049]">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">30,000 medlemmer → 10M NOK til nytt prosjekt</h3>
                    <p className="text-sm text-muted-foreground">
                      Medlemmene velger! Stemmekonkurranse avgjør hva vi støtter
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#D4AF37]">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-[#D4AF37]">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">45,000 medlemmer → 10M NOK til nytt prosjekt</h3>
                    <p className="text-sm text-muted-foreground">
                      Ny stemmerunde! Fellesskapet bestemmer
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-muted-foreground italic">
            Hvert 2. år, når vi når nye milepæler, velger DU hva vi støtter!
          </p>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-[#8B4049]/5 to-[#D4AF37]/5 border-[#D4AF37]/20">
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  💙 Transparens & Tillit
                </h2>
                <p className="text-muted-foreground">
                  Hver krone teller. Her er hvordan det fungerer:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Premium (299 NOK/mnd)</h3>
                  <p className="text-sm text-muted-foreground">
                    50 NOK av ditt abonnement går direkte til rent vann-prosjekter
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Impact (349 NOK/mnd)</h3>
                  <p className="text-sm text-muted-foreground">
                    100 NOK av ditt abonnement går direkte til rent vann-prosjekter
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Når vi når 15,000 medlemmer, drar jeg personlig til prosjektet for å dokumentere hvor pengene går. Du får se bilder, videoer og møte familiene som får rent vann.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            Klar til å Gjøre en Forskjell?
          </h2>
          <p className="text-lg text-muted-foreground">
            Velg Premium eller Impact og bli en del av bevegelsen som gir rent vann til de som trenger det mest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg" className="bg-[#8B4049] hover:bg-[#8B4049]/90 text-white">
                <Droplet className="w-4 h-4 mr-2" />
                Se Pricing
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline">
                Tilbake til Hjem
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
