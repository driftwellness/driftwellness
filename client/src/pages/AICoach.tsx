import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Sparkles, Heart, Zap, Moon, RefreshCw } from "lucide-react";
import { Link, useLocation } from "wouter";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const coachPersonalities = [
  {
    id: "supportive",
    name: "Supportive",
    icon: Heart,
    color: "text-blue-500",
    description: "Warm, empathetic, and encouraging",
    systemPrompt: "You are a warm, supportive wellness coach. Be empathetic, encouraging, and focus on emotional support. Use gentle language and validate the user's feelings.",
  },
  {
    id: "motivating",
    name: "Motivating",
    icon: Zap,
    color: "text-yellow-500",
    description: "Energetic and action-oriented",
    systemPrompt: "You are an energetic, motivating wellness coach. Be enthusiastic, action-oriented, and inspire the user to take positive steps. Use uplifting language and celebrate progress.",
  },
  {
    id: "calming",
    name: "Calming",
    icon: Moon,
    color: "text-purple-500",
    description: "Peaceful and meditative",
    systemPrompt: "You are a calm, peaceful wellness coach. Be soothing, meditative, and help the user find inner peace. Use gentle, flowing language and focus on mindfulness.",
  },
];

const coachData = {
  maria: {
    name: "Maria",
    image: "/maria.jpg",
    greeting: "Hello 🪷 I'm Maria, your personal wellness guide. I'm here to walk beside you on your journey to inner peace and balance. How are you feeling today?",
    description: "Maria combines ancient wisdom with modern guidance to support your journey to inner peace and well-being. With warmth and compassion, she's here to help you find balance in your daily life.",
  },
  zane: {
    name: "Zane",
    image: "/zane.jpg",
    greeting: "Hey there 🌿 I'm Zane, your wellness coach. I'm here to help you build strength, clarity, and balance in your life. What's on your mind today?",
    description: "Zane brings grounded wisdom and steady support to your wellness journey. With a calm and confident presence, he helps you find your inner strength and navigate life's challenges with clarity.",
  },
};

interface AICoachProps {
  selectedCoach?: "maria" | "zane";
}

export default function AICoach({ selectedCoach = "maria" }: AICoachProps) {
  const [, setLocation] = useLocation();
  const [currentCoach, setCurrentCoach] = useState<"maria" | "zane">(selectedCoach);
  const coach = coachData[currentCoach];
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: coach.greeting,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState(coachPersonalities[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update messages when coach changes
  useEffect(() => {
    setMessages([
      {
        id: 1,
        role: "assistant",
        content: coachData[currentCoach].greeting,
        timestamp: new Date(),
      },
    ]);
  }, [currentCoach]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSwitchCoach = () => {
    setLocation("/coach-selection");
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (in production, this would call your AI API)
    setTimeout(() => {
      const mariaResponses = [
        "That's wonderful to hear. Taking time for self-reflection is an important step in your wellness journey. What specific area would you like to focus on today?",
        "I understand how you're feeling. Remember, it's completely normal to have ups and downs. Let's explore some gentle practices that might help you find balance.",
        "Your awareness of your emotional state is a sign of growth. Would you like to try a brief breathing exercise, or would you prefer to talk more about what's on your mind?",
        "It sounds like you're making meaningful progress. Consistency is key in building lasting wellness habits. How can I support you in maintaining this positive momentum?",
      ];

      const zaneResponses = [
        "I hear you. That takes courage to acknowledge. Let's work through this together and find practical steps you can take right now.",
        "Good to hear from you. Remember, progress isn't always linear - what matters is that you keep showing up. What's one thing you can do today to move forward?",
        "That's a solid observation. Building awareness is the foundation of real change. How do you want to approach this?",
        "I appreciate you sharing that. You've got the strength to handle this - let's focus on what you can control and build from there.",
      ];

      const responses = currentCoach === "maria" ? mariaResponses : zaneResponses;

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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

        {/* Header with Coach */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <img 
              src={coach.image}
              alt={`${coach.name} - Your AI Wellness Coach`}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-accent/30 shadow-lg"
            />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2">
            Meet {coach.name}
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Your AI Wellness Coach
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-4">
            {coach.description}
          </p>
          
          {/* Switch Coach Button */}
          <Button
            variant="outline"
            onClick={handleSwitchCoach}
            className="mt-2"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Bytt coach
          </Button>
        </div>

        {/* Personality Selector */}
        <div className="mb-6">
          <p className="text-sm font-medium text-muted-foreground mb-3">Choose your coach's personality:</p>
          <div className="flex gap-3">
            {coachPersonalities.map((personality) => {
              const Icon = personality.icon;
              return (
                <button
                  key={personality.id}
                  onClick={() => setSelectedPersonality(personality)}
                  className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                    selectedPersonality.id === personality.id
                      ? "border-accent bg-accent/10"
                      : "border-transparent bg-card/50 hover:bg-card"
                  }`}
                >
                  <Icon className={`h-6 w-6 ${personality.color}`} />
                  <span className="font-medium text-sm">{personality.name}</span>
                  <span className="text-xs text-muted-foreground text-center">
                    {personality.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Container */}
        <Card className="bg-card/90 backdrop-blur-sm border-accent/20 flex flex-col h-[600px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce delay-100" />
                    <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border/50 p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts..."
                className="flex-1 bg-background/50"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-accent hover:bg-accent/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </Card>

        {/* Daily Reminder Preview */}
        <Card className="mt-6 p-6 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Daily Reminders (Premium Feature)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Receive personalized check-ins throughout your day. Your AI coach will send gentle reminders to practice mindfulness, stay hydrated, and maintain your wellness routine.
              </p>
              <div className="bg-background/50 rounded-lg p-3 text-sm">
                <p className="font-medium mb-1">Example morning reminder:</p>
                <p className="text-muted-foreground italic">
                  {currentCoach === "maria" 
                    ? '"Good morning! 🌅 Ready to embrace a new day? Start with 5 minutes of gentle stretching to awaken your body and mind."'
                    : '"Morning! 🌅 New day, fresh start. Take 5 minutes to stretch and set your intention. What do you want to accomplish today?"'
                  }
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
