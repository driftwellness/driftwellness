import { useState } from 'react';
import { Play, Pause, Volume2, Moon } from 'lucide-react';
import SleepVideos from './SleepVideos';

interface Soundscape {
  id: string;
  name: string;
  description: string;
  youtubeId: string;
  icon: string;
  duration: string;
  imageUrl: string;
  color: string;
  credit?: string;
}

const soundscapes: Soundscape[] = [
  {
    id: 'ocean',
    name: 'Ocean Waves',
    description: 'Real ocean waves - gentle and soothing for deep sleep',
    youtubeId: 'WLn84Z03gm8',
    icon: '🌊',
    duration: '8 hours',
    imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&h=400&fit=crop',
    color: 'from-blue-600/80 to-blue-900/80',
  },
  {
    id: 'forest-sleep',
    name: 'Deep Sleep Forest Soundscape',
    description: 'Forest sounds with binaural beats for lucid dreaming and deep sleep',
    youtubeId: 'yAuybpvAups',
    icon: '🌲',
    duration: '8 hours',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
    color: 'from-green-600/80 to-green-900/80',
  },
  {
    id: 'forest-dreams',
    name: 'Forest Dreams - Ambient Sleep',
    description: 'Ambient deep sleep music with forest atmosphere and dark screen',
    youtubeId: 'akPK9GkhQwQ',
    icon: '🌙',
    duration: '8 hours',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
    color: 'from-emerald-600/80 to-emerald-900/80',
  },
  {
    id: 'birds',
    name: 'Real Bird Sounds',
    description: 'Authentic bird songs in nature - peaceful and natural',
    youtubeId: '1Dylx9JBBZg',
    icon: '🦜',
    duration: '4 hours',
    imageUrl: 'https://images.unsplash.com/photo-1444464666175-1642a9f33e12?w=600&h=400&fit=crop',
    color: 'from-rose-600/80 to-rose-900/80',
  },
  {
    id: 'white-noise',
    name: 'White Noise',
    description: 'Pure white noise for deep sleep and focus',
    youtubeId: '9s3BnmSoXs4',
    icon: '🤍',
    duration: '8 hours',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop',
    color: 'from-gray-400/80 to-gray-600/80',
  },
  {
    id: 'pink-noise',
    name: 'Pink Noise',
    description: 'Deeper and more soothing than white noise',
    youtubeId: '-f-JjmEtrvQ',
    icon: '🎵',
    duration: '9 hours',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop',
    color: 'from-pink-500/80 to-pink-700/80',
  },
  {
    id: 'delta-waves',
    name: 'Delta Wave Sleep',
    description: 'Brainwave entrainment for deep healing sleep',
    youtubeId: 'xQ6xgDI7Whc',
    icon: '🧠',
    duration: '8 hours',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=400&fit=crop',
    color: 'from-purple-600/80 to-purple-900/80',
  },
  {
    id: 'sadhguru-meditation',
    name: 'Sadhguru Meditation',
    description: 'Guided meditation by Sadhguru - inner engineering for peace',
    youtubeId: 'ZKp0vKEPJqY',
    icon: '🧘',
    duration: '30 minutes',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
    color: 'from-orange-600/80 to-orange-900/80',
    credit: 'Content by Sadhguru',
  },
  {
    id: 'sadhguru-talk',
    name: 'Sadhguru Talk',
    description: 'Wisdom talk by Sadhguru on inner transformation',
    youtubeId: 'ZKp0vKEPJqY',
    icon: '💬',
    duration: '45 minutes',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
    color: 'from-yellow-600/80 to-yellow-900/80',
    credit: 'Content by Sadhguru',
  },
  {
    id: 'sadhguru-sleep',
    name: 'Sadhguru Sleep Meditation',
    description: 'Guided sleep meditation by Sadhguru for restful sleep',
    youtubeId: 'ZKp0vKEPJqY',
    icon: '😴',
    duration: '20 minutes',
    imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=400&fit=crop',
    color: 'from-indigo-600/80 to-indigo-900/80',
    credit: 'Content by Sadhguru',
  },
];

