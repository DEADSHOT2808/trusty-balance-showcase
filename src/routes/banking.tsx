import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CibcLogo } from "@/components/CibcLogo";
import { HelpCircle, Search, Bell, Home, FileText, CreditCard, Send, ArrowLeftRight, ShoppingCart, Shield, Award, Calendar, MapPin, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/banking")({
  component: Banking,
  head: () => ({ meta: [{ title: "Home | CIBC Online Banking" }] }),
});

function genSavingsNumber() {
  const a = Math.floor(10000 + Math.random() * 89999);
  const b = Math.floor(10 + Math.random() * 89);
  const c = Math.floor(10000 + Math.random() * 89999);
  return `${a}-${b}-${c}`;
}

function Banking() {
  const navigate = useNavigate();
  const [savingsNum, setSavingsNum] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("cibc_auth") !== "1") {
        navigate({ to: "/signon" });
        return;
      }
      let s = sessionStorage.getItem("cibc_savings");
      if (!s) {
        s = genSavingsNumber();
        sessionStorage.setItem("cibc_savings", s);
      }
      setSavingsNum(s);
    }
  }, [navigate]);

  const signOff = () => {
    sessionStorage.removeItem("cibc_auth");
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-white" style={{ backgroundColor: "var(--cibc-red)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-6 px-6 py-3 text-sm">
          <a href="#" className="flex items-center gap-2"><HelpCircle className="h-4 w-4" /> Help Centre</a>
          <a href="#">AdChoices</a>
          <button onClick={signOff} className="rounded border border-white px-4 py-1.5">Sign off</button>
        </div>
      </div>

      <header className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-6 py-5"><CibcLogo /></div>
      </header>

      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
          <nav className="flex gap-2">
            <button className="rounded-full px-5 py-2 text-white font-medium" style={{ backgroundColor: "var(--cibc-red)" }}>Banking</button>
            <button className="rounded-full px-5 py-2 text-gray-700">Investing</button>
            <button className="rounded-full px-5 py-2 text-gray-700">Offers and products</button>
          </nav>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 rounded-full border px-4 py-2 text-gray-700"><Search className="h-4 w-4" /> Search</button>
            <div className="relative"><Bell className="h-6 w-6 text-gray-700" /><span className="absolute -top-1 -right-1 rounded-full bg-red-600 text-white text-[10px] px-1.5">27</span></div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr_280px] gap-6">
        {/* Left sidebar */}
        <aside className="space-y-3">
          <div className="rounded-lg border bg-white p-4 flex items-center gap-3" style={{ borderLeft: "4px solid var(--cibc-red)" }}>
            <Home className="h-5 w-5" style={{ color: "var(--cibc-red)" }} /> <span className="font-medium">Home</span>
          </div>
          <div className="rounded-lg border bg-white p-4 flex items-center gap-3 text-gray-700"><FileText className="h-5 w-5" style={{ color: "var(--cibc-red)" }} /> Account Details</div>
          <div className="rounded-lg border bg-white p-4 flex items-center gap-3 text-gray-700"><FileText className="h-5 w-5" style={{ color: "var(--cibc-red)" }} /> My Documents</div>

          <div className="pt-4">
            <h3 className="text-xs font-semibold tracking-widest text-gray-600 px-2">MOVE MONEY</h3>
            <ul className="mt-2 space-y-1 text-gray-800">
              <li className="px-3 py-2 hover:bg-white rounded">Bill Payments</li>
              <li className="px-3 py-2 hover:bg-white rounded">Transfer Funds</li>
              <li className="px-3 py-2 hover:bg-white rounded"><em>Interac</em> e-Transfer</li>
            </ul>
          </div>
          <div className="pt-2">
            <h3 className="text-xs font-semibold tracking-widest text-gray-600 px-2">ADVICE</h3>
            <ul className="mt-2 space-y-1 text-gray-800">
              <li className="px-3 py-2 hover:bg-white rounded">Net Worth</li>
              <li className="px-3 py-2 hover:bg-white rounded">Help Centre</li>
              <li className="px-3 py-2 hover:bg-white rounded">Customer Services</li>
            </ul>
          </div>
        </aside>

        {/* Center */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 rounded-lg p-5" style={{ backgroundColor: "var(--cibc-red)", color: "white" }}>
            <div className="rounded-full bg-white/20 p-3"><HelpCircle className="h-6 w-6" /></div>
            <p className="flex-1">Need help? Check out our Help Centre page for FAQs and how-to videos.</p>
            <a href="#" className="font-medium">Learn more ›</a>
          </div>

          <div>
            <h2 className="text-xs font-semibold tracking-widest text-gray-600">DEPOSIT ACCOUNTS</h2>

            <AccountCard name="Chequing" number="06742-83-81283" balance="$2.19" />
            <div className="mt-4" />
            <AccountCard name="Savings" number={savingsNum} balance="$1,067.00" />
            <SavingsTransactions />
          </div>

          <Section title="CREDIT CARDS" text="Learn more about CIBC credit cards and rewards on everyday purchases." />
          <Section title="LENDING ACCOUNTS" text="Looking to borrow cash? We've got some great options." />
          <Section title="INVESTMENTS" text="Trade smarter, not harder with CIBC Investor's Edge. Invest online!" />
        </section>

        {/* Right */}
        <aside className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <SmallTile label="Profile" icon={<div className="h-10 w-10 rounded-full bg-purple-700 text-white flex items-center justify-center text-sm font-semibold">DR</div>} />
            <SmallTile label="Account Security" icon={<Shield className="h-8 w-8" style={{ color: "var(--cibc-red)" }} />} />
          </div>
          <h3 className="text-xs font-semibold tracking-widest text-gray-600">PRODUCTS AND SERVICES</h3>
          <div className="grid grid-cols-2 gap-3">
            <SmallTile label="Explore products" icon={<ShoppingCart className="h-7 w-7" style={{ color: "var(--cibc-red)" }} />} />
            <SmallTile label="Activate card" icon={<CreditCard className="h-7 w-7" style={{ color: "var(--cibc-red)" }} />} />
          </div>
          <RowTile icon={<Award className="h-5 w-5" style={{ color: "var(--cibc-red)" }} />} label="Refer and earn" />
          <h3 className="text-xs font-semibold tracking-widest text-gray-600 pt-2">HELP AND SUPPORT</h3>
          <RowTile icon={<Calendar className="h-5 w-5" style={{ color: "var(--cibc-red)" }} />} label="Book a meeting" />
          <RowTile icon={<MapPin className="h-5 w-5" style={{ color: "var(--cibc-red)" }} />} label="Find a CIBC Banking Centre" />
          <RowTile icon={<HelpCircle className="h-5 w-5" style={{ color: "var(--cibc-red)" }} />} label="Help Centre" />
        </aside>
      </main>
    </div>
  );
}

