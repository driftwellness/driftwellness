import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User, Mail, Calendar, Shield, LogOut, Edit2, Check, X } from 'lucide-react';
import { useLocation } from 'wouter';
import { toast } from 'sonner';

interface UserData {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  subscriptionStatus: 'active' | 'canceled' | 'incomplete' | 'trialing' | 'unpaid';
  subscriptionTier: 'standard' | 'premium' | 'impact';
  referralCode: string;
  referralCount: number;
}

export default function UserProfile() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [saving, setSaving] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      if (data) {
        setUser(data);
        setEditName(data.name);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveName = async () => {
    if (!editName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/user/update-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName }),
      });

      if (response.ok) {
        setUser((prev) => (prev ? { ...prev, name: editName } : null));
        setEditing(false);
        toast.success('Profile updated successfully');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error logging out');
    }
  };

  const copyReferralCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      toast.success('Referral code copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <User className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md w-full">
          <p className="text-center text-muted-foreground mb-4">Not logged in</p>
          <Button onClick={() => navigate('/')} className="w-full">
            Go to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Profile Card */}
        <Card className="p-8 mb-6 border-2 border-primary bg-primary/5">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                {editing ? (
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="max-w-xs"
                      placeholder="Your name"
                    />
                    <Button
                      size="sm"
                      onClick={handleSaveName}
                      disabled={saving}
                      className="gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditing(false);
                        setEditName(user.name);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditing(true)}
                      className="gap-2 mt-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Name
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold">
                {user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)}
              </div>
            </div>
          </div>
        </Card>

        {/* Account Information */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Account Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-semibold text-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="font-semibold text-foreground">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Subscription Status</p>
                <p className="font-semibold text-foreground capitalize">{user.subscriptionStatus}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Referral Section */}
        <Card className="p-6 mb-6 border-2 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
          <h3 className="text-lg font-bold text-foreground mb-4">Referral Program</h3>
          <p className="text-muted-foreground mb-4">
            Share your referral code and earn rewards when friends join Drift!
          </p>
          <div className="flex gap-2 mb-4">
            <Input
              value={user.referralCode}
              readOnly
              className="font-mono bg-background"
            />
            <Button onClick={copyReferralCode} variant="default">
              Copy Code
            </Button>
          </div>
          <div className="text-sm">
            <p className="text-muted-foreground">
              Friends referred: <span className="font-bold text-foreground">{user.referralCount}</span>
            </p>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/subscription-management')}
            className="flex-1"
          >
            Manage Subscription
          </Button>
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="flex-1 gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Support */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground text-sm">
            Need help? Contact us at{' '}
            <a href="mailto:support@driftapp.no" className="text-primary hover:underline">
              support@driftapp.no
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
