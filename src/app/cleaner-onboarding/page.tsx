import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CleanerArt } from "@/components/CleanerArt";
import { CleanerOnboardingForm } from "@/components/CleanerOnboardingForm";

export const metadata: Metadata = {
  title: "Cleaner Onboarding | Book My Services",
  description:
    "Join Book My Services as a cleaner and share your details for London onboarding.",
};

export default function CleanerOnboardingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="absolute inset-y-0 left-1/2 right-0 hidden bg-[#fdf5f9] lg:block" />

      <div className="relative mx-auto grid min-h-screen max-w-6xl grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-8 py-16 sm:px-12 lg:py-12">
          <Link
            href="/"
            aria-label="Book My Services home"
            className="mb-12 block w-fit"
          >
            <Image
              src="/logo2.png"
              width={180}
              height={32}
              alt="Book My Services Logo"
              priority
            />
          </Link>

          <div className="mb-8 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#EC1D8D]">
              Cleaner onboarding
            </p>
            <h1 className="text-3xl font-black leading-tight text-[#2B2B2B] sm:text-4xl">
              Join London’s <br /> Trusted Cleaning Network
            </h1>
            <p className="pt-1 text-sm leading-6 text-neutral-400">
              Fill in your details and we&apos;ll be in touch shortly.
            </p>
          </div>

          <CleanerOnboardingForm />

          <Link
            href="/"
            className="mt-8 text-xs text-neutral-400 transition-colors hover:text-[#EC1D8D]"
          >
            ← Back to home
          </Link>
        </div>

        <div className="hidden items-center justify-center border-l border-[#f3e0ec] bg-[#fdf5f9] lg:flex">
          <div className="w-full px-10">
            <CleanerArt />
          </div>
        </div>
      </div>
    </main>
  );
}
