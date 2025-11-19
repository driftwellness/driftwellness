import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Gift, Star, Sparkles } from "lucide-react";
import { Link } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Prize {
  day: number;
  title: string;
  description: string;
  value: string;
  icon: "gift" | "star" | "sparkles";
}

const prizes: Prize[] = [
  { day: 1, title: "Welcome Meditation", description: "Exclusive 15-minute guided meditation to start your journey", value: "Free", icon: "sparkles" },
  { day: 2, title: "Breathing Exercise", description: "Advanced breathwork technique for stress relief", value: "Free", icon: "sparkles" },
  { day: 3, title: "Premium Week", description: "7 days of Premium access", value: "199 kr", icon: "gift" },
  { day: 4, title: "Morning Routine", description: "Personalized morning wellness routine", value: "Free", icon: "sparkles" },
  { day: 5, title: "Wellness E-book", description: "Digital guide to mindful living", value: "149 kr", icon: "gift" },
  { day: 6, title: "Evening Ritual", description: "Calming bedtime routine for better sleep", value: "Free", icon: "sparkles" },
  { day: 7, title: "Premium Month", description: "Full month of Premium access", value: "199 kr", icon: "star" },
  { day: 8, title: "Yoga Flow", description: "20-minute gentle yoga sequence", value: "Free", icon: "sparkles" },
  { day: 9, title: "Aromatherapy Guide", description: "Essential oils for wellness", value: "99 kr", icon: "gift" },
  { day: 10, title: "Meditation Music", description: "Exclusive ambient soundscape", value: "Free", icon: "sparkles" },
  { day: 11, title: "Wellness Journal", description: "Digital journaling templates", value: "79 kr", icon: "gift" },
  { day: 12, title: "Stress Relief", description: "Quick techniques for busy days", value: "Free", icon: "sparkles" },
  { day: 13, title: "Premium Month", description: "Another month of Premium", value: "199 kr", icon: "star" },
  { day: 14, title: "Sleep Stories", description: "Calming bedtime narratives", value: "Free", icon: "sparkles" },
  { day: 15, title: "Wellness Discount", description: "20% off partner products", value: "Variable", icon: "gift" },
  { day: 16, title: "Mindfulness Practice", description: "Daily mindfulness exercises", value: "Free", icon: "sparkles" },
  { day: 17, title: "Energy Boost", description: "Morning energizing routine", value: "Free", icon: "sparkles" },
  { day: 18, title: "Premium Month", description: "Yet another Premium month", value: "199 kr", icon: "star" },
  { day: 19, title: "Gratitude Practice", description: "Guided gratitude meditation", value: "Free", icon: "sparkles" },
  { day: 20, title: "Spa Discount", description: "Partner spa 30% discount", value: "Variable", icon: "gift" },
  { day: 21, title: "Winter Wellness", description: "Seasonal self-care guide", value: "Free", icon: "sparkles" },
  { day: 22, title: "Premium 3 Months", description: "Three months Premium access", value: "597 kr", icon: "star" },
  { day: 23, title: "New Year Prep", description: "Intention-setting workshop", value: "Free", icon: "sparkles" },
  { 
    day: 24, 
    title: "🎄 GRAND PRIZE 🎄", 
    description: "1 YEAR Premium + Luxury Wellness Package (yoga mat, meditation cushion, essential oils, spa gift card)", 
    value: "5,000 kr+", 
    icon: "star" 
  },
];

