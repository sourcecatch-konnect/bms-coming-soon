"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type WaitlistFormData = {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  transactionalConsent: boolean;
  marketingConsent: boolean;
};

type InquiryFormData = {
  name: string;
  email: string;
  message: string;
};

type WaitlistErrors = Partial<
  Record<"fullName" | "email" | "service" | "transactionalConsent", string>
>;

type InquiryErrors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const trustPoints = [
  "Vetted Professionals",
  "Secure Payments via Stripe",
  "Rated & Reviewed",
  "London Wide",
];

const serviceOptions = ["Cleaning", "Repair", "Plumbing", "Other"];

const initialWaitlistForm: WaitlistFormData = {
  fullName: "",
  email: "",
  phone: "",
  service: "",
  transactionalConsent: false,
  marketingConsent: false,
};

const initialInquiryForm: InquiryFormData = {
  name: "",
  email: "",
  message: "",
};

function validateWaitlistForm(form: WaitlistFormData): WaitlistErrors {
  const errors: WaitlistErrors = {};

  if (!form.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!form.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.service) {
    errors.service = "Please choose a service.";
  }

  if (!form.transactionalConsent) {
    errors.transactionalConsent =
      "You must agree to receive service-related transactional emails.";
  }

  return errors;
}

function validateInquiryForm(form: InquiryFormData): InquiryErrors {
  const errors: InquiryErrors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!form.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.message.trim()) {
    errors.message = "Please enter your inquiry.";
  }

  return errors;
}

