import PolicyLayout from "@/components/PolicyLayout";
export const metadata = {
  title: "Refund & Cancellation Policy | Book My Services",
};

export default function RefundPolicy() {
  return (
    <PolicyLayout
      title="Refund & Cancellation Policy"
      lastUpdated="1 March 2025"
    >
      <div className="info-box">
        💳 All payments are processed via Stripe. Approved refunds are returned
        to your original payment method and typically appear within 5–10
        business days.
      </div>

      <h2>1. Customer Cancellations</h2>
      <ul>
        <li>
          <strong>24+ hours before service:</strong> Free cancellation, full
          refund
        </li>
        <li>
          <strong>2–24 hours before service:</strong> 50% cancellation fee
          applies
        </li>
        <li>
          <strong>Under 2 hours / no-show:</strong> No refund — 100% charge
          applies
        </li>
      </ul>

      <h2>2. Rescheduling</h2>
      <ul>
        <li>
          Free rescheduling up to 24 hours before the booking, subject to
          provider availability
        </li>
        <li>Maximum 2 reschedules per booking</li>
        <li>
          Rescheduling within 24 hours is at the service provider's discretion
        </li>
      </ul>

      <h2>3. Provider Cancellations</h2>
      <ul>
        <li>If a provider cancels, you receive a full refund</li>
        <li>We will attempt to find a replacement provider at no extra cost</li>
        <li>
          Repeated provider cancellations may result in account suspension
        </li>
      </ul>

      <h2>4. Refund Eligibility</h2>
      <p>You are entitled to a full refund if:</p>
      <ul>
        <li>The provider fails to attend a confirmed booking</li>
        <li>
          The service delivered is materially different from what was booked
        </li>
        <li>You cancel within the free cancellation window</li>
        <li>There is a duplicate payment or processing error</li>
      </ul>

      <h2>5. Quality Disputes</h2>
      <p>
        Contact us within <strong>48 hours</strong> of service completion:
      </p>
      <ul>
        <li>
          Email{" "}
          <a href="mailto:info@bookmyservices.co.uk">
            info@bookmyservices.co.uk
          </a>{" "}
          with your booking reference and any photos/evidence
        </li>
        <li>We will investigate and respond within 5 working days</li>
        <li>
          Refunds following disputes are at our reasonable discretion after
          reviewing the facts
        </li>
      </ul>

      <h2>6. Non-Refundable Situations</h2>
      <ul>
        <li>Change of mind after a service has been completed</li>
        <li>
          Dissatisfaction based on personal preference where service was
          delivered as described
        </li>
        <li>No-show or inaccessible property</li>
        <li>
          Refund requests made more than 48 hours after completion without good
          reason
        </li>
      </ul>

      <h2>7. How Refunds Work</h2>
      <ul>
        <li>
          Refunds are processed via Stripe to your original payment method
        </li>
        <li>Typically 5–10 business days depending on your bank</li>
        <li>We cannot redirect refunds to a different card or account</li>
      </ul>

      <h2>8. Chargebacks</h2>
      <p>
        Please contact us before raising a chargeback with your bank.
        Unwarranted chargebacks may result in account suspension. We cooperate
        fully with Stripe's dispute resolution process.
      </p>

      <h2>9. Contact</h2>
      <p>
        📧{" "}
        <a href="mailto:info@bookmyservices.co.uk">info@bookmyservices.co.uk</a>{" "}
        — include your booking reference for faster resolution.
      </p>
    </PolicyLayout>
  );
}