export default function AdventCalendar() {
  const [selectedDoor, setSelectedDoor] = useState<Prize | null>(null);
  const [openedDoors, setOpenedDoors] = useState<number[]>([]);

  // Simulate current date (in production, use actual date)
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1; // 1-12
  const isDecember = currentMonth === 12;

  const canOpenDoor = (day: number) => {
    if (!isDecember) return false; // Only in December
    return day <= currentDay; // Can open today and past days
  };

  const handleDoorClick = (prize: Prize) => {
    if (!canOpenDoor(prize.day)) {
      return; // Don't open future doors
    }
    setSelectedDoor(prize);
    if (!openedDoors.includes(prize.day)) {
      setOpenedDoors([...openedDoors, prize.day]);
    }
  };

  const getIconComponent = (iconType: Prize["icon"]) => {
    switch (iconType) {
      case "gift":
        return Gift;
      case "star":
        return Star;
      case "sparkles":
        return Sparkles;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          {/* Christmas Calendar Image */}
          <div className="max-w-md mx-auto mb-8">
            <img
              src="/christmas-calendar-custom.png"
              alt="Luxury Christmas Advent Calendar"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
            Advent Calendar
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Daily wellness gifts throughout December. Open a new door each day for meditations, exercises, and chances to win premium prizes!
          </p>
        </div>

        {/* Calendar Image */}
        <div className="max-w-5xl mx-auto mb-12">
          <Card className="overflow-hidden border-accent/20">
            <img
              src="/advent-calendar.jpg"
              alt="Luxury Advent Calendar"
              className="w-full h-auto"
            />
          </Card>
        </div>

        {/* Grand Prize Highlight */}
        <Card className="max-w-3xl mx-auto mb-12 bg-gradient-to-br from-accent/20 via-primary/10 to-accent/20 border-accent/40">
          <div className="p-8 text-center">
            <Star className="h-12 w-12 text-accent mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3">December 24th Grand Prize</h2>
            <p className="text-xl text-muted-foreground mb-2">
              1 Year Premium Membership + Luxury Wellness Package
            </p>
            <p className="text-sm text-muted-foreground">
              Includes: Yoga mat, meditation cushion, essential oils set, and 1,000 kr spa gift card
            </p>
            <p className="text-accent font-bold text-2xl mt-4">Value: 5,000+ kr</p>
          </div>
        </Card>

        {/* Doors Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 mb-8">
            {prizes.map((prize) => {
              const isOpen = openedDoors.includes(prize.day);
              const canOpen = canOpenDoor(prize.day);
              const Icon = getIconComponent(prize.icon);

              return (
                <button
                  key={prize.day}
                  onClick={() => handleDoorClick(prize)}
                  disabled={!canOpen}
                  className={`
                    aspect-square rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all
                    ${canOpen 
                      ? "cursor-pointer hover:scale-105 hover:border-accent hover:shadow-lg" 
                      : "cursor-not-allowed opacity-50"
                    }
                    ${isOpen 
                      ? "bg-accent/20 border-accent" 
                      : "bg-card border-border"
                    }
                    ${prize.day === 24 ? "col-span-2 row-span-2 text-2xl" : ""}
                  `}
                >
                  <span className={`font-bold ${prize.day === 24 ? "text-3xl" : "text-xl"}`}>
                    {prize.day}
                  </span>
                  {isOpen && <Icon className="h-4 w-4 text-accent" />}
                </button>
              );
            })}
          </div>

          {/* Info */}
          {!isDecember && (
            <Card className="p-6 bg-muted/50 text-center">
              <p className="text-muted-foreground">
                The Advent Calendar will be available in December. Come back then to open daily doors and win prizes!
              </p>
            </Card>
          )}
        </div>

        {/* Prize Dialog */}
        <Dialog open={!!selectedDoor} onOpenChange={() => setSelectedDoor(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-2xl">
                {selectedDoor && (
                  <>
                    {(() => {
                      const Icon = getIconComponent(selectedDoor.icon);
                      return <Icon className="h-6 w-6 text-accent" />;
                    })()}
                    Day {selectedDoor.day}
                  </>
                )}
              </DialogTitle>
              <DialogDescription className="text-left space-y-4 pt-4">
                {selectedDoor && (
                  <>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {selectedDoor.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {selectedDoor.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-muted-foreground">Value:</span>
                      <span className="text-lg font-bold text-accent">{selectedDoor.value}</span>
                    </div>
                    {selectedDoor.day === 24 && (
                      <div className="bg-accent/10 rounded-lg p-4 mt-4">
                        <p className="text-sm text-center text-accent font-medium">
                          🎄 Enter to win by being an active Premium member! 🎄
                        </p>
                      </div>
                    )}
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
