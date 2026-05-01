import { useState, useEffect } from 'react';
import { Gift, Lock, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CalendarSurprise {
  day: number;
  type: 'discount' | 'gift' | 'product';
  title: string;
  description: string;
  value?: string;
  icon: string;
}

// 30 days of surprises - mix of discounts, gifts, and products
const surprises: CalendarSurprise[] = [
  { day: 1, type: 'discount', title: '10% Off', description: 'Your first meditation session', value: '10%', icon: '🎯' },
  { day: 2, type: 'gift', title: 'Free Chapter', description: 'Audiobook Chapter 2 unlocked', icon: '📖' },
  { day: 3, type: 'discount', title: '15% Off', description: 'Shop items', value: '15%', icon: '🛍️' },
  { day: 4, type: 'gift', title: 'Soundscape Pack', description: 'Ocean Waves + Forest Sounds', icon: '🌊' },
  { day: 5, type: 'product', title: 'Serenity Candle', description: 'Free with Premium', icon: '🕯️' },
  { day: 6, type: 'discount', title: '20% Off', description: 'Wellness products', value: '20%', icon: '💆' },
  { day: 7, type: 'gift', title: 'Meditation Guide', description: 'Exclusive 7-day challenge', icon: '🧘' },
  { day: 8, type: 'discount', title: '5% Off', description: 'Everything in shop', value: '5%', icon: '✨' },
  { day: 9, type: 'gift', title: 'Sleep Story', description: 'Premium sleep meditation', icon: '😴' },
  { day: 10, type: 'product', title: 'Calm Oil', description: 'Aromatherapy essential oil', icon: '🌿' },
  { day: 11, type: 'discount', title: '25% Off', description: 'One product of choice', value: '25%', icon: '🎁' },
  { day: 12, type: 'gift', title: 'Journal Prompt', description: 'Guided reflection session', icon: '📝' },
  { day: 13, type: 'discount', title: '12% Off', description: 'Audiobook chapters', value: '12%', icon: '📚' },
  { day: 14, type: 'gift', title: 'Breathing Exercise', description: 'Stress relief technique', icon: '💨' },
  { day: 15, type: 'product', title: 'Bath Salts', description: 'Luxury spa experience', icon: '🛁' },
  { day: 16, type: 'discount', title: '18% Off', description: 'Soundscapes library', value: '18%', icon: '🎵' },
  { day: 17, type: 'gift', title: 'Affirmation Card', description: 'Daily inspiration', icon: '💫' },
  { day: 18, type: 'discount', title: '8% Off', description: 'Next purchase', value: '8%', icon: '💳' },
  { day: 19, type: 'gift', title: 'Meditation Timer', description: 'Customizable sessions', icon: '⏱️' },
  { day: 20, type: 'product', title: 'Pillow Mist', description: 'Sleep enhancement spray', icon: '🌙' },
  { day: 21, type: 'discount', title: '30% Off', description: 'One premium item', value: '30%', icon: '🔥' },
  { day: 22, type: 'gift', title: 'Yoga Flow', description: 'Morning yoga session', icon: '🧘‍♀️' },
  { day: 23, type: 'discount', title: '15% Off', description: 'Entire order', value: '15%', icon: '🎉' },
  { day: 24, type: 'gift', title: 'Visualization Guide', description: 'Goal-setting meditation', icon: '🎨' },
  { day: 25, type: 'product', title: 'Face Mask', description: 'Spa-quality skincare', icon: '💅' },
  { day: 26, type: 'discount', title: '22% Off', description: 'Wellness bundle', value: '22%', icon: '💝' },
  { day: 27, type: 'gift', title: 'Sound Bath', description: 'Healing frequencies', icon: '🔊' },
  { day: 28, type: 'discount', title: '11% Off', description: 'Any item', value: '11%', icon: '⭐' },
  { day: 29, type: 'gift', title: 'Gratitude Journal', description: 'Reflection prompts', icon: '🙏' },
  { day: 30, type: 'product', title: 'Mystery Gift', description: 'Grand finale surprise!', icon: '🎊' },
];

export default function HolderOurCalendar() {
  const [openedDays, setOpenedDays] = useState<number[]>([]);
  const [currentDay, setCurrentDay] = useState(1);

  useEffect(() => {
    // Get current day of month (1-30)
    const today = new Date().getDate();
    const dayOfMonth = Math.min(today, 30);
    setCurrentDay(dayOfMonth);

    // Load opened days from localStorage
    const saved = localStorage.getItem('holderOurCalendarOpened');
    if (saved) {
      setOpenedDays(JSON.parse(saved));
    }
  }, []);

  const handleOpenDay = (day: number) => {
    if (day > currentDay) {
      toast.error('Not available yet', {
        description: `This door opens on day ${day}`,
      });
      return;
    }

    if (openedDays.includes(day)) {
      toast.info('Already opened', {
        description: 'You already opened this door today',
      });
      return;
    }

    const surprise = surprises[day - 1];
    const newOpened = [...openedDays, day];
    setOpenedDays(newOpened);
    localStorage.setItem('holderOurCalendarOpened', JSON.stringify(newOpened));

    // Show surprise
    toast.success(`${surprise.icon} ${surprise.title}!`, {
      description: surprise.description,
      duration: 5000,
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Holder Our Calendar
        </h2>
        <p className="text-muted-foreground">
          Open one door every day for 30 days of surprises
        </p>
        <p className="text-sm text-accent mt-2">
          {currentDay}/30 days available • {openedDays.length} doors opened
        </p>
      </div>

      {/* Calendar Image Background */}
      <div className="relative mb-8 rounded-lg overflow-hidden border-2 border-accent/20">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663211473528/V3wXCRHnDzQL2RtY2j3x4F/holder-our-calendar-summer-cd2qaG6kKMei2PwaiqcLu9.webp"
          alt="Holder Our Calendar"
          className="w-full h-auto"
        />
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-3 mb-8">
        {surprises.map((surprise) => {
          const isOpened = openedDays.includes(surprise.day);
          const isAvailable = surprise.day <= currentDay;
          const isToday = surprise.day === currentDay && !isOpened;

          return (
            <button
              key={surprise.day}
              onClick={() => handleOpenDay(surprise.day)}
              disabled={!isAvailable}
              className={`relative aspect-square rounded-lg transition-all duration-300 transform hover:scale-105 ${
                isOpened
                  ? 'bg-accent/20 border-2 border-accent cursor-default'
                  : isAvailable
                  ? 'bg-gradient-to-br from-accent/30 to-primary/30 border-2 border-accent/50 hover:border-accent cursor-pointer'
                  : 'bg-muted border-2 border-muted-foreground/20 cursor-not-allowed opacity-50'
              } ${isToday ? 'ring-2 ring-accent ring-offset-2' : ''}`}
            >
              {/* Day Number */}
              <div className="absolute top-2 right-2 text-xs font-bold text-foreground">
                {surprise.day}
              </div>

              {/* Content */}
              <div className="flex flex-col items-center justify-center h-full p-2 text-center">
                {isOpened ? (
                  <>
                    <span className="text-2xl mb-1">{surprise.icon}</span>
                    <span className="text-xs font-semibold text-accent">Opened</span>
                  </>
                ) : isAvailable ? (
                  <>
                    <Gift className="w-5 h-5 mb-1 text-accent animate-bounce" />
                    <span className="text-xs font-semibold text-foreground">Open</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mb-1 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Locked</span>
                  </>
                )}
              </div>

              {/* Today Indicator */}
              {isToday && (
                <div className="absolute inset-0 rounded-lg border-2 border-accent animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Info Card */}
      <Card className="p-6 bg-accent/5 border-accent/20">
        <div className="flex items-start gap-4">
          <Sparkles className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold mb-2">How it works</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Open one door every day</li>
              <li>✓ Unlock discounts, gifts, and products</li>
              <li>✓ Each month brings a new calendar</li>
              <li>✓ Surprises reset daily - don't miss out!</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Current Day Surprise Preview */}
      {currentDay <= 30 && !openedDays.includes(currentDay) && (
        <div className="mt-6 p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/20">
          <p className="text-sm text-muted-foreground mb-2">Today's surprise waiting:</p>
          <div className="flex items-center justify-between">
            <span className="font-semibold">
              {surprises[currentDay - 1].icon} {surprises[currentDay - 1].title}
            </span>
            <Button
              size="sm"
              className="bg-accent hover:bg-accent/90"
              onClick={() => handleOpenDay(currentDay)}
            >
              Open Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