export default function SoundscapePlayer() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [sleepVideosOpen, setSleepVideosOpen] = useState(false);

  const handlePlay = (id: string) => {
    setPlaying(playing === id ? null : id);
  };

  const currentSound = soundscapes.find(s => s.id === playing);

  return (
    <section className="py-20 bg-gradient-to-b from-background via-background to-accent/5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/20 text-gold border border-gold/40">
              <Volume2 className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide">Real-time Soundscapes</span>
            </div>
            <button
              onClick={() => setSleepVideosOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/20 text-accent border border-accent/40 hover:bg-accent/30 transition-colors"
            >
              <Moon className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide">Sleep Videos</span>
            </button>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Create Your Perfect <span className="text-gold">Ambient Sound</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Mix your perfect ambient environment with high-quality nature sounds and guided meditations. Control ocean waves, forest ambience, and more to create your personal sanctuary.
          </p>
        </div>

        {/* Player Display */}
        {currentSound && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gold/20">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${currentSound.imageUrl})` }}
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentSound.color}`} />
              
              {/* Content */}
              <div className="relative z-10 p-12 min-h-96 flex flex-col justify-between">
                <div>
                  <div className="text-6xl mb-4">{currentSound.icon}</div>
                  <h3 className="text-4xl font-bold text-white mb-3">{currentSound.name}</h3>
                  <p className="text-lg text-white/90 mb-2">{currentSound.description}</p>
                  <p className="text-sm text-white/80">Duration: {currentSound.duration}</p>
                  {currentSound.credit && (
                    <p className="text-xs text-white/70 mt-4 italic">{currentSound.credit}</p>
                  )}
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setPlaying(null)}
                  className="self-start mt-8 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition-all font-semibold"
                >
                  Close Player
                </button>
              </div>
            </div>

            {/* YouTube Player Below */}
            <div className="mt-6 bg-black rounded-xl overflow-hidden shadow-lg">
              <div className="relative w-full aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentSound.youtubeId}?autoplay=1&controls=1&modestbranding=1`}
                  title={currentSound.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        {/* Soundscape Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {soundscapes.map((sound) => (
            <button
              key={sound.id}
              onClick={() => handlePlay(sound.id)}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                playing === sound.id
                  ? 'ring-2 ring-gold shadow-2xl'
                  : 'hover:shadow-xl'
              }`}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${sound.imageUrl})` }}
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${sound.color} group-hover:opacity-75 transition-opacity`} />

              {/* Content */}
              <div className="relative z-10 p-6 h-64 flex flex-col justify-between text-white">
                <div className="text-4xl">{sound.icon}</div>

                <div>
                  <h3 className="font-bold text-lg mb-2 text-left">{sound.name}</h3>
                  <p className="text-sm text-white/90 text-left line-clamp-2 mb-3">
                    {sound.description}
                  </p>
                  <p className="text-xs text-white/80">{sound.duration}</p>
                  {sound.credit && (
                    <p className="text-xs text-white/70 mt-2 italic">{sound.credit}</p>
                  )}
                </div>

                {/* Play Button */}
                <div className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                  playing === sound.id
                    ? 'bg-white text-burgundy'
                    : 'bg-white/30 backdrop-blur-sm group-hover:bg-white/50 text-white'
                }`}>
                  {playing === sound.id ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-0.5" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-16 bg-gradient-to-r from-burgundy/10 via-gold/10 to-burgundy/10 rounded-2xl border border-gold/30 p-8 text-center">
          <p className="text-lg text-foreground">
            <span className="font-bold text-gold">✨ Tip:</span> Click any soundscape to play it. Let the natural sounds and guided meditations guide you to tranquility and inner peace.
          </p>
        </div>
      </div>

      {/* Sleep Videos Modal */}
      <SleepVideos isOpen={sleepVideosOpen} onClose={() => setSleepVideosOpen(false)} />
    </section>
  );
}
