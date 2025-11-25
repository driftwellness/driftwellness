import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, Share2, X } from "lucide-react";
import { getRandomPoem, type PoemMood } from "@/data/poems";
import { toast } from "sonner";

interface DailyPoemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mood?: PoemMood;
}

export function DailyPoemDialog({ open, onOpenChange, mood }: DailyPoemDialogProps) {
  const [poem, setPoem] = useState(getRandomPoem(mood));
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (open) {
      setPoem(getRandomPoem(mood));
      setIsFavorited(false);
    }
  }, [open, mood]);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? "Removed from favorites" : "Added to favorites");
  };

  const handleShare = async () => {
    const text = `${poem.title}\n\n${poem.content}\n\n- ${poem.author}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: poem.title,
          text: text,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text);
      toast.success("Poem copied to clipboard!");
    }
  };

  const getMoodColor = (mood: PoemMood) => {
    switch (mood) {
      case "calming":
        return "text-blue-500";
      case "motivating":
        return "text-orange-500";
      case "empowering":
        return "text-purple-500";
      case "loving":
        return "text-pink-500";
      case "mixed":
        return "text-accent";
      default:
        return "text-accent";
    }
  };

  const getMoodEmoji = (mood: PoemMood) => {
    switch (mood) {
      case "calming":
        return "🌊";
      case "motivating":
        return "🔥";
      case "empowering":
        return "⚡";
      case "loving":
        return "💖";
      case "mixed":
        return "✨";
      default:
        return "✨";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{getMoodEmoji(poem.mood)}</span>
              <DialogTitle className="text-2xl font-serif">
                Your Daily Poem
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className={`text-sm font-medium ${getMoodColor(poem.mood)}`}>
            {poem.mood.charAt(0).toUpperCase() + poem.mood.slice(1)} • {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Poem Title */}
          <h3 className="text-xl font-semibold text-center">
            {poem.title}
          </h3>

          {/* Poem Content */}
          <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg p-6 border border-accent/20">
            <p className="text-base leading-relaxed whitespace-pre-line text-center italic">
              {poem.content}
            </p>
          </div>

          {/* Author */}
          <p className="text-sm text-muted-foreground text-right">
            - {poem.author}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleFavorite}
            >
              <Heart className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-current text-red-500' : ''}`} />
              {isFavorited ? 'Favorited' : 'Favorite'}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Close Button */}
          <Button
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={() => onOpenChange(false)}
          >
            Start Your Day
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
