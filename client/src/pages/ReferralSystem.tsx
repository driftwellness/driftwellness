import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Users, Gift, TrendingUp, Share2, Copy, Mail, Check } from 'lucide-react';
import { useLocation } from 'wouter';
import { toast } from 'sonner';

interface ReferralStats {
  referralCode: string;
  totalReferred: number;
  activeReferred: number;
  totalRewards: number;
  referralList: Array<{
    id: number;
    name: string;
    email: string;
    referredAt: string;
    status: 'active' | 'inactive';
    tier: 'standard' | 'premium' | 'impact';
  }>;
}

export default function ReferralSystem() {
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    fetchReferralStats();
  }, []);

  const fetchReferralStats = async () => {
    try {
      const response = await fetch('/api/referral/stats');
      const data = await response.json();
      if (data) {
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching referral stats:', error);
      toast.error('Failed to load referral data');
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = () => {
    if (stats?.referralCode) {
      const link = `${window.location.origin}?ref=${stats.referralCode}`;
      navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success('Referral link copied!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareViaEmail = () => {
    if (stats?.referralCode) {
      const link = `${window.location.origin}?ref=${stats.referralCode}`;
      const subject = 'Join Drift - Your Sanctuary of Serenity';
      const body = `I've been using Drift and love it! Use my referral link to join: ${link}`;
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Users className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-foreground">Loading referral data...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md w-full">
          <p className="text-center text-muted-foreground mb-4">Failed to load referral data</p>
          <Button onClick={fetchReferralStats} className="w-full">
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Referral Program</h1>
          <p className="text-muted-foreground">Share Drift with friends and earn rewards</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Referred</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalReferred}</p>
              </div>
              <Users className="w-8 h-8 text-primary opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Members</p>
                <p className="text-3xl font-bold text-foreground">{stats.activeReferred}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Rewards</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalRewards} NOK</p>
              </div>
              <Gift className="w-8 h-8 text-amber-600 opacity-50" />
            </div>
          </Card>
        </div>

        {/* Share Section */}
        <Card className="p-8 mb-8 border-2 border-primary bg-primary/5">
          <h2 className="text-2xl font-bold text-foreground mb-6">Share Your Code</h2>

          {/* Referral Code */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-foreground mb-2">
              Your Referral Code
            </label>
            <div className="flex gap-2">
              <Input
                value={stats.referralCode}
                readOnly
                className="font-mono bg-background text-lg"
              />
              <Button
                onClick={copyReferralLink}
                variant="default"
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Share this code with friends to earn rewards when they join
            </p>
          </div>

          {/* Share Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={shareViaEmail}
              variant="outline"
              className="gap-2 h-12"
            >
              <Mail className="w-5 h-5" />
              Share via Email
            </Button>
            <Button
              onClick={copyReferralLink}
              variant="outline"
              className="gap-2 h-12"
            >
              <Share2 className="w-5 h-5" />
              Copy Link
            </Button>
          </div>
        </Card>

        {/* Rewards Info */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5" />
            How Rewards Work
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                1
              </div>
              <div>
                <p className="font-semibold text-foreground">Share Your Code</p>
                <p className="text-sm text-muted-foreground">Send your referral code to friends</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                2
              </div>
              <div>
                <p className="font-semibold text-foreground">They Sign Up</p>
                <p className="text-sm text-muted-foreground">Friends use your code to create account</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                3
              </div>
              <div>
                <p className="font-semibold text-foreground">Earn Rewards</p>
                <p className="text-sm text-muted-foreground">Get 50 NOK for each friend who subscribes</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Referred Members */}
        {stats.referralList.length > 0 && (
          <Card className="p-6 mb-8">
            <h3 className="text-lg font-bold text-foreground mb-4">Your Referrals</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                      Referred Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                      Tier
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.referralList.map((referral) => (
                    <tr key={referral.id} className="border-b border-border hover:bg-secondary/50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-semibold text-foreground">{referral.name}</p>
                          <p className="text-xs text-muted-foreground">{referral.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground">
                        {new Date(referral.referredAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-primary/20 text-primary">
                          {referral.tier.charAt(0).toUpperCase() + referral.tier.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            referral.status === 'active'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-100'
                          }`}
                        >
                          {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Ready to start earning?</p>
          <Button onClick={copyReferralLink} size="lg" className="gap-2">
            <Share2 className="w-5 h-5" />
            Share Your Referral Link
          </Button>
        </div>
      </div>
    </div>
  );
}
