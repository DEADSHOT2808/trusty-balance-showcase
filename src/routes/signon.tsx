import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CibcLogo } from "@/components/CibcLogo";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/signon")({
  component: SignOn,
  head: () => ({ meta: [{ title: "Sign On | CIBC Online Banking" }] }),
});

const VALID_CARD = "4506440351644686";
const VALID_PASSWORD = "strongpass123";

function SignOn() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"card" | "password">("card");
  const [card, setCard] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  const formatCard = (val: string) => val.replace(/\D/g, "").slice(0, 16);

  const submitCard = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (card.replace(/\s/g, "") !== VALID_CARD) {
      setError("We don't recognize this card number. Please check and try again.");
      return;
    }
    setStep("password");
  };

  const submitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== VALID_PASSWORD) {
      setError("The password you entered is incorrect. Please try again.");
      return;
    }
    sessionStorage.setItem("cibc_auth", "1");
    navigate({ to: "/banking" });
  };

  const maskedCard = `${VALID_CARD.slice(0, 4)} **** **** ${VALID_CARD.slice(-4)}`;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--cibc-red)" }}>
      <div className="flex justify-end px-8 py-6 text-white text-sm">
        <span className="font-semibold">English</span>
        <span className="mx-2">|</span>
        <a href="#" className="underline">Français</a>
      </div>

      <div className="flex-1 flex items-start justify-center px-4">
        <div className="w-full max-w-3xl rounded-md bg-white p-10 shadow-xl">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 relative">
            <ShieldCheck className="absolute top-0 right-0 h-6 w-6" style={{ color: "var(--cibc-red)" }} />
            <div>
              <CibcLogo />
            </div>
            <div>
              {step === "card" ? (
                <form onSubmit={submitCard}>
                  <h1 className="text-2xl text-gray-900">
                    Sign on to CIBC Online Banking<sup>®</sup>
                  </h1>
                  <label className="mt-8 block text-gray-800">Card number</label>
                  <input
                    value={card}
                    onChange={(e) => setCard(formatCard(e.target.value))}
                    inputMode="numeric"
                    className="mt-2 w-full rounded border-2 border-gray-400 px-3 py-2.5 outline-none focus:border-gray-700"
                  />
                  {error && <p className="mt-2 text-sm" style={{ color: "var(--cibc-red)" }}>{error}</p>}
                  <div className="mt-4 flex items-center gap-2 text-gray-700">
                    <input type="checkbox" className="h-4 w-4" />
                    <span>Remember my card</span>
                  </div>
                  <div className="mt-6 flex gap-4">
                    <button
                      type="button"
                      onClick={() => history.back()}
                      className="flex-1 rounded border-2 py-2.5 font-medium"
                      style={{ borderColor: "var(--cibc-red)", color: "var(--cibc-red)" }}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded py-2.5 font-medium text-white"
                      style={{ backgroundColor: "var(--cibc-red)" }}
                    >
                      Continue
                    </button>
                  </div>
                  <p className="mt-8 text-gray-800">
                    Not registered for online banking? <a href="#" className="underline">Register now</a>.
                  </p>
                  <p className="mt-2 text-gray-800">
                    Trouble signing on? <a href="#" className="underline">Reset your password</a>.
                  </p>
                </form>
              ) : (
                <form onSubmit={submitPassword}>
                  <h1 className="text-2xl text-gray-900">Enter password for</h1>
                  <p className="text-2xl text-gray-900 mt-1">{maskedCard}</p>
                  <button
                    type="button"
                    onClick={() => { setStep("card"); setError(""); setPassword(""); }}
                    className="mt-3 underline text-gray-800"
                  >
                    Use a different card
                  </button>
                  <label className="mt-8 block text-gray-800">Password (case sensitive)</label>
                  <div className="relative">
                    <input
                      type={showPwd ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-2 w-full rounded border-2 border-gray-400 px-3 py-2.5 pr-10 outline-none focus:border-gray-700"
                    />
                    <button type="button" onClick={() => setShowPwd((v) => !v)} className="absolute right-3 top-1/2" style={{ color: "var(--cibc-red)" }}>
                      {showPwd ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {error && <p className="mt-2 text-sm" style={{ color: "var(--cibc-red)" }}>{error}</p>}
                  <button
                    type="submit"
                    className="mt-6 w-full rounded py-2.5 font-medium text-white"
                    style={{ backgroundColor: "var(--cibc-red)" }}
                  >
                    Sign on
                  </button>
                  <p className="mt-8 text-gray-800">
                    Not registered for online banking? <a href="#" className="underline">Register now</a>.
                  </p>
                  <p className="mt-2 text-gray-800">
                    Trouble signing on? <a href="#" className="underline">Reset your password</a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-gray-300 text-sm py-6 px-8 flex justify-between mt-10">
        <span>"CIBC" and the CIBC Logo are trademarks of CIBC.</span>
        <div className="flex gap-6">
          <a href="#">Accessibility at CIBC</a>
          <a href="#">Privacy and security</a>
          <a href="#">Legal</a>
        </div>
      </footer>
    </div>
  );
}