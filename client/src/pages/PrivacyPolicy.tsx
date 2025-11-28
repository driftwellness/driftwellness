import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { APP_TITLE } from "@/const";

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl font-bold text-foreground mb-6">Privacy Policy</h1>
          
          <p className="text-muted-foreground">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('no-NO')}
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Introduction</h2>
          <p className="text-muted-foreground">
            Welcome to {APP_TITLE} ("we," "our," or "us"). We are operated by <strong>Heltentmerlivogel</strong>. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Personal Information</h3>
          <p className="text-muted-foreground">
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li>Register for an account</li>
            <li>Make a purchase</li>
            <li>Use our AI Wellness Coach</li>
            <li>Write in your private journal</li>
            <li>Contact us for support</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            This information may include: name, email address, payment information, and any content you create within the app.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Automatically Collected Information</h3>
          <p className="text-muted-foreground">
            When you use our app, we may automatically collect certain information, including:
          </p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li>Device information (model, operating system)</li>
            <li>Usage data (features accessed, time spent)</li>
            <li>Log data (IP address, browser type)</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. How We Use Your Information</h2>
          <p className="text-muted-foreground">
            We use the information we collect to:
          </p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Process your transactions and send related information</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Personalize your experience with AI-powered recommendations</li>
            <li>Monitor and analyze usage patterns</li>
            <li>Detect, prevent, and address technical issues</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Data Sharing and Disclosure</h2>
          <p className="text-muted-foreground">
            We do not sell your personal information. We may share your information only in the following circumstances:
          </p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf (e.g., payment processing, hosting)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">6. Your Rights (GDPR)</h2>
          <p className="text-muted-foreground">
            If you are a resident of the European Economic Area (EEA) or Norway, you have certain data protection rights:
          </p>
          <ul className="text-muted-foreground list-disc pl-6 space-y-2">
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
            <li><strong>Erasure:</strong> Request deletion of your data</li>
            <li><strong>Restriction:</strong> Request restriction of processing</li>
            <li><strong>Portability:</strong> Request transfer of your data</li>
            <li><strong>Objection:</strong> Object to processing of your data</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">7. Data Retention</h2>
          <p className="text-muted-foreground">
            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">8. Children's Privacy</h2>
          <p className="text-muted-foreground">
            Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">9. Cookies and Tracking</h2>
          <p className="text-muted-foreground">
            We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">10. Changes to This Privacy Policy</h2>
          <p className="text-muted-foreground">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">11. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact us at:
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
