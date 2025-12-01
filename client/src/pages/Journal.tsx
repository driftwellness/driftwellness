import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, BookOpen, Heart, Frown, Smile, Meh } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { checkSubscriptionStatus, getTrialDaysRemaining } from "@/lib/subscription";
import Paywall from "@/components/Paywall";

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  mood: "calm" | "anxious" | "happy" | "sad" | "neutral";
  date: string;
  tags: string[];
}

const moodIcons = {
  calm: { icon: Heart, color: "text-blue-500", label: "Calm" },
  happy: { icon: Smile, color: "text-yellow-500", label: "Happy" },
  sad: { icon: Frown, color: "text-gray-500", label: "Sad" },
  anxious: { icon: Frown, color: "text-red-500", label: "Anxious" },
  neutral: { icon: Meh, color: "text-gray-400", label: "Neutral" },
};

export default function Journal() {
  const { user } = useAuth();
  
  // Check subscription status
  const subscriptionStatus = checkSubscriptionStatus(user, null);
  const trialDaysRemaining = getTrialDaysRemaining(user);

  // Show paywall if user doesn't have access
  if (!subscriptionStatus.canAccess) {
    return (
      <Paywall
        title="Private Journal"
        description="Track your thoughts, moods, and wellness journey with unlimited journal entries."
        featureName="the journal"
        showTrialInfo={!user}
        trialDaysRemaining={trialDaysRemaining}
      />
    );
  }

  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      title: "Morning Reflection",
      content: "Started my day with a 10-minute meditation. Feeling centered and ready for what comes.",
      mood: "calm",
      date: "2025-01-16",
      tags: ["meditation", "morning"],
    },
  ]);
  
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    mood: "neutral" as JournalEntry["mood"],
    tags: "",
  });

  const handleCreateEntry = () => {
    if (!newEntry.content.trim()) return;

    const entry: JournalEntry = {
      id: Date.now(),
      title: newEntry.title || "Untitled Entry",
      content: newEntry.content,
      mood: newEntry.mood,
      date: new Date().toISOString().split('T')[0],
      tags: newEntry.tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    setEntries([entry, ...entries]);
    setNewEntry({ title: "", content: "", mood: "neutral", tags: "" });
    setShowNewEntry(false);
  };

  const MoodIcon = ({ mood }: { mood: JournalEntry["mood"] }) => {
    const { icon: Icon, color } = moodIcons[mood];
    return <Icon className={`h-5 w-5 ${color}`} />;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-4">
            <BookOpen className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
            Private Journal
          </h1>
          <p className="text-muted-foreground text-lg">
            A safe space for your thoughts, dreams, and reflections
          </p>
        </div>

        {/* New Entry Button */}
        {!showNewEntry && (
          <Button
            onClick={() => setShowNewEntry(true)}
            className="w-full mb-8 h-14 text-lg bg-accent hover:bg-accent/90"
          >
            <Plus className="mr-2 h-5 w-5" />
            New Entry
          </Button>
        )}

        {/* New Entry Form */}
        {showNewEntry && (
          <Card className="p-6 mb-8 bg-card/90 backdrop-blur-sm border-accent/20">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">New Entry</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Title (optional)
                </label>
                <Input
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  placeholder="Give your entry a title..."
                  className="bg-background/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  How are you feeling?
                </label>
                <div className="flex gap-3">
                  {(Object.keys(moodIcons) as Array<keyof typeof moodIcons>).map((mood) => {
                    const { icon: Icon, color, label } = moodIcons[mood];
                    return (
                      <button
                        key={mood}
                        onClick={() => setNewEntry({ ...newEntry, mood })}
                        className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all ${
                          newEntry.mood === mood
                            ? "border-accent bg-accent/10"
                            : "border-transparent bg-background/50 hover:bg-background"
                        }`}
                      >
                        <Icon className={`h-6 w-6 ${color}`} />
                        <span className="text-xs text-muted-foreground">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Your thoughts
                </label>
                <Textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  placeholder="Write freely... This is your private space."
                  className="min-h-[200px] bg-background/50 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Tags (comma-separated)
                </label>
                <Input
                  value={newEntry.tags}
                  onChange={(e) => setNewEntry({ ...newEntry, tags: e.target.value })}
                  placeholder="meditation, dreams, gratitude..."
                  className="bg-background/50"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleCreateEntry}
                  className="flex-1 bg-accent hover:bg-accent/90"
                  disabled={!newEntry.content.trim()}
                >
                  Save Entry
                </Button>
                <Button
                  onClick={() => {
                    setShowNewEntry(false);
                    setNewEntry({ title: "", content: "", mood: "neutral", tags: "" });
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Entries List */}
        <div className="space-y-4">
          {entries.length === 0 ? (
            <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-dashed">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">
                No entries yet. Start writing to capture your thoughts and feelings.
              </p>
            </Card>
          ) : (
            entries.map((entry) => (
              <Card
                key={entry.id}
                className="p-6 bg-card/90 backdrop-blur-sm border-accent/10 hover:border-accent/30 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <MoodIcon mood={entry.mood} />
                </div>

                <p className="text-muted-foreground leading-relaxed mb-3">
                  {entry.content}
                </p>

                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs rounded-full bg-accent/20 text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
