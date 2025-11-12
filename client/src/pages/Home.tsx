import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, ShoppingBag, FileText, Lightbulb, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface ProjectSection {
  title: string;
  description: string;
  status: "complete" | "in-progress" | "planned";
  progress: number;
  icon: React.ReactNode;
  tasks: {
    name: string;
    status: "done" | "active" | "pending";
  }[];
}

const projectSections: ProjectSection[] = [
  {
    title: "App Development",
    description: "Building the Drift wellness app in Adalo",
    status: "in-progress",
    progress: 45,
    icon: <Sparkles className="w-5 h-5" />,
    tasks: [
      { name: "Basic structure & navigation", status: "done" },
      { name: "Brand design (logo, colors, video)", status: "done" },
      { name: "Journal/Dagbok function", status: "active" },
      { name: "AI daily check-in", status: "pending" },
      { name: "Advent calendar design", status: "pending" },
      { name: "Real-time soundscapes", status: "pending" },
      { name: "Dream analysis AI", status: "pending" },
      { name: "Pulse measurement with camera", status: "pending" },
    ],
  },
  {
    title: "E-commerce (Shopify)",
    description: "Setting up the Drift product store",
    status: "in-progress",
    progress: 60,
    icon: <ShoppingBag className="w-5 h-5" />,
    tasks: [
      { name: "Theme installed & designed", status: "done" },
      { name: "Product 1: Vanilla Calm candle", status: "done" },
      { name: "Homepage design", status: "done" },
      { name: "Finding oil supplier", status: "active" },
      { name: "Product 2: Calm Pulse Point Oil", status: "pending" },
      { name: "Payment & shipping setup", status: "pending" },
    ],
  },
  {
    title: "Content Production",
    description: "Creating audiobook, meditations & social media",
    status: "in-progress",
    progress: 55,
    icon: <FileText className="w-5 h-5" />,
    tasks: [
      { name: "Audiobook manuscript (5 chapters)", status: "done" },
      { name: "Welcome package design", status: "done" },
      { name: "Social media week 1 content", status: "done" },
      { name: "Sleep music library", status: "active" },
      { name: "Audiobook voice production", status: "pending" },
      { name: "Social media week 2-4 content", status: "pending" },
    ],
  },
  {
    title: "Unique Features (R&D)",
    description: "Innovative AI and interactive features",
    status: "planned",
    progress: 15,
    icon: <Lightbulb className="w-5 h-5" />,
    tasks: [
      { name: "Real-time soundscape mixer", status: "pending" },
      { name: "AI dream analysis", status: "pending" },
      { name: "Camera pulse measurement research", status: "active" },
      { name: "AI chatbot integration", status: "pending" },
    ],
  },
];

function StatusBadge({ status }: { status: ProjectSection["status"] }) {
  const variants = {
    complete: { label: "Complete", className: "bg-green-500/20 text-green-400 border-green-500/30" },
    "in-progress": { label: "In Progress", className: "bg-primary/20 text-primary border-primary/30" },
    planned: { label: "Planned", className: "bg-muted text-muted-foreground border-border" },
  };

  const variant = variants[status];
  return <Badge className={variant.className} variant="outline">{variant.label}</Badge>;
}

function TaskItem({ task }: { task: { name: string; status: "done" | "active" | "pending" } }) {
  const icons = {
    done: <CheckCircle2 className="w-4 h-4 text-green-400" />,
    active: <Clock className="w-4 h-4 text-accent animate-pulse" />,
    pending: <AlertCircle className="w-4 h-4 text-muted-foreground" />,
  };

  return (
    <div className="flex items-center gap-2 py-1.5">
      {icons[task.status]}
      <span className={task.status === "done" ? "text-muted-foreground line-through" : ""}>{task.name}</span>
    </div>
  );
}

export default function Home() {
  const overallProgress = Math.round(
    projectSections.reduce((sum, section) => sum + section.progress, 0) / projectSections.length
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Drift
                </span>{" "}
                Project Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">Real-time development tracking</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Overall Progress</div>
              <div className="text-3xl font-bold text-accent">{overallProgress}%</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {projectSections.map((section) => (
            <Card key={section.title} className="bg-card/50 backdrop-blur border-border/50 hover:border-accent/30 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10 text-accent">{section.icon}</div>
                    <div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                      <CardDescription className="mt-1">{section.description}</CardDescription>
                    </div>
                  </div>
                  <StatusBadge status={section.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-accent">{section.progress}%</span>
                  </div>
                  <Progress value={section.progress} className="h-2" />
                </div>

                {/* Task List */}
                <div className="space-y-1 text-sm">
                  {section.tasks.map((task, idx) => (
                    <TaskItem key={idx} task={task} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            This dashboard updates automatically as development progresses
          </p>
        </div>
      </main>
    </div>
  );
}
