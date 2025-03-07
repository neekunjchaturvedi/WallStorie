import React from "react";

function Privacyrules() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-left font-lato">
      <h1 className="text-center text-green-600 text-3xl font-medium mb-6 playfair">
        Privacy
      </h1>

      <div className="space-y-4 mb-8 text-center">
        <p>
          Welcome to WallStorie ("we," "our," or "us"). Your privacy is
          important to us.
        </p>
        <p>
          This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you visit our website.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1 */}
        <div>
          <h2 className="text-green-600 font-medium mb-3">
            1. INFORMATION WE COLLECT
          </h2>
          <p className="mb-2">
            We may collect the following types of information:
          </p>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">Personal Information:</span> Name,
              email address, phone number, billing and shipping address, payment
              details
            </li>
            <li>
              <span className="font-medium">Account Information:</span>{" "}
              Username, password, order history
            </li>
            <li>
              <span className="font-medium">Device & Usage Information:</span>{" "}
              We may automatically collect details such as IP address, browser
              type, pages visited, and time spent on our website. This
              information helps us improve security and enhance user experience
            </li>
            <li>
              <span className="font-medium">
                Cookies & Tracking Technologies:
              </span>{" "}
              To enhance user experience and for analytics
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-green-600 font-medium mb-3">
            2. HOW WE USE YOUR INFORMATION
          </h2>
          <p className="mb-2">We use your data to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Process and fulfill your orders</li>
            <li>Improve website functionality and user experience</li>
            <li>
              Send promotional emails, updates, offers, promotions, or support
              inquiries
            </li>
            <li>Ensure security and prevent fraudulent activities</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-green-600 font-medium mb-3">
            3. SHARING OF INFORMATION
          </h2>
          <p className="mb-2">
            We do not sell your personal information. However, we may share your
            data with:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Third-party service providers: Payment processors (e.g.,
              Razorpay), shipping partners, and analytics tools
            </li>
            <li>
              Legal authorities: If required by law or to protect our rights
            </li>
            <li>Business transfers: In case of a merger or acquisition</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="text-green-600 font-medium mb-3">
            4. COOKIES & TRACKING TECHNOLOGIES
          </h2>
          <p>
            We use cookies to improve your experience. You can manage cookie
            preferences in your browser settings.
          </p>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="text-green-600 font-medium mb-3">5. DATA SECURITY</h2>
          <p>
            We implement industry-standard measures to protect your information
            but cannot guarantee 100% security due to online risks.
          </p>
        </div>

        {/* Section 6 */}
        <div>
          <h2 className="text-green-600 font-medium mb-3">
            6. PAYMENT SECURITY & PCI DSS COMPLIANCE
          </h2>
          <p>
            We use Razorpay as our payment processor, which is PCI DSS
            compliant. This ensures your payment information is handled
            securely. We do not store, process, or handle card details on our
            servers.
          </p>
        </div>

        {/* Section 7 */}
        <div>
          <h2 className="text-green-600 font-medium mb-3">
            7. YOUR RIGHTS & CHOICES
          </h2>
          <p>
            Depending on your location, you may have rights to access, modify,
            or delete your data. Contact us at{" "}
            <a href="mailto:contact@wallstorie.in" className="text-green-600">
              {" "}
              contact@wallstorie.in{" "}
            </a>{" "}
            for requests.
          </p>
        </div>

        {/* Section 8 */}
        <div>
          <h2 className="text-green-600 font-medium mb-3">
            8. CHANGES TO THIS POLICY
          </h2>
          <p>
            We reserve the right to modify this privacy policy at any time, so
            please review it frequently.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mt-8">
          <h2 className="text-green-600 font-medium mb-3">CONTACT US</h2>
          <p>
            For questions about this policy, contact us at{" "}
            <a href="mailto:contact@wallstorie.in" className="text-green-600">
              {" "}
              contact@wallstorie.in{" "}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacyrules;
