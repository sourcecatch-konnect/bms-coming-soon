"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const LAUNCH_DATE = new Date("2025-09-01T00:00:00Z");

const services = [
  { icon: "🏠", label: "Home Cleaning" },
  { icon: "🔧", label: "Plumbing" },
  { icon: "⚡", label: "Electrical" },
  { icon: "💅", label: "Beauty & Wellness" },
  { icon: "🌿", label: "Gardening" },
  { icon: "🎨", label: "Painting & Decorating" },
  { icon: "📦", label: "Removals" },
  { icon: "❄️", label: "AC & HVAC" },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Home() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const tick = () => {
      const diff = LAUNCH_DATE.getTime() - Date.now();
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr("Please enter a valid email.");
      return;
    }
    setErr("");
    setDone(true);
  };

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Background */}
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

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-14 flex flex-col items-center">
        {/* Logo */}
        <div className="animate-fade-up-1 mb-10 flex flex-col items-center gap-1">
          <div className="flex items-center gap-3">
            <Image
              src={"/logo2.png"}
              width={300}
              height={40}
              alt="Book My Services Logo"
            />
          </div>
        </div>

        {/* Badge */}
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
            London&apos;s Home Services Platform — Launching Soon
          </span>
        </div>

        {/* Headline */}
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
            Book trusted, vetted professionals across London — cleaning,
            plumbing, beauty, electrical and more, all from one simple platform.
          </p>
        </div>

        {/* Service chips */}
        <div className="animate-fade-up-5 mb-12 w-full max-w-2xl">
          <p className="text-center text-[11px] font-semibold tracking-[.2em] uppercase text-gray-400 mb-3">
            Services we cover
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {services.map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-white border transition-all hover:border-[#EC1D8D] hover:text-[#EC1D8D] cursor-default"
                style={{ borderColor: "rgba(43,43,43,.12)", color: "#2B2B2B" }}
              >
                {icon} {label}
              </span>
            ))}
            <span
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: "rgba(236,29,141,.06)",
                color: "#EC1D8D",
                border: "1px dashed rgba(236,29,141,.3)",
              }}
            >
              + many more
            </span>
          </div>
        </div>

        {/* Trust row */}
        <div className="animate-fade-up-5 mb-14 flex flex-wrap gap-6 justify-center">
          {[
            ["✅", "Vetted Professionals"],
            ["🔒", "Secure Payments via Stripe"],
            ["⭐", "Rated & Reviewed"],
            ["📍", "London Wide"],
          ].map(([icon, text]) => (
            <div key={text} className="flex items-center gap-2">
              <span className="text-base">{icon}</span>
              <span className="text-sm font-medium text-gray-500">{text}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
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
              © {new Date().getFullYear()} Book My Services Ltd.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
