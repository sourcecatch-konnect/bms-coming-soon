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
    value: WaitlistFormData[K],
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
    value: InquiryFormData[K],
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

        <div className="animate-fade-up-4 mb-10 flex flex-col items-center gap-3 text-center">
          <Link
            href="/cleaner-onboarding"
            className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#ec1d8d,#ff6db8)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(236,29,141,0.28)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(236,29,141,0.32)]"
          >
            Cleaner Onboarding
          </Link>
          <p className="text-sm text-gray-400">
            Are you a cleaner? Share your details and start earning as a
            cleaner.
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

        <footer className="w-full  border-gray-100 pt-7 pb-2">
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
