import React from 'react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-foreground">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p>
              Drift ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application, website, and related services (collectively, the "Service").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <p className="font-semibold">Personal Information:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Name and email address (provided during account creation)</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>Account preferences and subscription tier</li>
              <li>Usage data and activity logs</li>
            </ul>

            <p className="font-semibold mt-4">Automatically Collected Information:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Device information (type, OS, browser)</li>
              <li>IP address and location data</li>
              <li>Cookies and tracking technologies</li>
              <li>Analytics data about app usage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide, maintain, and improve the Service</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send transactional and promotional emails</li>
              <li>Personalize your experience</li>
              <li>Analyze usage patterns and improve features</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. However, we may share information with:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Service Providers:</strong> Stripe (payments), analytics providers, hosting providers</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In case of merger, acquisition, or bankruptcy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>SSL/TLS encryption for data in transit</li>
              <li>Secure password storage with hashing</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
            </ul>
            <p className="mt-4">
              However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at support@driftwellness.no
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences. Note that disabling cookies may affect Service functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Third-Party Links</h2>
            <p>
              Our Service may contain links to third-party websites. We are not responsible for their privacy practices. We encourage you to review their privacy policies before providing any information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
            <p>
              Our Service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will delete the information promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. GDPR Compliance</h2>
            <p>
              For users in the European Union, we comply with the General Data Protection Regulation (GDPR). Your data is processed lawfully with your consent or as necessary for contract performance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of significant changes via email or through the Service. Your continued use of the Service constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-card rounded-lg">
              <p><strong>Email:</strong> support@driftwellness.no</p>
              <p><strong>Website:</strong> https://driftwellness.no</p>
            </div>
          </section>

          <section>
            <p className="text-sm text-muted-foreground mt-8">
              Last updated: January 16, 2026
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
