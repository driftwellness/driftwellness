import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { APP_TITLE } from "@/const";

export default function TermsOfService() {
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

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-6">Terms of Service</h1>
          
          <p className="text-muted-foreground">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('no-NO')}
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing and using {APP_TITLE} ("the Service"), operated by <strong>Heltentmerlivogel</strong>, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Description of Service</h2>
          <p className="text-muted-foreground">
            {APP_TITLE} is a wellness and mindfulness platform that provides:
          </p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li>Guided audiobook content</li>
            <li>AI-powered wellness coaching</li>
            <li>Private journaling tools</li>
            <li>Soundscapes and meditation resources</li>
            <li>E-commerce functionality for wellness products</li>
            <li>Charitable donation programs</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. User Accounts</h2>
          <p className="text-muted-foreground">
            To access certain features, you must create an account. You are responsible for:
          </p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Subscription and Payment</h2>
          
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Subscription Plans</h3>
          <p className="text-muted-foreground">
            We offer multiple subscription tiers:
          </p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li><strong>Standard (199 NOK/month):</strong> Basic wellness features</li>
            <li><strong>Premium (299 NOK/month):</strong> Full features + 50 NOK donated to clean water projects</li>
            <li><strong>Impact (349 NOK/month):</strong> Full features + 100 NOK donated to clean water projects</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Billing</h3>
          <p className="text-muted-foreground">
            Subscriptions are billed monthly. By subscribing, you authorize us to charge your payment method on a recurring basis.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Cancellation and Refunds</h3>
          <p className="text-muted-foreground">
            You may cancel your subscription at any time. For digital services, you have a 14-day right of withdrawal under Norwegian consumer law. Refunds are processed according to applicable law.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. E-commerce and Product Orders</h2>
          <p className="text-muted-foreground">
            When you purchase physical products through our Shop:
          </p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li>Pre-orders ship starting January 1st, 2026</li>
            <li>Prices are in Norwegian Kroner (NOK) and include VAT</li>
            <li>Shipping costs are added at checkout</li>
            <li>You have a 14-day right of withdrawal for physical goods</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">6. Donation Program</h2>
          <p className="text-muted-foreground">
            Premium and Impact subscribers contribute to our clean water donation program:
          </p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li>50 NOK (Premium) or 100 NOK (Impact) of your monthly subscription goes to clean water projects</li>
            <li>When we reach 15,000 members, we donate 10 million NOK</li>
            <li>Future donation projects are chosen by member voting</li>
            <li>We provide transparency reports and documentation of donations</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">7. User Content and Conduct</h2>
          <p className="text-muted-foreground">
            You retain ownership of content you create (journal entries, etc.). However, you agree not to:
          </p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li>Use the Service for any illegal purpose</li>
            <li>Violate any laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Transmit harmful or malicious code</li>
            <li>Attempt to gain unauthorized access</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">8. Intellectual Property</h2>
          <p className="text-muted-foreground">
            All content, features, and functionality of the Service are owned by Heltentmerlivogel and are protected by copyright, trademark, and other intellectual property laws.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">9. Disclaimer of Warranties</h2>
          <p className="text-muted-foreground">
            The Service is provided "as is" without warranties of any kind. We do not guarantee that the Service will be uninterrupted, secure, or error-free.
          </p>
          <p className="text-muted-foreground mt-4">
            <strong>Medical Disclaimer:</strong> {APP_TITLE} is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">10. Limitation of Liability</h2>
          <p className="text-muted-foreground">
            To the maximum extent permitted by law, Heltentmerlivogel shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">11. Governing Law</h2>
          <p className="text-muted-foreground">
            These Terms are governed by the laws of Norway. Any disputes shall be resolved in Norwegian courts.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">12. Changes to Terms</h2>
          <p className="text-muted-foreground">
            We reserve the right to modify these Terms at any time. We will notify you of material changes. Continued use of the Service after changes constitutes acceptance of the new Terms.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">13. Contact Information</h2>
          <p className="text-muted-foreground">
            For questions about these Terms, please contact:
          </p>
          <p className="text-muted-foreground">
            <strong>Heltentmerlivogel</strong><br />
            Email: support@driftapp.no
          </p>

          <div className="mt-12 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Heltentmerlivogel. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
