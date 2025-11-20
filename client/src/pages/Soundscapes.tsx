import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Home, Play, Pause, Volume2 } from "lucide-react";

// Soundscape data with free ambient sounds
const soundscapes = [
  {
    id: 1,
    name: "Ocean Waves",
    description: "Gentle waves lapping on the shore",
    icon: "🌊",
    // Using freesound.org or similar free ambient sounds
    audioUrl: "https://cdn.freesound.org/previews/393/393736_5121236-lq.mp3",
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: 2,
    name: "Rain",
    description: "Soft rainfall on leaves",
    icon: "🌧️",
    audioUrl: "https://cdn.freesound.org/previews/416/416710_5121236-lq.mp3",
    color: "from-gray-400 to-blue-400",
  },
  {
    id: 3,
    name: "Forest",
    description: "Birds chirping in the woods",
    icon: "🌲",
    audioUrl: "https://cdn.freesound.org/previews/415/415209_5121236-lq.mp3",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 4,
    name: "Campfire",
    description: "Crackling fire and embers",
    icon: "🔥",
    audioUrl: "https://cdn.freesound.org/previews/397/397354_5121236-lq.mp3",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    name: "Wind",
    description: "Gentle breeze through trees",
    icon: "💨",
    audioUrl: "https://cdn.freesound.org/previews/442/442827_5121236-lq.mp3",
    color: "from-gray-300 to-blue-300",
  },
  {
    id: 6,
    name: "Thunderstorm",
    description: "Distant thunder and rain",
    icon: "⛈️",
    audioUrl: "https://cdn.freesound.org/previews/416/416710_5121236-lq.mp3",
    color: "from-gray-600 to-purple-600",
  },
  {
    id: 7,
    name: "River",
    description: "Flowing water over rocks",
    icon: "🏞️",
    audioUrl: "https://cdn.freesound.org/previews/393/393736_5121236-lq.mp3",
    color: "from-blue-300 to-teal-400",
  },
  {
    id: 8,
    name: "Night Crickets",
    description: "Peaceful evening sounds",
    icon: "🌙",
    audioUrl: "https://cdn.freesound.org/previews/415/415209_5121236-lq.mp3",
    color: "from-indigo-600 to-purple-700",
  },
];

interface PlayingSound {
  id: number;
  audio: HTMLAudioElement;
  volume: number;
}

export default function Soundscapes() {
  const [playingSounds, setPlayingSounds] = useState<Map<number, PlayingSound>>(new Map());

  const toggleSound = (soundscape: typeof soundscapes[0]) => {
    setPlayingSounds((prev) => {
      const newMap = new Map(prev);
      
      if (newMap.has(soundscape.id)) {
        // Stop and remove
        const sound = newMap.get(soundscape.id)!;
        sound.audio.pause();
        newMap.delete(soundscape.id);
      } else {
        // Create and play
        const audio = new Audio(soundscape.audioUrl);
        audio.loop = true;
        audio.volume = 0.7;
        audio.play().catch(console.error);
        
        newMap.set(soundscape.id, {
          id: soundscape.id,
          audio,
          volume: 70,
        });
      }
      
      return newMap;
    });
  };

  const updateVolume = (id: number, volume: number) => {
    setPlayingSounds((prev) => {
      const newMap = new Map(prev);
      const sound = newMap.get(id);
      
      if (sound) {
        sound.audio.volume = volume / 100;
        sound.volume = volume;
        newMap.set(id, sound);
      }
      
      return newMap;
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      playingSounds.forEach((sound) => {
        sound.audio.pause();
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5E6D3] via-[#E8D4C0] to-[#D4B5A0]">
      {/* Header */}
      <header className="border-b border-[#8B4049]/20 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
          <h1 className="text-2xl font-serif font-bold text-[#8B4049]">Soundscapes</h1>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 text-center">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#8B4049] mb-6">
            Ambient Nature Sounds
          </h2>
          <p className="text-lg text-[#6B4E4E] mb-8">
            Create your perfect sanctuary with calming soundscapes. Mix and match to find your ideal atmosphere for meditation, focus, or sleep.
          </p>
        </div>
      </section>

      {/* Soundscapes Grid */}
      <section className="pb-20">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {soundscapes.map((soundscape) => {
              const isPlaying = playingSounds.has(soundscape.id);
              const volume = playingSounds.get(soundscape.id)?.volume || 70;

              return (
                <Card
                  key={soundscape.id}
                  className={`overflow-hidden transition-all duration-300 ${
                    isPlaying ? "ring-2 ring-[#D4AF37] shadow-xl" : "hover:shadow-lg"
                  }`}
                >
                  <div className={`h-32 bg-gradient-to-br ${soundscape.color} flex items-center justify-center`}>
                    <span className="text-6xl">{soundscape.icon}</span>
                  </div>
                  
                  <CardContent className="p-4 space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-[#8B4049] mb-1">
                        {soundscape.name}
                      </h3>
                      <p className="text-sm text-[#6B4E4E]">
                        {soundscape.description}
                      </p>
                    </div>

                    <Button
                      onClick={() => toggleSound(soundscape)}
                      variant={isPlaying ? "default" : "outline"}
                      className="w-full gap-2"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-4 w-4" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          Play
                        </>
                      )}
                    </Button>

                    {isPlaying && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Volume2 className="h-4 w-4 text-[#6B4E4E]" />
                          <Slider
                            value={[volume]}
                            onValueChange={([v]) => updateVolume(soundscape.id, v)}
                            max={100}
                            step={1}
                            className="flex-1"
                          />
                          <span className="text-sm text-[#6B4E4E] w-8">{volume}%</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Tip */}
          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto bg-white/80 border-[#D4AF37]">
              <CardContent className="p-6">
                <p className="text-[#6B4E4E]">
                  <span className="font-semibold text-[#8B4049]">💡 Tip:</span> Play multiple sounds together to create your perfect ambiance. Try combining Ocean Waves with Rain for a coastal storm experience!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
