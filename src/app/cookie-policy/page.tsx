import PolicyLayout from "@/components/PolicyLayout";
export const metadata = { title: "Cookie Policy | Book My Services" };

export default function CookiePolicy() {
  return (
    <PolicyLayout title="Cookie Policy" lastUpdated="1 March 2025">
      <div className="info-box">
        🍪 We use cookies to make Book My Services work and to improve your
        experience. You control non-essential cookies via our cookie banner.
      </div>

      <p>
        This Cookie Policy explains how Book My Services Ltd uses cookies and
        similar tracking technologies on bookmyservices.co.uk.
      </p>

      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit our
        website. They help us remember your preferences and understand how you
        use our platform.
      </p>

      <h2>2. Cookies We Use</h2>
      <h3>Strictly Necessary</h3>
      <p>
        Essential for the platform to function — session management,
        authentication tokens, security cookies. You cannot opt out of these.
      </p>

      <h3>Performance & Analytics</h3>
      <p>
        Help us understand how visitors use the site (e.g. Google Analytics).
        All data is anonymised. You can opt out via our cookie banner.
      </p>

      <h3>Functional</h3>
      <p>
        Remember your preferences such as location or saved services. Disabling
        these may limit platform functionality.
      </p>

      <h3>Marketing</h3>
      <p>
        Used to show relevant ads and measure campaign performance. Only set
        with your explicit consent.
      </p>

      <h2>3. Third-Party Cookies</h2>
      <ul>
        <li>
          <strong>Stripe</strong> — fraud prevention and payment security
        </li>
        <li>
          <strong>Google Analytics</strong> — anonymised usage analytics
        </li>
        <li>
          <strong>Google Maps</strong> — location and mapping services
        </li>
      </ul>

      <h2>4. Managing Cookies</h2>
      <ul>
        <li>
          Use our cookie consent banner on first visit to accept or reject
          non-essential cookies
        </li>
        <li>
          You can update your preferences at any time via the cookie settings
          link in our footer
        </li>
        <li>
          You can also control cookies through your browser settings — see your
          browser's help section
        </li>
        <li>
          Opt out of Google Analytics:{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            tools.google.com/dlpage/gaoptout
          </a>
        </li>
      </ul>

      <h2>5. Changes to This Policy</h2>
      <p>
        We may update this Cookie Policy. Changes will be reflected by a new
        "Last updated" date at the top of this page.
      </p>

      <h2>6. Contact</h2>
      <p>
        📧{" "}
        <a href="mailto:info@bookmyservices.co.uk">info@bookmyservices.co.uk</a>
      </p>
    </PolicyLayout>
  );
}
