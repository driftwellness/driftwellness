import { useState, useEffect } from 'react';
import { X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getLoginUrl } from '@/const';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Only show once per session
    if (hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Check if user is leaving from top of page
      if (e.clientY <= 0) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-burgundy to-gold p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Wait!</h2>
          </div>
          <p className="text-white/90">Don't miss out on your special offer</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-4xl font-bold text-burgundy mb-2">50% OFF</p>
            <p className="text-muted-foreground">Your first month of Premium</p>
            <p className="text-xs text-muted-foreground/70 mt-2">Limited time offer</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <div className="w-1.5 h-1.5 bg-burgundy rounded-full" />
              <span>7-day free trial included</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <div className="w-1.5 h-1.5 bg-burgundy rounded-full" />
              <span>Cancel anytime, no questions asked</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <div className="w-1.5 h-1.5 bg-burgundy rounded-full" />
              <span>Join 1,366+ members finding peace</span>
            </div>
          </div>

          <Button
            onClick={() => window.location.href = getLoginUrl()}
            className="w-full bg-burgundy hover:bg-burgundy/90 text-white font-semibold py-3 mb-3"
          >
            Claim 50% Off Now
          </Button>

          <button
            onClick={() => setIsVisible(false)}
            className="w-full text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            No thanks, I'll pass
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
