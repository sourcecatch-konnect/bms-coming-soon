import Link from "next/link";

export default function PolicyLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <svg width="34" height="34" viewBox="0 0 120 120" fill="none">
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="#EC1D8D"
                strokeWidth="9"
                fill="none"
              />
              <path
                d="M60 28C38 28 22 44 22 60s16 32 38 32 38-16 38-32c0-9-4.5-17-12-22"
                stroke="#EC1D8D"
                strokeWidth="9"
                strokeLinecap="round"
                fill="none"
              />
              <ellipse cx="55" cy="62" rx="11" ry="8" fill="#EC1D8D" />
            </svg>
            <span className="font-light text-sm text-[#2B2B2B]">
              Book My <strong className="font-black">Services</strong>
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-[#EC1D8D] transition-colors flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div
        className="border-b border-gray-100"
        style={{
          background: "linear-gradient(135deg,rgba(236,29,141,.04),#fff 60%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-10">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
            style={{ background: "rgba(236,29,141,.08)", color: "#EC1D8D" }}
          >
            Legal
          </span>
          <h1 className="font-black text-4xl text-[#2B2B2B] mb-2">{title}</h1>
          <p className="text-gray-400 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 prose-policy">
        {children}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Book My Services Ltd · London, UK
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-gray-400 justify-center">
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
              Refund Policy
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
              info@bookmyservices.co.uk
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
