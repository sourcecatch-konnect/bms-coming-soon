import PolicyLayout from "@/components/PolicyLayout";
export const metadata = { title: "Privacy Policy | Book My Services" };

export default function PrivacyPolicy() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="1 March 2025">
      <div className="info-box">
        📍 Book My Services Ltd is registered in England & Wales and operates
        from London, UK. This policy covers all users of bookmyservices.co.uk.
      </div>

      <p>
        At Book My Services Ltd ("we", "us"), we are committed to protecting
        your personal data in line with UK GDPR and the Data Protection Act
        2018.
      </p>

      <h2>1. Who We Are</h2>
      <p>
        Book My Services Ltd is the data controller. We run a marketplace
        connecting London customers with professional service providers.
      </p>
      <p>
        <strong>Contact:</strong>{" "}
        <a href="mailto:info@bookmyservices.co.uk">info@bookmyservices.co.uk</a>{" "}
        · London, UK
      </p>

      <h2>2. What We Collect</h2>
      <ul>
        <li>
          Name, email, phone number, and address when you register or book
        </li>
        <li>
          Payment information — processed securely via Stripe (we never store
          full card details)
        </li>
        <li>
          Service provider profile data (qualifications, photos, descriptions)
        </li>
        <li>Usage data, IP address, browser info, and device data</li>
        <li>
          Location data (with your consent, to match you with local providers)
        </li>
        <li>Reviews, ratings, and messages exchanged on the platform</li>
      </ul>

      <h2>3. How We Use It</h2>
      <ul>
        <li>To process bookings and payments</li>
        <li>To match customers with appropriate service providers</li>
        <li>To send booking confirmations, reminders, and updates</li>
        <li>To prevent fraud and ensure platform security</li>
        <li>To improve platform performance and user experience</li>
        <li>To send marketing communications (only with your consent)</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2>4. Legal Basis (UK GDPR)</h2>
      <ul>
        <li>
          <strong>Contract performance</strong> — to fulfil your bookings
        </li>
        <li>
          <strong>Legal obligation</strong> — to comply with applicable laws
        </li>
        <li>
          <strong>Legitimate interests</strong> — platform security, fraud
          prevention, improvements
        </li>
        <li>
          <strong>Consent</strong> — for marketing and non-essential cookies
        </li>
      </ul>

      <h2>5. Who We Share Data With</h2>
      <ul>
        <li>
          <strong>Service providers</strong> — limited data (name, address,
          contact) to fulfil your booking
        </li>
        <li>
          <strong>Stripe Inc</strong> — our payment processor. See{" "}
          <a
            href="https://stripe.com/gb/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            stripe.com/gb/privacy
          </a>
        </li>
        <li>
          <strong>Infrastructure & analytics providers</strong> — hosting, email
          delivery, analytics
        </li>
        <li>
          <strong>Legal authorities</strong> — where required by law or court
          order
        </li>
      </ul>
      <p>
        We do <strong>not</strong> sell your personal data.
      </p>

      <h2>6. Data Retention</h2>
      <ul>
        <li>
          Account data: retained for the duration of your account + 3 years
          after closure
        </li>
        <li>Transaction records: 7 years (legal/tax compliance)</li>
        <li>Marketing preferences: until you withdraw consent</li>
      </ul>

      <h2>7. Your Rights</h2>
      <p>
        Under UK GDPR you have the right to access, rectify, erase, restrict,
        and port your data, and to object to processing. Contact us at{" "}
        <a href="mailto:info@bookmyservices.co.uk">info@bookmyservices.co.uk</a>{" "}
        and we will respond within 30 days.
      </p>

      <h2>8. Complaints</h2>
      <p>
        You may lodge a complaint with the ICO at{" "}
        <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
          ico.org.uk
        </a>{" "}
        or 0303 123 1113.
      </p>

      <h2>9. Contact</h2>
      <p>
        📧{" "}
        <a href="mailto:info@bookmyservices.co.uk">info@bookmyservices.co.uk</a>{" "}
        · London, UK
      </p>
    </PolicyLayout>
  );
}
