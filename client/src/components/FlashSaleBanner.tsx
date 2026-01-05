import { useState, useEffect } from 'react';
import { Zap, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getLoginUrl } from '@/const';

export default function FlashSaleBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // Calculate time until Jan 15, 2026
    const calculateTimeLeft = () => {
      const targetDate = new Date('2026-01-15T23:59:59').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);

        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft('Offer Expired');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-30 bg-gradient-to-r from-burgundy via-gold to-burgundy text-white shadow-lg">
      <div className="container py-3 flex items-center justify-between gap-4">
        {/* Left: Icon + Message */}
        <div className="flex items-center gap-3 flex-1">
          <Zap className="w-5 h-5 flex-shrink-0 animate-pulse" />
          <div className="flex-1">
            <p className="text-sm md:text-base font-bold">
              🎉 Limited-Time Offer: 60% OFF Premium
            </p>
            <p className="text-xs md:text-sm opacity-90">
              Join by January 15 • {timeLeft}
            </p>
          </div>
        </div>

        {/* Center: CTA Button */}
        <Button
          onClick={() => window.location.href = getLoginUrl()}
          className="hidden sm:inline-flex bg-white hover:bg-gray-100 text-burgundy font-bold px-4 py-2 h-auto flex-shrink-0"
        >
          Claim Offer
        </Button>

        {/* Right: Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/20 rounded transition-colors flex-shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile CTA */}
      <div className="sm:hidden px-4 pb-3">
        <Button
          onClick={() => window.location.href = getLoginUrl()}
          className="w-full bg-white hover:bg-gray-100 text-burgundy font-bold"
        >
          Claim 60% Off Now
        </Button>
      </div>
    </div>
  );
}
