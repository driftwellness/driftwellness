import { Gift, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReferralBadge() {
  const handleShare = () => {
    const text = "Join Drift - Your sanctuary of serenity! Get 1 month free when you use my referral link 🧘‍♀️";
    const url = "https://driftwellness.no";
    
    if (navigator.share) {
      navigator.share({
        title: 'Drift - Wellness App',
        text: text,
        url: url,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${text}\n${url}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <section className="py-12 bg-gradient-to-r from-burgundy/5 via-gold/5 to-burgundy/5 border-y border-border">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 md:gap-6">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="p-3 bg-gold/20 rounded-full">
                <Gift className="w-6 h-6 text-gold" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-1">
                Share the Serenity
              </h3>
              <p className="text-sm text-muted-foreground">
                Invite friends and get <span className="font-semibold text-burgundy">1 month free</span> for each successful referral
              </p>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleShare}
              className="flex-shrink-0 bg-burgundy hover:bg-burgundy/90 text-white gap-2"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Invite Friends</span>
              <span className="sm:hidden">Invite</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
