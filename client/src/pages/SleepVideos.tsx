import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Trees, Snowflake, CloudRain, Waves, Fish, Star } from "lucide-react";
import { Link } from "wouter";
import Paywall from "@/components/Paywall";
import { useAuth } from "@/_core/hooks/useAuth";
import { checkSubscriptionStatus } from "@/lib/subscription";

const sleepVideos = [
  {
    id: "norwegian-nature",
    title: "Norwegian Nature",
    description: "Birds chirping in peaceful Norwegian forests",
    icon: Trees,
    videoId: "Ch9pDGtlKXU",
    color: "from-green-600 to-emerald-600",
  },
  {
    id: "cozy-cabin",
    title: "Cozy Cabin in Snow",
    description: "Warm fireplace with snowy winter views",
    icon: Snowflake,
    videoId: "Ma7lsZduLJk",
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: "tropical-rain",
    title: "Tropical Rain",
    description: "Soothing rain in the jungle",
    icon: CloudRain,
    videoId: "c9pQYOGIWM8",
    color: "from-teal-600 to-green-600",
  },
  {
    id: "beach-waves",
    title: "Beach Brainwave Therapy",
    description: "Ocean waves with binaural beats for deep sleep",
    icon: Waves,
    videoId: "AMNyQds2ABQ",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "aquarium",
    title: "Silent Aquarium",
    description: "Peaceful fish swimming in coral reefs",
    icon: Fish,
    videoId: "05E3w-u8cE4",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "starry-night",
    title: "Starry Night Forest",
    description: "Gazing up at stars through trees with soft wind",
    icon: Star,
    videoId: "gYSrJT3RxRA",
    color: "from-indigo-600 to-purple-600",
  },
];

export default function SleepVideos() {
  const { user } = useAuth();
  const [selectedVideo, setSelectedVideo] = useState(sleepVideos[0]);

  // Check if user has access
  const subscriptionStatus = checkSubscriptionStatus(user, null); // TODO: fetch actual subscription
  
  if (!subscriptionStatus.canAccess) {
    return (
      <Paywall
        title="Sleep Videos"
        description="Access 8-hour sleep videos with soothing nature scenes and sounds for deep, restful sleep"
        featureName="sleep videos"
        showTrialInfo={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Sleep Videos</h1>
                <p className="text-sm text-muted-foreground">Have Your Best Sleep</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Video Player */}
        <div className="mb-8">
          <Card className="overflow-hidden bg-black">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=0&rel=0&modestbranding=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="p-6 bg-card">
              <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
              <p className="text-muted-foreground">{selectedVideo.description}</p>
            </div>
          </Card>
        </div>

        {/* Video Categories */}
        <div>
          <h3 className="text-xl font-bold mb-4">Choose Your Sleep Environment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sleepVideos.map((video) => {
              const Icon = video.icon;
              const isSelected = selectedVideo.id === video.id;
              
              return (
                <Card
                  key={video.id}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    isSelected ? "ring-2 ring-primary shadow-lg" : ""
                  }`}
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className={`p-6 bg-gradient-to-br ${video.color} text-white`}>
                    <Icon className="w-12 h-12 mb-4" />
                    <h4 className="text-lg font-bold mb-2">{video.title}</h4>
                    <p className="text-sm text-white/90">{video.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        <Card className="mt-8 p-6 bg-muted/50">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Moon className="w-5 h-5 text-primary" />
            Sleep Tips
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Use headphones for the best binaural beats experience</li>
            <li>• Set your device to "Do Not Disturb" mode</li>
            <li>• Dim your screen brightness or use night mode</li>
            <li>• Let the video play for at least 20-30 minutes before sleeping</li>
            <li>• Create a comfortable sleep environment (cool, dark, quiet)</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
