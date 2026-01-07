import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import SoundscapePlayer from "@/components/SoundscapePlayer";

export default function Soundscapes() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4">
          <Link href="/">
            <div className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Home</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Soundscapes Content */}
      <SoundscapePlayer />
    </div>
  );
}
