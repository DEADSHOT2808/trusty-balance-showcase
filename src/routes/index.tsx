import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { CibcLogo } from "@/components/CibcLogo";
import { Search, MapPin, HelpCircle, Lock, Info } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Personal Banking | CIBC" },
      { name: "description", content: "CIBC offers personal banking, credit cards, mortgages and investing solutions." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top nav */}
      <div className="text-white text-sm" style={{ backgroundColor: "var(--cibc-red)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <nav className="flex gap-6">
            <a href="#" className="font-semibold border-b-2 border-white pb-1">Personal</a>
            <a href="#" className="opacity-90 hover:opacity-100">Business</a>
            <a href="#" className="opacity-90 hover:opacity-100">Commercial</a>
            <a href="#" className="opacity-90 hover:opacity-100">Imperial Service</a>
            <a href="#" className="opacity-90 hover:opacity-100">Wealth</a>
            <a href="#" className="opacity-90 hover:opacity-100">About CIBC</a>
            <a href="#" className="opacity-90 hover:opacity-100">CIBC Websites</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Special Offers</a>
            <span>🇨🇦 English</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <CibcLogo />
          <div className="flex items-center gap-6 text-gray-700">
            <Search className="h-5 w-5 cursor-pointer" />
            <MapPin className="h-5 w-5 cursor-pointer" style={{ color: "var(--cibc-red)" }} />
            <HelpCircle className="h-5 w-5 cursor-pointer" />
            <Link
              to="/signon"
              className="flex items-center gap-2 rounded-md px-5 py-2.5 font-medium text-white transition"
              style={{ backgroundColor: "var(--cibc-red)" }}
            >
              <Lock className="h-4 w-4" />
              Sign on
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{ backgroundColor: "var(--cibc-pink)" }}>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <h1 className="text-5xl font-light text-gray-900 leading-tight">Bundle to earn up to $850</h1>
            <p className="mt-6 text-lg text-gray-700 max-w-md">
              Start with a CIBC Smart® Account, then add the CIBC Dividend® Visa Infinite* Card. Qualifying actions apply.<sup style={{ color: "var(--cibc-red)" }}>†,‡</sup>
            </p>
            <p className="mt-6 flex items-center gap-2 text-sm" style={{ color: "var(--cibc-red)" }}>
              <Info className="h-4 w-4" /> Offer ends May 13, 2026
            </p>
            <button
              className="mt-8 rounded-md px-8 py-3 text-white font-medium"
              style={{ backgroundColor: "var(--cibc-red)" }}
            >
              Get started
            </button>
          </div>
          <div className="flex justify-center">
            <div className="relative h-64 w-96 rounded-xl shadow-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1a, #4a0e1a 60%, var(--cibc-red))" }}>
              <div className="absolute top-4 left-5 text-white text-xs tracking-widest">DIVIDEND<br/>CASH BACK</div>
              <div className="absolute top-4 right-5"><CibcLogo className="h-5 text-white" /></div>
              <div className="absolute bottom-6 left-5 text-white">
                <div className="text-xs tracking-wide opacity-80">ADVANTAGE DEBIT CARD</div>
                <div className="mt-2 text-sm">G RAYMOND</div>
              </div>
              <div className="absolute bottom-6 right-5 text-white text-xs font-bold">VISA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-light text-gray-900">Here's how to earn up to $850</h2>
          <div className="mt-12 space-y-10">
            <div>
              <div className="text-xs font-semibold tracking-[0.2em] text-gray-600">STEP 1</div>
              <p className="mt-3 text-gray-700">Open your first CIBC Smart Account, then within 2 months, set up at least one recurring direct deposit of $500 or more per month from your employer, government or pension.</p>
            </div>
            <div>
              <div className="text-xs font-semibold tracking-[0.2em] text-gray-600">STEP 2</div>
              <p className="mt-3 text-gray-700">Now, you're ready to earn $500 with your Smart Account plus up to $350 with a CIBC Dividend Visa Infinite Card by completing these qualifying actions.<sup style={{ color: "var(--cibc-red)" }}>†,‡</sup></p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-200 py-10">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          <p className="text-gray-700">Bundle to earn up to $850<sup style={{ color: "var(--cibc-red)" }}>†,‡</sup></p>
          <button className="rounded-md px-8 py-3 text-white font-medium" style={{ backgroundColor: "var(--cibc-red)" }}>Get started</button>
        </div>
      </div>
    </div>
  );
}
