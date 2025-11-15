import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const chapters = [
  {
    id: 1,
    title: "The Morning Breath",
    subtitle: "Starting Your Day with Intention",
    duration: "10:32",
    audioUrl: "/audio/chapter1.wav",
  },
  {
    id: 2,
    title: "Finding Calm in the Storm",
    subtitle: "Managing Stress and Overwhelm",
    duration: "9:45",
    audioUrl: "/audio/chapter2.wav",
  },
  {
    id: 3,
    title: "The Evening Wind-Down",
    subtitle: "Preparing for Rest",
    duration: "8:20",
    audioUrl: "/audio/chapter3.wav",
  },
  {
    id: 4,
    title: "Sleep's Embrace",
    subtitle: "The Power of Rest",
    duration: "10:15",
    audioUrl: "/audio/chapter4.wav",
  },
  {
    id: 5,
    title: "Mindfulness and Presence",
    subtitle: "Being Here, Now",
    duration: "11:05",
    audioUrl: "/audio/chapter5.wav",
  },
];

export default function Audiobook() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      if (currentChapter < chapters.length - 1) {
        setCurrentChapter(currentChapter + 1);
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentChapter]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = value[0];
    setVolume(value[0]);
  };

  const handlePlaybackRateChange = (rate: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const skipForward = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setIsPlaying(false);
    }
  };

  const skipBackward = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
      setIsPlaying(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-blue-50 to-sand-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-ocean-600 via-ocean-500 to-gold-500 bg-clip-text text-transparent mb-4">
            Audiobook
          </h1>
          <p className="text-ocean-700 text-lg">
            Five chapters to guide you toward inner peace
          </p>
        </div>

        {/* Player Card */}
        <Card className="max-w-2xl mx-auto p-8 bg-white/80 backdrop-blur-sm shadow-xl">
          {/* Current Chapter Info */}
          <div className="text-center mb-8">
            <div className="text-sm text-ocean-600 font-medium mb-2">
              Chapter {chapters[currentChapter].id}
            </div>
            <h2 className="text-3xl font-bold text-ocean-800 mb-2">
              {chapters[currentChapter].title}
            </h2>
            <p className="text-ocean-600">
              {chapters[currentChapter].subtitle}
            </p>
          </div>

          {/* Audio Element */}
          <audio
            ref={audioRef}
            src={chapters[currentChapter].audioUrl}
            preload="metadata"
          />

          {/* Progress Bar */}
          <div className="mb-6">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-ocean-600">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={skipBackward}
              disabled={currentChapter === 0}
              className="text-ocean-600 hover:text-ocean-800"
            >
              <SkipBack className="h-6 w-6" />
            </Button>

            <Button
              size="icon"
              onClick={togglePlay}
              className="h-16 w-16 rounded-full bg-gradient-to-r from-ocean-500 to-ocean-600 hover:from-ocean-600 hover:to-ocean-700 shadow-lg"
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={skipForward}
              disabled={currentChapter === chapters.length - 1}
              className="text-ocean-600 hover:text-ocean-800"
            >
              <SkipForward className="h-6 w-6" />
            </Button>
          </div>

          {/* Playback Speed Control */}
          <div className="mb-6">
            <div className="text-sm font-medium text-ocean-700 mb-3">
              Playback Speed
            </div>
            <div className="flex gap-2">
              {[0.5, 0.75, 1, 1.25, 1.5].map((rate) => (
                <Button
                  key={rate}
                  variant={playbackRate === rate ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePlaybackRateChange(rate)}
                  className={playbackRate === rate ? "bg-ocean-500 hover:bg-ocean-600" : ""}
                >
                  {rate}x
                </Button>
              ))}
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 mb-8">
            <Volume2 className="h-5 w-5 text-ocean-600" />
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="flex-1"
            />
          </div>

          {/* Chapter List */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-ocean-700 mb-3">
              All Chapters
            </div>
            {chapters.map((chapter, index) => (
              <button
                key={chapter.id}
                onClick={() => {
                  setCurrentChapter(index);
                  setIsPlaying(false);
                }}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  index === currentChapter
                    ? "bg-ocean-100 border-2 border-ocean-400"
                    : "bg-sand-50 hover:bg-sand-100 border-2 border-transparent"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-ocean-600 font-medium">
                      Chapter {chapter.id}
                    </div>
                    <div className="font-semibold text-ocean-800">
                      {chapter.title}
                    </div>
                    <div className="text-sm text-ocean-600">
                      {chapter.subtitle}
                    </div>
                  </div>
                  <div className="text-sm text-ocean-600">{chapter.duration}</div>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
