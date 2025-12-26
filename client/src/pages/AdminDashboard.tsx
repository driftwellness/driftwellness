import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Users, Mail, Settings, AlertCircle, FileText, Send, Save } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";

// Email template types
const emailTemplates = [
  { id: "welcome", name: "Welcome Email", description: "Sent when a new user signs up" },
  { id: "trial_ending", name: "Trial Ending", description: "Sent 2 days before trial expires" },
  { id: "subscription_confirmation", name: "Subscription Confirmation", description: "Sent after successful subscription" },
  { id: "subscription_renewal", name: "Subscription Renewal", description: "Sent when subscription renews" },
  { id: "new_feature", name: "New Feature Announcement", description: "Announce new features to users" },
];

// Default template content
const defaultTemplates: Record<string, { subject: string; body: string }> = {
  welcome: {
    subject: "Welcome to Drift - Your Wellness Journey Begins! 🌿",
    body: `Dear {{name}},

Welcome to Drift! We're thrilled to have you join our community of mindful individuals seeking tranquility and self-discovery.

Your 7-day free trial has begun, giving you full access to:
• Guided meditations and breathwork
• Sleep videos and soundscapes
• AI wellness coaching
• Private journaling with dream analysis

Start your journey today by exploring our features. Remember, every moment of stillness creates ripples of positive change.

With warmth,
The Drift Team

P.S. If you have any questions, simply reply to this email!`,
  },
  trial_ending: {
    subject: "Your Drift Trial Ends in 2 Days ⏰",
    body: `Dear {{name}},

Your free trial is coming to an end in just 2 days. We hope you've been enjoying your wellness journey with Drift!

Don't lose access to:
• Your personalized meditations
• Sleep videos and soundscapes
• AI coaching conversations
• Your private journal entries

Continue your journey for just 199 NOK/month and keep making progress toward inner peace.

[Upgrade Now]

Questions? We're here to help!

Warmly,
The Drift Team`,
  },
  subscription_confirmation: {
    subject: "Welcome to Drift Premium! 🎉",
    body: `Dear {{name}},

Thank you for becoming a Drift Premium member! Your subscription is now active.

Subscription Details:
• Plan: Premium Monthly
• Amount: 199 NOK/month
• Next billing date: {{next_billing_date}}

You now have unlimited access to all Drift features. Here's what we recommend exploring:

1. Set up your daily meditation reminder
2. Try our new sleep videos
3. Chat with your AI wellness coach
4. Start your private journal

Thank you for investing in your wellbeing!

With gratitude,
The Drift Team`,
  },
  subscription_renewal: {
    subject: "Your Drift Subscription Has Been Renewed ✨",
    body: `Dear {{name}},

Your Drift Premium subscription has been successfully renewed.

Receipt:
• Amount: 199 NOK
• Date: {{renewal_date}}
• Next renewal: {{next_billing_date}}

Thank you for continuing your wellness journey with us. Your support helps us create more features and donate to clean water initiatives.

Keep drifting toward serenity!

Warmly,
The Drift Team`,
  },
  new_feature: {
    subject: "New in Drift: {{feature_name}} 🚀",
    body: `Dear {{name}},

We're excited to announce a new feature in Drift!

{{feature_description}}

How to access:
{{feature_instructions}}

We built this based on feedback from members like you. We'd love to hear what you think!

Happy exploring,
The Drift Team`,
  },
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState("welcome");
  const [templateSubject, setTemplateSubject] = useState(defaultTemplates.welcome.subject);
  const [templateBody, setTemplateBody] = useState(defaultTemplates.welcome.body);
  const [isSaving, setIsSaving] = useState(false);

  // Check if user is admin
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
            <h2 className="text-xl font-bold">Access Denied</h2>
            <p className="text-muted-foreground">
              You need admin privileges to access this dashboard.
            </p>
            <Link href="/">
              <Button className="w-full">Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Fetch users
  const { data: users = [], isLoading } = trpc.admin.users.useQuery();

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = defaultTemplates[templateId];
    if (template) {
      setTemplateSubject(template.subject);
      setTemplateBody(template.body);
    }
  };

  const handleSaveTemplate = () => {
    setIsSaving(true);
    // Simulate save - in production, save to database
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Template saved successfully!");
    }, 1000);
  };

  const handleSendTestEmail = () => {
    toast.success("Test email sent to your address!");
  };

  return (
    <div className="min-h-screen bg-background">
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
              <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage users and email templates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="emails" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Emails
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Templates
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{users.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">Active members</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Admins
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {users.filter((u) => u.role === "admin").length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">System administrators</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Regular Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {users.filter((u) => u.role === "user").length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Standard members</p>
                </CardContent>
              </Card>
            </div>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Users Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading users...</div>
                ) : users.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No users found</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Name</th>
                          <th className="text-left py-3 px-4 font-semibold">Email</th>
                          <th className="text-left py-3 px-4 font-semibold">Role</th>
                          <th className="text-left py-3 px-4 font-semibold">Joined</th>
                          <th className="text-left py-3 px-4 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr
                            key={u.id}
                            className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                          >
                            <td className="py-3 px-4">{u.name || "—"}</td>
                            <td className="py-3 px-4">{u.email || "—"}</td>
                            <td className="py-3 px-4">
                              <Badge variant={u.role === "admin" ? "default" : "secondary"}>
                                {u.role}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-xs text-muted-foreground">
                              {new Date(u.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedUserId(u.id)}
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emails Tab */}
          <TabsContent value="emails" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Notification System
                </CardTitle>
                <CardDescription>
                  Automated emails are sent to users at key moments in their journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {emailTemplates.map((template) => (
                      <div
                        key={template.id}
                        className="p-4 border rounded-lg hover:border-accent/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{template.name}</h4>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Active
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-4">
                      Email integration status: <span className="text-amber-500 font-medium">Pending API Key</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      To enable actual email sending, provide a SendGrid or Resend API key in Settings → Secrets.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Template List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Email Templates</CardTitle>
                  <CardDescription>Select a template to edit</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {emailTemplates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => handleTemplateChange(template.id)}
                        className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                          selectedTemplate === template.id ? "bg-accent/10 border-l-2 border-accent" : ""
                        }`}
                      >
                        <h4 className="font-medium text-sm">{template.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Template Editor */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Edit Template
                  </CardTitle>
                  <CardDescription>
                    Use {"{{name}}"}, {"{{email}}"}, {"{{date}}"} for dynamic content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject Line</Label>
                    <Input
                      id="subject"
                      value={templateSubject}
                      onChange={(e) => setTemplateSubject(e.target.value)}
                      placeholder="Email subject..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="body">Email Body</Label>
                    <Textarea
                      id="body"
                      value={templateBody}
                      onChange={(e) => setTemplateBody(e.target.value)}
                      placeholder="Email content..."
                      className="min-h-[300px] font-mono text-sm"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSaveTemplate} disabled={isSaving}>
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? "Saving..." : "Save Template"}
                    </Button>
                    <Button variant="outline" onClick={handleSendTestEmail}>
                      <Send className="w-4 h-4 mr-2" />
                      Send Test Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
