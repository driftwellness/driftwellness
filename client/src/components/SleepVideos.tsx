import { useState } from 'react';
import { X, Play, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SleepVideo {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  thumbnail: string;
  benefits: string[];
}

const sleepVideos: SleepVideo[] = [
  {
    id: 'deep-sleep-forest',
    title: 'Deep Sleep Forest Soundscape',
    description: 'Lucid dreaming with forest sounds and binaural beats. Perfect for deep, restorative sleep.',
    youtubeId: 'yAuybpvAups',
    duration: '8 hours',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
    benefits: ['Lucid dreaming', 'Binaural beats', 'Deep sleep', 'Forest sounds'],
  },
  {
    id: 'forest-dreams',
    title: 'Forest Dreams - Ambient Sleep',
    description: 'Ambient deep sleep music with forest atmosphere. Dark screen mode for uninterrupted sleep.',
    youtubeId: 'akPK9GkhQwQ',
    duration: '8 hours',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
    benefits: ['Ambient music', 'Dark screen', 'Forest vibes', 'Relaxation'],
  },
  {
    id: 'blue-forest',
    title: 'The Blue Forest - Insomnia Relief',
    description: 'Fall asleep fast with binaural beats and forest sounds. Scientifically designed for insomnia relief.',
    youtubeId: 'FIMdEPd98xs',
    duration: '8 hours',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
    benefits: ['Insomnia relief', 'Fast sleep', 'Binaural beats', 'Stress relief'],
  },
  {
    id: 'forest-flow',
    title: 'Forest Flow - Delta Brainwaves',
    description: 'Deep healing sleep with delta brainwaves. Promotes REM sleep and restoration.',
    youtubeId: '8WSedYBHF88',
    duration: '8 hours',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
    benefits: ['Delta waves', 'Healing sleep', 'REM sleep', 'Restoration'],
  },
  {
    id: 'calm-creek',
    title: 'The Calm Creek - Forest Creek Sounds',
    description: 'Relaxing forest creek sounds with isochronic tones and binaural beats for deep sleep.',
    youtubeId: 'ceYZqr6m-P0',
    duration: '8 hours',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
    benefits: ['Creek sounds', 'Isochronic tones', 'Nature sounds', 'Deep sleep'],
  },
];

interface SleepVideosProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SleepVideos({ isOpen, onClose }: SleepVideosProps) {
  const [selectedVideo, setSelectedVideo] = useState<SleepVideo | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Moon className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold">Sleep Videos</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {selectedVideo ? (
            // Video Player View
            <div className="space-y-6">
              {/* Back Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-accent hover:text-accent/80 transition-colors font-semibold flex items-center gap-2"
              >
                ← Back to Videos
              </button>

              {/* Video Player */}
              <div className="bg-black rounded-xl overflow-hidden shadow-lg">
                <div className="relative w-full aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&controls=1&modestbranding=1`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Video Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{selectedVideo.title}</h3>
                  <p className="text-muted-foreground">{selectedVideo.description}</p>
                  <p className="text-sm text-accent font-semibold mt-2">Duration: {selectedVideo.duration}</p>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold mb-3">Benefits:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVideo.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                      >
                        ✓ {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <Card className="p-4 bg-accent/5 border-accent/20">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-accent">💡 Tip:</span> For best results, use headphones and let the video play throughout your sleep. The binaural beats and forest sounds work best with consistent listening.
                  </p>
                </Card>
              </div>
            </div>
          ) : (
            // Video Grid View
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Choose a Sleep Video</h3>
                <p className="text-muted-foreground">
                  Select any of these curated forest brain wave sleep videos to help you fall asleep and stay asleep.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sleepVideos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className="group relative rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                      {/* Play Button */}
                      <div className="flex justify-center items-center">
                        <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm group-hover:bg-white/50 transition-all flex items-center justify-center">
                          <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                        </div>
                      </div>

                      {/* Title & Duration */}
                      <div>
                        <h4 className="font-bold text-sm mb-1 line-clamp-2">{video.title}</h4>
                        <p className="text-xs text-white/80">{video.duration}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Info Card */}
              <Card className="p-4 bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
                <p className="text-sm text-foreground">
                  <span className="font-semibold text-accent">🌙 Sleep Tip:</span> These videos use binaural beats and forest sounds to naturally guide your brain into sleep. Best used with headphones in a dark room for optimal results.
                </p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
