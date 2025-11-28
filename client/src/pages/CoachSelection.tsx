import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface CoachSelectionProps {
  onSelectCoach: (coach: "maria" | "zane") => void;
}

export default function CoachSelection({ onSelectCoach }: CoachSelectionProps) {
  const [, setLocation] = useLocation();

  const handleSelect = (coach: "maria" | "zane") => {
    onSelectCoach(coach);
    setLocation("/ai-coach");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-16">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Velg hvem du vil prate med
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Møt dine personlige wellness-guider. Velg den som føles riktig for deg.
          </p>
        </div>

        {/* Coach Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Maria */}
          <Card 
            className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
            onClick={() => handleSelect("maria")}
          >
            <CardContent className="p-0">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="/maria.jpg"
                  alt="Maria - AI Wellness Coach"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-2">Maria</h2>
                <p className="text-muted-foreground mb-4">
                  Varm, empatisk og støttende. Maria guider deg med omsorg og forståelse gjennom din wellness-reise.
                </p>
                <Button 
                  className="w-full bg-[#8B4049] hover:bg-[#8B4049]/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect("maria");
                  }}
                >
                  Velg Maria
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Zane */}
          <Card 
            className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
            onClick={() => handleSelect("zane")}
          >
            <CardContent className="p-0">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="/zane.jpg"
                  alt="Zane - AI Wellness Coach"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-2">Zane</h2>
                <p className="text-muted-foreground mb-4">
                  Rolig, vis og jordnær. Zane gir deg styrke og motivasjon med en trygg og stødig tilstedeværelse.
                </p>
                <Button 
                  className="w-full bg-[#8B4049] hover:bg-[#8B4049]/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect("zane");
                  }}
                >
                  Velg Zane
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
          >
            Tilbake til hjemmesiden
          </Button>
        </div>
      </div>
    </div>
  );
}