export default function Home() {
  const [waitlistForm, setWaitlistForm] =
    useState<WaitlistFormData>(initialWaitlistForm);
  const [waitlistErrors, setWaitlistErrors] = useState<WaitlistErrors>({});
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  const [inquiryForm, setInquiryForm] =
    useState<InquiryFormData>(initialInquiryForm);
  const [inquiryErrors, setInquiryErrors] = useState<InquiryErrors>({});
  const [inquirySuccess, setInquirySuccess] = useState(false);

  const updateWaitlistField = <K extends keyof WaitlistFormData>(
    field: K,
    value: WaitlistFormData[K]
  ) => {
    setWaitlistForm((current) => ({
      ...current,
      [field]: value,
    }));
    setWaitlistSuccess(false);

    setWaitlistErrors((current) => {
      const next = { ...current };
      switch (field) {
        case "fullName":
          delete next.fullName;
          break;
        case "email":
          delete next.email;
          break;
        case "service":
          delete next.service;
          break;
        case "transactionalConsent":
          delete next.transactionalConsent;
          break;
        default:
          break;
      }
      return next;
    });
  };

  const updateInquiryField = <K extends keyof InquiryFormData>(
    field: K,
    value: InquiryFormData[K]
  ) => {
    setInquiryForm((current) => ({
      ...current,
      [field]: value,
    }));
    setInquirySuccess(false);

    setInquiryErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleWaitlistSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateWaitlistForm(waitlistForm);
    setWaitlistErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // Backend/API integration for the early-access waitlist will be added here.
    // After persistence, transactional and marketing emails will be sent via Brevo SMTP.
    setWaitlistSuccess(true);
    setWaitlistForm(initialWaitlistForm);
  };

  const handleInquirySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateInquiryForm(inquiryForm);
    setInquiryErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // Backend/API integration for inquiry capture will be added here.
    // Inquiry confirmations and follow-ups will be triggered through Brevo SMTP.
    setInquirySuccess(true);
    setInquiryForm(initialInquiryForm);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white relative">
      <div className="fixed inset-0 bg-grid pointer-events-none" />
      <div
        className="fixed top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #EC1D8D, transparent 70%)",
          transform: "translate(30%,-30%)",
        }}
      />
      <div
        className="fixed bottom-0 left-0 w-[400px] h-[400px] pointer-events-none opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #EC1D8D, transparent 70%)",
          transform: "translate(-30%,30%)",
        }}
      />
      <div
        className="animate-float fixed top-1/3 right-[15%] w-3 h-3 rounded-full pointer-events-none"
        style={{ background: "#EC1D8D", opacity: 0.25 }}
      />
      <div
        className="animate-float-delay fixed top-1/2 left-[10%] w-2 h-2 rounded-full pointer-events-none"
        style={{ background: "#EC1D8D", opacity: 0.2 }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14 flex flex-col items-center">
        <div className="animate-fade-up-1 mb-10 flex flex-col items-center gap-1">
          <div className="flex items-center gap-3">
            <Image
              src="/logo2.png"
              width={300}
              height={40}
              alt="Book My Services Logo"
            />
          </div>
        </div>

        <div className="animate-fade-up-2 mb-7">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
            style={{
              background: "rgba(236,29,141,.07)",
              border: "1px solid rgba(236,29,141,.22)",
              color: "#EC1D8D",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#EC1D8D] animate-pulse" />
            London&apos;s Home Services Platform - Launching Soon
          </span>
        </div>

        <div className="animate-fade-up-3 text-center mb-5 max-w-3xl">
          <h1
            className="font-black leading-[1.05] mb-4 text-[#2B2B2B]"
            style={{ fontSize: "clamp(2.2rem,5.5vw,4rem)" }}
          >
            Every Service You Need,{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#EC1D8D,#ff6db8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              One Click Away
            </span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed max-w-xl mx-auto">
            Book trusted, vetted professionals for cleaning across London from
            one simple platform.
          </p>
        </div>

        <div className="animate-fade-up-5 mb-14 flex flex-wrap gap-6 justify-center">
          {trustPoints.map((point) => (
            <div key={point} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EC1D8D]/80" />
              <span className="text-sm font-medium text-gray-500">{point}</span>
            </div>
          ))}
        </div>

        <section className="animate-fade-up-4 w-full mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center rounded-full border border-[#EC1D8D]/15 bg-[#EC1D8D]/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#EC1D8D]">
              Pre-launch Access
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black text-[#2B2B2B]">
              Get Early Access
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-500 leading-relaxed">
              Sign up to be notified when we launch and manage your service
              bookings.
            </p>
          </div>

          <div className="lead-grid">
            <div className="lead-card lead-card-primary">
              <div className="mb-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#EC1D8D]">
                  Join the waitlist
                </p>
                <h3 className="mt-3 text-2xl font-bold text-[#2B2B2B]">
                  Reserve your place for launch-day access
                </h3>
                <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed">
                  Tell us what services you need and we&apos;ll contact you when
                  bookings go live.
                </p>
              </div>

              {waitlistSuccess ? (
                <div className="form-success" role="status">
                  Thank you! We&apos;ll notify you when we launch.
                </div>
              ) : null}

              <form className="space-y-5" onSubmit={handleWaitlistSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="form-label" htmlFor="waitlist-full-name">
                      Full Name
                    </label>
                    <input
                      id="waitlist-full-name"
                      name="fullName"
                      type="text"
                      className="form-control"
                      value={waitlistForm.fullName}
                      onChange={(event) =>
                        updateWaitlistField("fullName", event.target.value)
                      }
                      placeholder="Jane Smith"
                      autoComplete="name"
                      aria-invalid={Boolean(waitlistErrors.fullName)}
                    />
                    {waitlistErrors.fullName ? (
                      <p className="form-error">{waitlistErrors.fullName}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="form-label" htmlFor="waitlist-email">
                      Email Address
                    </label>
                    <input
                      id="waitlist-email"
                      name="email"
                      type="email"
                      className="form-control"
                      value={waitlistForm.email}
                      onChange={(event) =>
                        updateWaitlistField("email", event.target.value)
                      }
                      placeholder="jane@company.com"
                      autoComplete="email"
                      aria-invalid={Boolean(waitlistErrors.email)}
                    />
                    {waitlistErrors.email ? (
                      <p className="form-error">{waitlistErrors.email}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="form-label" htmlFor="waitlist-phone">
                      Phone Number
                    </label>
                    <input
                      id="waitlist-phone"
                      name="phone"
                      type="tel"
                      className="form-control"
                      value={waitlistForm.phone}
                      onChange={(event) =>
                        updateWaitlistField("phone", event.target.value)
                      }
                      placeholder="+44 20 1234 5678"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="form-label" htmlFor="waitlist-service">
                      Service Interested In
                    </label>
                    <select
                      id="waitlist-service"
                      name="service"
                      className="form-control form-select"
                      value={waitlistForm.service}
                      onChange={(event) =>
                        updateWaitlistField("service", event.target.value)
                      }
                      aria-invalid={Boolean(waitlistErrors.service)}
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {waitlistErrors.service ? (
                      <p className="form-error">{waitlistErrors.service}</p>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-3 rounded-2xl border border-[#EC1D8D]/10 bg-white/70 p-4">
                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={waitlistForm.transactionalConsent}
                      onChange={(event) =>
                        updateWaitlistField(
                          "transactionalConsent",
                          event.target.checked
                        )
                      }
                    />
                    <span>
                      I agree to receive transactional emails related to my
                      bookings and account activity.
                    </span>
                  </label>
                  {waitlistErrors.transactionalConsent ? (
                    <p className="form-error">
                      {waitlistErrors.transactionalConsent}
                    </p>
                  ) : null}

                  <label className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={waitlistForm.marketingConsent}
                      onChange={(event) =>
                        updateWaitlistField(
                          "marketingConsent",
                          event.target.checked
                        )
                      }
                    />
                    <span>
                      I would like to receive promotional offers and updates.
                    </span>
                  </label>
                </div>

                <button type="submit" className="primary-button">
                  Join Waitlist
                </button>
              </form>
            </div>

            <div className="lead-card lead-card-secondary">
              <div className="mb-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#EC1D8D]">
                  Contact us
                </p>
                <h3 className="mt-3 text-2xl font-bold text-[#2B2B2B]">
                  Send a pre-launch inquiry
                </h3>
                <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed">
                  Share your question, partnership interest, or launch needs and
                  we&apos;ll follow up directly.
                </p>
              </div>

              {inquirySuccess ? (
                <div className="form-success" role="status">
                  Thank you! We&apos;ll notify you when we launch.
                </div>
              ) : null}

              <form className="space-y-5" onSubmit={handleInquirySubmit} noValidate>
                <div>
                  <label className="form-label" htmlFor="inquiry-name">
                    Name
                  </label>
                  <input
                    id="inquiry-name"
                    name="name"
                    type="text"
                    className="form-control"
                    value={inquiryForm.name}
                    onChange={(event) =>
                      updateInquiryField("name", event.target.value)
                    }
                    placeholder="Jane Smith"
                    autoComplete="name"
                    aria-invalid={Boolean(inquiryErrors.name)}
                  />
                  {inquiryErrors.name ? (
                    <p className="form-error">{inquiryErrors.name}</p>
                  ) : null}
                </div>

                <div>
                  <label className="form-label" htmlFor="inquiry-email">
                    Email
                  </label>
                  <input
                    id="inquiry-email"
                    name="email"
                    type="email"
                    className="form-control"
                    value={inquiryForm.email}
                    onChange={(event) =>
                      updateInquiryField("email", event.target.value)
                    }
                    placeholder="jane@company.com"
                    autoComplete="email"
                    aria-invalid={Boolean(inquiryErrors.email)}
                  />
                  {inquiryErrors.email ? (
                    <p className="form-error">{inquiryErrors.email}</p>
                  ) : null}
                </div>

                <div>
                  <label className="form-label" htmlFor="inquiry-message">
                    Message
                  </label>
                  <textarea
                    id="inquiry-message"
                    name="message"
                    className="form-control form-textarea"
                    value={inquiryForm.message}
                    onChange={(event) =>
                      updateInquiryField("message", event.target.value)
                    }
                    placeholder="Tell us what you are looking for before launch."
                    rows={6}
                    aria-invalid={Boolean(inquiryErrors.message)}
                  />
                  {inquiryErrors.message ? (
                    <p className="form-error">{inquiryErrors.message}</p>
                  ) : null}
                </div>

                <button type="submit" className="secondary-button">
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>We only send service-related and transactional emails. No spam.</p>
            <Link
              href="/terms-of-service"
              className="mt-2 inline-flex items-center font-semibold text-[#EC1D8D] transition-colors hover:text-[#cc1778]"
            >
              Read our Terms of Service
            </Link>
          </div>
        </section>

        <footer className="w-full border-t border-gray-100 pt-7 pb-2">
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center text-xs text-gray-400">
              <Link
                href="/privacy-policy"
                className="hover:text-[#EC1D8D] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-[#EC1D8D] transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/refund-policy"
                className="hover:text-[#EC1D8D] transition-colors"
              >
                Refund & Cancellation
              </Link>
              <Link
                href="/cookie-policy"
                className="hover:text-[#EC1D8D] transition-colors"
              >
                Cookie Policy
              </Link>
              <a
                href="mailto:info@bookmyservices.co.uk"
                className="hover:text-[#EC1D8D] transition-colors"
              >
                Contact Us
              </a>
            </div>
            <p className="text-[11px] text-gray-300">
              &copy; {new Date().getFullYear()} Book My Services Ltd.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
