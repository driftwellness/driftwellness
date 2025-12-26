import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DayCard {
  day: number;
  title: string;
  description: string;
  affirmation: string;
}

const calendarDays: DayCard[] = [
  { day: 1, title: "New Beginnings", description: "Start fresh with intention and purpose", affirmation: "Day 1 - New Beginnings" },
  { day: 2, title: "Embrace Change", description: "Welcome the transformations ahead", affirmation: "Day 2 - Embrace Change" },
  { day: 3, title: "Inner Strength", description: "Discover the power within you", affirmation: "Day 3 - Inner Strength" },
  { day: 4, title: "Radiate Light", description: "Let your inner light shine bright", affirmation: "Day 4 - Radiate Light" },
  { day: 5, title: "Embrace Joy", description: "Find happiness in every moment", affirmation: "Day 5 - Embrace Joy" },
  { day: 6, title: "Celebrate Progress", description: "Honor how far you've come", affirmation: "Day 6 - Celebrate Progress" },
  { day: 7, title: "Believe in You", description: "Trust yourself completely", affirmation: "Day 7 - Believe in You" },
  { day: 8, title: "Spread Kindness", description: "Share compassion with the world", affirmation: "Day 8 - Spread Kindness" },
  { day: 9, title: "Find Balance", description: "Harmonize your mind and body", affirmation: "Day 9 - Find Balance" },
  { day: 10, title: "Love Yourself", description: "Practice self-compassion daily", affirmation: "Day 10 - Love Yourself" },
  { day: 11, title: "Halfway There", description: "Celebrate your journey so far", affirmation: "Day 11 - Halfway There" },
  { day: 12, title: "Keep Going", description: "Momentum builds your success", affirmation: "Day 12 - Keep Going" },
  { day: 13, title: "Embrace Change", description: "Transform your perspective", affirmation: "Day 13 - Embrace Change" },
  { day: 14, title: "Love Yourself", description: "You are worthy of love", affirmation: "Day 14 - Love Yourself" },
  { day: 15, title: "Halfway There", description: "Celebrate this milestone moment", affirmation: "Day 15 - Halfway There" },
  { day: 16, title: "Keep Going", description: "Your goals are within reach", affirmation: "Day 16 - Keep Going" },
  { day: 17, title: "Embrace Change", description: "Growth comes from transformation", affirmation: "Day 17 - Embrace Change" },
  { day: 18, title: "Breathe Deeply", description: "Find calm in the present moment", affirmation: "Day 18 - Breathe Deeply" },
  { day: 19, title: "Trust the Process", description: "Everything unfolds perfectly", affirmation: "Day 19 - Trust the Process" },
  { day: 20, title: "Shine Bright", description: "Your light is needed in the world", affirmation: "Day 20 - Shine Bright" },
  { day: 21, title: "Create Magic", description: "Manifest your dreams into reality", affirmation: "Day 21 - Create Magic" },
  { day: 22, title: "Celebrate You", description: "You are enough, just as you are", affirmation: "Day 22 - Celebrate You" },
  { day: 23, title: "Nurture Yourself", description: "Self-care is self-love", affirmation: "Day 23 - Nurture Yourself" },
  { day: 24, title: "Dream Big", description: "Your potential is limitless", affirmation: "Day 24 - Dream Big" },
  { day: 25, title: "Gratitude Flows", description: "Appreciate the blessings in your life", affirmation: "Day 25 - Gratitude Flows" },
  { day: 26, title: "Strength Within", description: "You have all you need inside", affirmation: "Day 26 - Strength Within" },
  { day: 27, title: "Inspire Others", description: "Your journey inspires transformation", affirmation: "Day 27 - Inspire Others" },
  { day: 28, title: "Reflect & Grow", description: "Wisdom comes from reflection", affirmation: "Day 28 - Reflect & Grow" },
  { day: 29, title: "Embrace Tomorrow", description: "The future is full of possibility", affirmation: "Day 29 - Embrace Tomorrow" },
  { day: 30, title: "You Are Enough", description: "Never doubt your worth", affirmation: "Day 30 - You Are Enough" },
  { day: 31, title: "New Year, New You", description: "Celebrate your transformation", affirmation: "Day 31 - New Year, New You" },
];

