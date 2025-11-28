import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { APP_TITLE } from "@/const";

export default function Settings() {
  const [dailyPoemEnabled, setDailyPoemEnabled] = useState(true);
  const [moodPreference, setMoodPreference] = useState("mixed");
  const [notificationTime, setNotificationTime] = useState("08:00");
  const [showOnAppOpen, setShowOnAppOpen] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleSave = () => {
    // TODO: Save to database
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">{APP_TITLE}</h1>
            <div className="w-24" /> {/* Spacer */}
          </div>
        </div>
      </header>

      {/* Settings Content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Customize your Drift experience</p>
          </div>

          {/* Daily Poem Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Inspiration</CardTitle>
              <CardDescription>
                Receive personalized poems and affirmations based on your mood
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Enable/Disable */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="daily-poem">Enable Daily Poem</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive inspirational poems every day
                  </p>
                </div>
                <Switch
                  id="daily-poem"
                  checked={dailyPoemEnabled}
                  onCheckedChange={setDailyPoemEnabled}
                />
              </div>

              {dailyPoemEnabled && (
                <>
                  {/* Mood Preference */}
                  <div className="space-y-2">
                    <Label htmlFor="mood">Mood Preference</Label>
                    <Select value={moodPreference} onValueChange={setMoodPreference}>
                      <SelectTrigger id="mood">
                        <SelectValue placeholder="Select mood" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="calming">Calming & Peaceful</SelectItem>
                        <SelectItem value="motivating">Motivating & Empowering</SelectItem>
                        <SelectItem value="loving">Self-Love & Compassion</SelectItem>
                        <SelectItem value="healing">Healing & Comfort</SelectItem>
                        <SelectItem value="mixed">Mixed (Varies Daily)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Choose the type of poems you'd like to receive
                    </p>
                  </div>

                  {/* Notification Time */}
                  <div className="space-y-2">
                    <Label htmlFor="time">Notification Time</Label>
                    <Select value={notificationTime} onValueChange={setNotificationTime}>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="06:00">06:00 AM</SelectItem>
                        <SelectItem value="07:00">07:00 AM</SelectItem>
                        <SelectItem value="08:00">08:00 AM</SelectItem>
                        <SelectItem value="09:00">09:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="20:00">08:00 PM</SelectItem>
                        <SelectItem value="21:00">09:00 PM</SelectItem>
                        <SelectItem value="22:00">10:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      When would you like to receive your daily poem?
                    </p>
                  </div>

                  {/* Push Notifications */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when your daily poem is ready
                      </p>
                    </div>
                    <Switch
                      id="push"
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>

                  {/* Show on App Open */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-open">Show on App Open</Label>
                      <p className="text-sm text-muted-foreground">
                        Display poem popup when you open the app
                      </p>
                    </div>
                    <Switch
                      id="app-open"
                      checked={showOnAppOpen}
                      onCheckedChange={setShowOnAppOpen}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Account settings coming soon...
              </p>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg" className="bg-[#8B4049] hover:bg-[#8B4049]/90">
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
