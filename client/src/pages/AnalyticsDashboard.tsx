import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, DollarSign, BarChart3, Download, RefreshCw } from 'lucide-react';
import { useLocation } from 'wouter';

interface Analytics {
  totalUsers: number;
  totalSubscribers: number;
  activeSubscriptions: number;
  cancelledSubscriptions: number;
  totalRevenue: number;
  monthlyRevenue: number;
  standardUsers: number;
  premiumUsers: number;
  impactUsers: number;
  churnRate: number;
  conversionRate: number;
  averageRevenuePerUser: number;
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [, navigate] = useLocation();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/analytics/metrics');
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!analytics) return;

    const report = `
Drift Analytics Report - ${new Date().toLocaleDateString()}

OVERVIEW
--------
Total Users: ${analytics.totalUsers}
Total Subscribers: ${analytics.totalSubscribers}
Active Subscriptions: ${analytics.activeSubscriptions}
Cancelled Subscriptions: ${analytics.cancelledSubscriptions}

REVENUE
-------
Total Revenue: ${analytics.totalRevenue} NOK
Monthly Revenue: ${analytics.monthlyRevenue} NOK
Average Revenue Per User: ${analytics.averageRevenuePerUser} NOK

SUBSCRIPTION BREAKDOWN
---------------------
Standard Users: ${analytics.standardUsers}
Premium Users: ${analytics.premiumUsers}
Impact Users: ${analytics.impactUsers}

METRICS
-------
Conversion Rate: ${analytics.conversionRate}%
Churn Rate: ${analytics.churnRate}%

Generated: ${new Date().toISOString()}
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(report));
    element.setAttribute('download', `drift-analytics-${new Date().toISOString().split('T')[0]}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md w-full">
          <p className="text-center text-muted-foreground mb-4">Failed to load analytics</p>
          <Button onClick={fetchAnalytics} className="w-full">
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Real-time metrics and insights</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchAnalytics}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={downloadReport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Users</p>
                <p className="text-3xl font-bold text-foreground">{analytics.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-primary opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Subscriptions</p>
                <p className="text-3xl font-bold text-foreground">{analytics.activeSubscriptions}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Monthly Revenue</p>
                <p className="text-3xl font-bold text-foreground">{analytics.monthlyRevenue} NOK</p>
              </div>
              <DollarSign className="w-8 h-8 text-amber-600 opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Conversion Rate</p>
                <p className="text-3xl font-bold text-foreground">{analytics.conversionRate}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600 opacity-50" />
            </div>
          </Card>
        </div>

        {/* Revenue Overview */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Revenue Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-muted-foreground text-sm mb-2">Total Revenue</p>
              <p className="text-3xl font-bold text-foreground">{analytics.totalRevenue} NOK</p>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-2">Monthly Revenue</p>
              <p className="text-3xl font-bold text-foreground">{analytics.monthlyRevenue} NOK</p>
              <p className="text-xs text-muted-foreground mt-1">Current month</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-2">Avg Revenue Per User</p>
              <p className="text-3xl font-bold text-foreground">{analytics.averageRevenuePerUser} NOK</p>
              <p className="text-xs text-muted-foreground mt-1">Per active user</p>
            </div>
          </div>
        </Card>

        {/* Subscription Breakdown */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Subscription Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-gray-400 pl-4">
              <p className="text-muted-foreground text-sm">Standard</p>
              <p className="text-2xl font-bold text-foreground">{analytics.standardUsers}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {((analytics.standardUsers / analytics.totalSubscribers) * 100).toFixed(1)}% of subscribers
              </p>
            </div>
            <div className="border-l-4 border-amber-400 pl-4">
              <p className="text-muted-foreground text-sm">Premium</p>
              <p className="text-2xl font-bold text-foreground">{analytics.premiumUsers}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {((analytics.premiumUsers / analytics.totalSubscribers) * 100).toFixed(1)}% of subscribers
              </p>
            </div>
            <div className="border-l-4 border-rose-400 pl-4">
              <p className="text-muted-foreground text-sm">Impact</p>
              <p className="text-2xl font-bold text-foreground">{analytics.impactUsers}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {((analytics.impactUsers / analytics.totalSubscribers) * 100).toFixed(1)}% of subscribers
              </p>
            </div>
          </div>
        </Card>

        {/* Health Metrics */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Health Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-muted-foreground">Conversion Rate</p>
                <p className="font-bold text-foreground">{analytics.conversionRate}%</p>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${Math.min(analytics.conversionRate, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">% of users who subscribe</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-muted-foreground">Churn Rate</p>
                <p className="font-bold text-foreground">{analytics.churnRate}%</p>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full"
                  style={{ width: `${Math.min(analytics.churnRate, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">% of subscribers who cancel</p>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground text-sm">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