export default function NewYearCalendar() {
  const [selectedDay, setSelectedDay] = useState<DayCard | null>(null);
  const [viewedDays, setViewedDays] = useState<number[]>([]);

  // Check if we're in January
  const currentMonth = new Date().getMonth() + 1; // 1-12
  const currentDay = new Date().getDate();
  const isJanuary = currentMonth === 1;

  const canViewDay = (day: number) => {
    if (!isJanuary) return false; // Only in January
    return day <= currentDay; // Can view today and past days
  };

  const handleDayClick = (dayCard: DayCard) => {
    if (!canViewDay(dayCard.day)) {
      return; // Don't open future days
    }
    setSelectedDay(dayCard);
    if (!viewedDays.includes(dayCard.day)) {
      setViewedDays([...viewedDays, dayCard.day]);
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

        {/* Hero Image */}
        <div className="max-w-md mx-auto mb-8">
          <Card className="overflow-hidden border-accent/20 shadow-2xl">
            <img
              src="/new-year-calendar-1.jpg"
              alt="New Year Calendar 2026"
              className="w-full h-auto"
            />
          </Card>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
            New Year Calendar
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            31 days of inspiration, affirmations, and wellness wisdom. Open a new card each day in January to discover your daily message.
          </p>
        </div>

        {/* Calendar Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 mb-8">
            {calendarDays.map((dayCard) => {
              const isViewed = viewedDays.includes(dayCard.day);
              const canView = canViewDay(dayCard.day);

              return (
                <button
                  key={dayCard.day}
                  onClick={() => handleDayClick(dayCard)}
                  disabled={!canView}
                  className={`
                    aspect-square rounded-lg border-2 flex flex-col items-center justify-center gap-1 transition-all
                    ${canView 
                      ? "cursor-pointer hover:scale-105 hover:border-accent hover:shadow-lg" 
                      : "cursor-not-allowed opacity-40"
                    }
                    ${isViewed 
                      ? "bg-accent/20 border-accent" 
                      : "bg-card border-border hover:border-accent/50"
                    }
                  `}
                >
                  <span className="font-bold text-sm md:text-base">
                    {dayCard.day}
                  </span>
                  {isViewed && <Sparkles className="h-3 w-3 text-accent" />}
                </button>
              );
            })}
          </div>

          {/* Info Message */}
          {!isJanuary && (
            <Card className="p-6 bg-muted/50 text-center">
              <p className="text-muted-foreground">
                The New Year Calendar will be available in January. Come back then to open daily cards and discover your daily affirmations!
              </p>
            </Card>
          )}

          {isJanuary && (
            <Card className="p-6 bg-accent/10 border-accent/20 text-center">
              <p className="text-foreground font-medium">
                ✨ You've viewed {viewedDays.length} of {currentDay} days so far. Keep going! ✨
              </p>
            </Card>
          )}
        </div>

        {/* Day Card Dialog */}
        <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-accent" />
                {selectedDay && `Day ${selectedDay.day}`}
              </DialogTitle>
              <DialogDescription className="text-left space-y-4 pt-4">
                {selectedDay && (
                  <>
                    {/* Day Card Image */}
                    <div className="w-full mb-4">
                      <img
                        src={`/new-year-calendar-${selectedDay.day}.jpg`}
                        alt={`Day ${selectedDay.day}`}
                        className="w-full h-auto rounded-lg shadow-lg"
                        onError={(e) => {
                          // Fallback if image doesn't exist
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {selectedDay.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {selectedDay.description}
                      </p>
                      <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                        <p className="text-center text-accent font-medium italic">
                          "{selectedDay.affirmation}"
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground text-center">
                        Take a moment to reflect on this affirmation today.
                      </p>
                    </div>
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
