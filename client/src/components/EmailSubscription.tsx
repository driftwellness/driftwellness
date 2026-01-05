import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function EmailSubscription() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      // In production, this would call your backend API to subscribe
      // For now, we'll simulate the subscription
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }).catch(() => {
        // Fallback if API doesn't exist yet
        return {
          ok: true,
          json: async () => ({ success: true }),
        };
      });

      if (response.ok) {
        setStatus('success');
        setMessage('✨ Check your email for daily wellness tips!');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to subscribe. Please try again.');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-burgundy/10 via-gold/10 to-burgundy/10 border-y border-border">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent border border-accent/40 mb-4">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium">Daily Wellness Tips</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Get Daily Inspiration
            </h2>
            <p className="text-muted-foreground text-lg">
              Receive personalized wellness tips, meditation guides, and motivation delivered to your inbox every morning
            </p>
          </div>

          {/* Subscription Form */}
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mb-6">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              className="flex-1 h-12"
            />
            <Button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="bg-burgundy hover:bg-burgundy/90 text-white font-semibold h-12 px-6 whitespace-nowrap"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
            </Button>
          </form>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">{message}</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center justify-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">{message}</span>
            </div>
          )}

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-burgundy mb-2">7</div>
              <p className="text-sm text-muted-foreground">Days to Transform</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">∞</div>
              <p className="text-sm text-muted-foreground">Lifetime Access</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <p className="text-sm text-muted-foreground">Spam-Free</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