function AccountCard({ name, number, balance }: { name: string; number: string; balance: string }) {
  return (
    <div className="mt-3 rounded-lg bg-gray-100 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-medium text-gray-900">{name}</h3>
          <p className="mt-1 text-sm text-gray-600">{number}</p>
          <p className="mt-4 text-3xl text-gray-900">{balance}</p>
        </div>
        <div className="h-14 w-20 rounded" style={{ background: "linear-gradient(135deg, #1a1a1a, var(--cibc-red))" }}>
          <div className="text-white text-[10px] p-1 font-bold">DEBIT</div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button className="flex items-center gap-2 rounded border bg-white px-4 py-2 text-gray-800"><Send className="h-4 w-4" /> Send Money</button>
        <button className="flex items-center gap-2 rounded border bg-white px-4 py-2 text-gray-800"><ArrowLeftRight className="h-4 w-4" /> Transfer funds</button>
        <button className="rounded border bg-white p-2 text-gray-800"><MoreHorizontal className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

function Section({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="text-xs font-semibold tracking-widest text-gray-600">{title}</h2>
      <div className="mt-3 flex items-center gap-3 rounded-lg border bg-white p-5">
        <div className="rounded-full p-1.5 text-white text-xl leading-none" style={{ backgroundColor: "var(--cibc-red)" }}>＋</div>
        <p className="text-gray-800">{text}</p>
      </div>
    </div>
  );
}

function SmallTile({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-white p-4 flex flex-col items-center text-center gap-2">
      {icon}
      <span className="text-sm text-gray-800">{label}</span>
    </div>
  );
}

function RowTile({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-4">
      <div className="flex items-center gap-3">{icon}<span className="text-gray-800">{label}</span></div>
      <span className="text-gray-400">›</span>
    </div>
  );
}