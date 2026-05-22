"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { WorkspaceState } from "@/types";
import { DESKS, CHAIRS } from "@/data/products";

interface Props {
  state: WorkspaceState;
  total: number;
  onBack: () => void;
}

function Confetti() {
  const colors = [
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
  ];
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: Math.random() * 100,
    delay: Math.random() * 1.5,
    size: Math.random() * 8 + 6,
    duration: Math.random() * 2 + 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `confettiDrop ${p.duration}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
    </div>
  );
}

export default function CheckoutView({ state, total, onBack }: Props) {
  const [step, setStep] = useState<"summary" | "form" | "success">("summary");
  const [showConfetti, setShowConfetti] = useState(false);
  const [duration, setDuration] = useState<"weekly" | "monthly">("weekly");
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === "form") nameRef.current?.focus();
    if (step === "success") {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(t);
    }
  }, [step]);

  const priceWeekly = total;
  const priceMonthly = total * 4 * 0.75;
  const displayPrice = duration === "weekly" ? priceWeekly : priceMonthly;
  const displayLabel = duration === "weekly" ? "/week" : "/month";

  const allItems = [
    ...(state.desk ? [state.desk] : []),
    ...(state.chair ? [state.chair] : []),
    ...state.accessories,
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setStep("success"), 500);
  };

  // Build the monis.rent cart URL - link to their website
  const monisRentUrl = "https://www.monis.rent";

  if (step === "success") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-amber-50 to-orange-50 p-8">
        {showConfetti && <Confetti />}
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center animate-slide-up">
          <div className="text-7xl mb-4 animate-float inline-block">🎉</div>
          <h1 className="text-2xl font-bold text-stone-800 mb-2">
            Your workspace is on its way!
          </h1>
          <p className="text-stone-500 mb-6 text-sm leading-relaxed">
            Thanks, <strong>{form.name || "there"}</strong>! We&apos;re
            preparing your setup. Our team will contact you at{" "}
            <strong>{form.email || "your email"}</strong> to confirm delivery
            details.
          </p>

          {/* Setup summary */}
          <div className="bg-amber-50 rounded-2xl p-4 mb-6 text-left space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-3">
              Your Setup
            </p>
            {allItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-stone-700">
                  {item.emoji || "•"} {item.name}
                </span>
                <span className="font-semibold text-amber-600">
                  ${item.price}/wk
                </span>
              </div>
            ))}
            <div className="border-t border-amber-200 pt-2 mt-2 flex justify-between font-bold text-stone-800">
              <span>Total</span>
              <span className="text-amber-600">
                ${displayPrice.toFixed(2)}
                {displayLabel}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <a
              href={monisRentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold transition-all duration-200 hover:scale-[1.02]"
            >
              Visit monis.rent to complete →
            </a>
            <button
              onClick={onBack}
              className="block w-full py-3 rounded-xl text-stone-500 hover:text-stone-700 text-sm transition-colors"
            >
              ← Design another setup
            </button>
          </div>

          <p className="text-xs text-stone-400 mt-4">
            ⚡ Same-day delivery available · 🛡️ Insured gear · ✓ Cancel anytime
          </p>
        </div>
      </div>
    );
  }

  if (step === "form") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-amber-50 to-orange-50 p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-7 animate-slide-up">
          <button
            onClick={() => setStep("summary")}
            className="text-stone-400 hover:text-stone-600 text-sm mb-4 flex items-center gap-1"
          >
            ← Back
          </button>
          <h2 className="text-xl font-bold text-stone-800 mb-1">
            Almost there!
          </h2>
          <p className="text-stone-500 text-sm mb-5">
            Tell us where to deliver your workspace in Bali.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Your Name
              </label>
              <input
                ref={nameRef}
                type="text"
                required
                placeholder="Alex Chen"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="alex@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Delivery Address in Bali
              </label>
              <input
                type="text"
                required
                placeholder="Jl. Pantai Berawa No. 12, Canggu"
                value={form.address}
                onChange={(e) =>
                  setForm((f) => ({ ...f, address: e.target.value }))
                }
                className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Notes (optional)
              </label>
              <textarea
                placeholder="e.g. 3rd floor, need delivery before 10am"
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                rows={2}
                className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-2">
                Rental Duration
              </label>
              <div className="flex gap-2">
                {(["weekly", "monthly"] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDuration(d)}
                    className={`flex-1 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                      duration === d
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-stone-200 text-stone-500 hover:border-stone-300"
                    }`}
                  >
                    {d === "weekly"
                      ? `$${priceWeekly.toFixed(2)}/wk`
                      : `$${priceMonthly.toFixed(2)}/mo (save 25%)`}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-white font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mt-2"
            >
              {submitted
                ? "Submitting..."
                : `🏄 Confirm Rental — $${displayPrice.toFixed(2)}${displayLabel}`}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Summary step
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-amber-100 p-6">
      <div className="max-w-2xl w-full animate-slide-up">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-700 text-sm mb-6 transition-colors group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">
            ←
          </span>
          Back to builder
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-amber-500 to-orange-500 px-8 py-6 text-white">
            <h1 className="text-2xl font-bold">Your Dream Workspace</h1>
            <p className="text-amber-100 text-sm mt-1">
              Ready to rent in Bali · Same-day delivery available
            </p>
          </div>

          <div className="p-7">
            {/* Items grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {allItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 bg-stone-50 rounded-xl p-3 border border-stone-100"
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white shrink-0 border border-stone-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      unoptimized
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        img.style.display = "none";
                        const p = img.parentElement;
                        if (p)
                          p.innerHTML = `<span class="flex items-center justify-center w-full h-full text-2xl">${item.emoji || "📦"}</span>`;
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-stone-800 text-sm truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-stone-500 capitalize">
                      {item.category}
                    </p>
                  </div>
                  <span className="font-bold text-amber-600 text-sm shrink-0">
                    ${item.price}/wk
                  </span>
                </div>
              ))}
            </div>

            {/* Duration toggle */}
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">
                Billing Period
              </p>
              <div className="flex gap-2">
                {(["weekly", "monthly"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                      duration === d
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-stone-200 text-stone-500 hover:border-stone-300"
                    }`}
                  >
                    {d === "weekly" ? (
                      <span>
                        Weekly{" "}
                        <span className="font-bold">
                          ${priceWeekly.toFixed(2)}
                        </span>
                      </span>
                    ) : (
                      <span>
                        Monthly{" "}
                        <span className="font-bold">
                          ${priceMonthly.toFixed(2)}
                        </span>{" "}
                        <span className="text-green-600 text-xs">save 25%</span>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center bg-amber-50 rounded-2xl px-5 py-4 mb-6">
              <div>
                <p className="text-xs text-stone-500 font-medium">
                  Grand Total
                </p>
                <p className="text-stone-600 text-sm">
                  {allItems.length} item{allItems.length !== 1 ? "s" : ""}
                  {" · "}
                  {duration} billing
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-amber-600">
                  ${displayPrice.toFixed(2)}
                </p>
                <p className="text-xs text-stone-400">{displayLabel}</p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                {
                  icon: "⚡",
                  label: "Same-day Delivery",
                  sub: "Available in Bali",
                },
                {
                  icon: "🛡️",
                  label: "Insured Gear",
                  sub: "Covered if it breaks",
                },
                { icon: "↩️", label: "Free Return", sub: "We pick it up" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="bg-stone-50 rounded-xl p-3 text-center border border-stone-100"
                >
                  <p className="text-xl">{b.icon}</p>
                  <p className="text-xs font-semibold text-stone-700 mt-1">
                    {b.label}
                  </p>
                  <p className="text-[10px] text-stone-400">{b.sub}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => setStep("form")}
              className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-base tracking-wide transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-amber-200"
            >
              🏄 Continue to Book — ${displayPrice.toFixed(2)}
              {displayLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
