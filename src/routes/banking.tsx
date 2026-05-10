import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CibcLogo } from "@/components/CibcLogo";
import { HelpCircle, Search, Bell, Home, FileText, CreditCard, Send, ArrowLeftRight, ShoppingCart, Shield, Award, Calendar, MapPin, MoreHorizontal, ArrowLeft } from "lucide-react";

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

interface Transaction {
  date: string;
  description: string;
  amount: number;
  type: "in" | "out";
  runningBalance?: number;
}

function Banking() {
  const navigate = useNavigate();
  const [savingsNum, setSavingsNum] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<"chequing" | "savings" | null>(null);

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

  // Chequing Transactions (with your exact ones)
  const chequingTxns: Transaction[] = [
    { date: "Apr 13, 2026", description: "Internet Banking E-TRANSFER 011625157149 DAVID KLIMITZ", amount: 1000.00, type: "in", runningBalance: 1000.36 },
    { date: "Apr 20, 2026", description: "Internet Banking E-TRANSFER 011632108931 DAVID KLIMITZ", amount: 100.00, type: "in", runningBalance: 100.36 },
    { date: "Apr 27, 2026", description: "Internet Banking E-TRANSFER 011567313306 DAVID KLIMITZ", amount: 100.00, type: "in", runningBalance: 103.74 },
    { date: "May 4, 2026", description: "Internet Banking E-TRANSFER 011574585664 DAVID KLIMITZ", amount: 100.00, type: "in", runningBalance: 102.41 },
    { date: "Apr 29, 2026", description: "Transfer to Savings 150333-21-11120", amount: 967.00, type: "out" },
    { date: "May 5, 2026", description: "Transfer to Savings 150333-21-11120", amount: 300.00, type: "out" },
    { date: "May 7, 2026", description: "Transfer from Savings 150333-21-11120", amount: 200.00, type: "in" },
  ];

  // Savings Transactions
  const savingsTxns: Transaction[] = [
    { date: "Apr 29, 2026", description: "Transfer from Chequing 06742-83-81283", amount: 967.00, type: "in" },
    { date: "May 5, 2026", description: "Transfer from Chequing 06742-83-81283", amount: 300.00, type: "in" },
    { date: "May 7, 2026", description: "Transfer to Chequing 06742-83-81283", amount: 200.00, type: "out" },
  ];

  const formatAmount = (amount: number, type: "in" | "out") => (
    <span className={`font-medium ${type === "in" ? "text-green-600" : "text-red-600"}`}>
      {type === "in" ? "+" : "-"}${Math.abs(amount).toFixed(2)}
    </span>
  );

  // Detailed View
  if (selectedAccount) {
    const txns = selectedAccount === "chequing" ? chequingTxns : savingsTxns;
    const title = selectedAccount === "chequing" ? "Chequing" : "Savings";
    const accountNum = selectedAccount === "chequing" ? "06742-83-81283" : savingsNum;
    const balance = selectedAccount === "chequing" ? "$2.19" : "$1,067.00";

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="text-white" style={{ backgroundColor: "var(--cibc-red)" }}>
          <div className="mx-auto flex max-w-7xl items-center justify-end gap-6 px-6 py-3 text-sm">
            <a href="#" className="flex items-center gap-2"><HelpCircle className="h-4 w-4" /> Help Centre</a>
            <button onClick={signOff} className="rounded border border-white px-4 py-1.5">Sign off</button>
          </div>
        </div>

        <header className="bg-white border-b">
          <div className="mx-auto max-w-7xl px-6 py-5 flex items-center gap-4">
            <button onClick={() => setSelectedAccount(null)} className="flex items-center gap-2 text-gray-700 hover:text-black">
              <ArrowLeft className="h-5 w-5" /> Back to Accounts
            </button>
            <CibcLogo />
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{title} Account</h1>
            <p className="text-gray-600 font-mono">{accountNum}</p>
            <p className="text-5xl font-bold mt-4">{balance}</p>
          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="grid grid-cols-[110px_1fr_140px_140px] bg-gray-50 px-6 py-4 text-xs font-semibold text-gray-600 border-b">
              <div>DATE</div>
              <div>DESCRIPTION</div>
              <div className="text-right">AMOUNT</div>
              <div className="text-right">RUNNING BALANCE</div>
            </div>
            {txns.map((t, i) => (
              <div key={i} className="grid grid-cols-[110px_1fr_140px_140px] px-6 py-5 border-b hover:bg-gray-50 items-center">
                <div>{t.date}</div>
                <div className="pr-4">{t.description}</div>
                <div className="text-right">{formatAmount(t.amount, t.type)}</div>
                <div className="text-right text-sm text-gray-600">
                  ${t.runningBalance?.toFixed(2) || "—"}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header remains the same */}
      <div className="text-white" style={{ backgroundColor: "var(--cibc-red)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-6 px-6 py-3 text-sm">
          <a href="#" className="flex items-center gap-2"><HelpCircle className="h-4 w-4" /> Help Centre</a>
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
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr_280px] gap-6">
        {/* Sidebar unchanged */}
        <aside className="space-y-3">
          {/* ... your original sidebar code ... */}
        </aside>

        {/* Center - Clickable Accounts */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 rounded-lg p-5" style={{ backgroundColor: "var(--cibc-red)", color: "white" }}>
            <div className="rounded-full bg-white/20 p-3"><HelpCircle className="h-6 w-6" /></div>
            <p className="flex-1">Need help? Check out our Help Centre page for FAQs and how-to videos.</p>
            <a href="#" className="font-medium">Learn more ›</a>
          </div>

          <div>
            <h2 className="text-xs font-semibold tracking-widest text-gray-600">DEPOSIT ACCOUNTS</h2>
            
            <div onClick={() => setSelectedAccount("chequing")} className="cursor-pointer">
              <AccountCard name="Chequing" number="06742-83-81283" balance="$2.19" />
            </div>

            <div onClick={() => setSelectedAccount("savings")} className="cursor-pointer mt-4">
              <AccountCard name="Savings" number={savingsNum} balance="$1,067.00" />
            </div>

            <SavingsTransactions />
          </div>
        </section>

        {/* Right sidebar unchanged */}
      </main>
    </div>
  );
}

/* Keep your helper components */
function AccountCard({ name, number, balance }: { name: string; number: string; balance: string }) {
  return (
    <div className="mt-3 rounded-lg bg-gray-100 p-6 hover:shadow-md transition-shadow">
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
    </div>
  );
}

// Keep your original SavingsTransactions and other helper functions
function SavingsTransactions() {
  // ... (you can keep your original one or leave it)
  return <div className="mt-4 rounded-lg border bg-white p-6 text-center text-gray-500">Savings Recent Transactions (click Savings card for full view)</div>;
}

// Add other helper functions (Section, SmallTile, RowTile) from your original file if needed
