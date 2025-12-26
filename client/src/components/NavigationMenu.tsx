import { useState } from "react";
import { Menu, X, Droplet, Heart, BookOpen, Sparkles, Music, Video, Zap } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Our Mission", href: "/our-mission", icon: <Heart className="w-4 h-4" /> },
    { label: "Impact", href: "/impact", icon: <Droplet className="w-4 h-4" /> },
    { label: "Audiobook", href: "/audiobook", icon: <BookOpen className="w-4 h-4" /> },
    { label: "AI Coach", href: "/coach-selection", icon: <Sparkles className="w-4 h-4" /> },
    { label: "Soundscapes", href: "/soundscapes", icon: <Music className="w-4 h-4" /> },
    { label: "Sleep Videos", href: "/sleep-videos", icon: <Video className="w-4 h-4" /> },
    { label: "Journal", href: "/journal", icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <div className="relative">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Menu className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl z-50 overflow-hidden border border-border/20">
          <div className="p-2 space-y-1">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors group"
                >
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-border/20" />

          {/* Footer Links */}
          <div className="p-2 space-y-1">
            <Link href="/pricing">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-3 text-left text-sm font-semibold text-[#D4AF37] hover:bg-muted rounded-md transition-colors"
              >
                💳 Pricing & Subscribe
              </button>
            </Link>
            <Link href="/shop">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-3 text-left text-sm font-semibold text-[#8B4049] hover:bg-muted rounded-md transition-colors"
              >
                🛍️ Shop
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
