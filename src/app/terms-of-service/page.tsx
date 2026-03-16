import PolicyLayout from "@/components/PolicyLayout";
export const metadata = { title: "Terms of Service | Book My Services" };

export default function TermsOfService() {
  return (
    <PolicyLayout title="Terms of Service" lastUpdated="1 March 2025">
      <div className="info-box">
        🇬🇧 These Terms are governed by the laws of England and Wales. By using
        Book My Services, you agree to these terms in full.
      </div>

      <p>
        These Terms of Service ("Terms") form a legally binding agreement
        between you and Book My Services Ltd. Please read them carefully.
      </p>

      <h2>1. About Us</h2>
      <p>
        Book My Services is a London-based marketplace connecting customers with
        independent, vetted service professionals across home, lifestyle, and
        trade categories. We facilitate bookings and payments but are not the
        employer of any service provider on our platform.
      </p>

      <h2>2. Eligibility</h2>
      <ul>
        <li>You must be at least 18 years old</li>
        <li>You must be based in or operating within the United Kingdom</li>
        <li>
          Service providers must hold all licences, qualifications, and
          insurance required by law
        </li>
      </ul>

      <h2>3. Accounts</h2>
      <ul>
        <li>Provide accurate and current information during registration</li>
        <li>Keep your password secure and do not share it</li>
        <li>Notify us immediately of any unauthorised account access</li>
        <li>You are responsible for all activity on your account</li>
      </ul>

      <h2>4. Bookings & Payments</h2>
      <ul>
        <li>
          A binding contract is formed between customer and service provider
          upon booking confirmation
        </li>
        <li>
          Payments are processed securely via Stripe — by booking you agree to
          Stripe's Terms of Service
        </li>
        <li>All prices are in GBP (£) and include VAT where applicable</li>
        <li>
          We act as a limited payment collection agent on behalf of service
          providers
        </li>
      </ul>

      <h2>5. Cancellations & Refunds</h2>
      <p>
        See our full <a href="/refund-policy">Refund & Cancellation Policy</a>.
      </p>

      <h2>6. Acceptable Use</h2>
      <p>You must not:</p>
      <ul>
        <li>Use the platform for any unlawful purpose</li>
        <li>Post false, misleading, or defamatory content or reviews</li>
        <li>
          Bypass the platform to pay service providers directly to avoid our fee
        </li>
        <li>Harass, abuse, or threaten other users or service providers</li>
        <li>Use bots, scrapers, or automated tools on the platform</li>
        <li>Misrepresent your identity or qualifications</li>
      </ul>

      <h2>7. Service Providers</h2>
      <ul>
        <li>
          Service providers are independent contractors, not employees of Book
          My Services Ltd
        </li>
        <li>
          Providers are solely responsible for the quality and legality of their
          services
        </li>
        <li>
          Providers must hold appropriate insurance and any required DBS checks
        </li>
      </ul>

      <h2>8. Intellectual Property</h2>
      <p>
        All platform content including the Book My Services name, logo, and
        software is the property of Book My Services Ltd. You may not reproduce
        or use it without our written consent.
      </p>

      <h2>9. Limitation of Liability</h2>
      <ul>
        <li>
          We are not liable for the quality or safety of services performed by
          providers
        </li>
        <li>
          Our maximum liability per claim is limited to the amount you paid for
          that booking
        </li>
        <li>We are not liable for indirect or consequential losses</li>
      </ul>
      <p>
        Nothing here excludes liability for death, personal injury caused by
        negligence, or fraud.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms are governed by the laws of England and Wales. Disputes are
        subject to the exclusive jurisdiction of the English courts.
      </p>

      <h2>11. Contact</h2>
      <p>
        📧{" "}
        <a href="mailto:info@bookmyservices.co.uk">info@bookmyservices.co.uk</a>{" "}
        · London, UK
      </p>
    </PolicyLayout>
  );
}
