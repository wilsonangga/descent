"use client";

import type { WorkspaceState } from "@/types";

interface Props {
  state: WorkspaceState;
  total: number;
  onRent: () => void;
}

export default function SummaryPanel({ state, total, onRent }: Props) {
  const { desk, chair, accessories } = state;
  const hasSetup = desk && chair;
  const itemCount = (desk ? 1 : 0) + (chair ? 1 : 0) + accessories.length;
  const monthly = total * 4 * 0.75;

  return (
    <div
      className="flex flex-col h-full border-l"
      style={{ background: "#0C0C18", borderColor: "rgba(255,255,255,0.05)" }}
    >
      {/* Header */}
      <div
        className="px-4 pt-5 pb-4 border-b"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <h2 className="text-sm font-bold text-white">Your Setup</h2>
        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.30)" }}>
          {itemCount === 0
            ? "Nothing selected yet"
            : `${itemCount} item${itemCount !== 1 ? "s" : ""} selected`}
        </p>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Desk row */}
        <div>
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-2"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            Desk
          </p>
          {desk ? (
            <div
              className="flex items-center justify-between px-3 py-2.5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xl shrink-0">{desk.emoji ?? "🖥️"}</span>
                <span className="text-sm text-white font-medium truncate">{desk.name}</span>
              </div>
              <span className="text-sm font-bold text-amber-400 shrink-0 ml-2">
                ${desk.price}/wk
              </span>
            </div>
          ) : (
            <p className="text-xs italic px-1" style={{ color: "rgba(255,255,255,0.20)" }}>
              Not selected
            </p>
          )}
        </div>

        {/* Chair row */}
        <div>
          <p
            className="text-[10px] font-bold uppercase tracking-widest mb-2"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            Chair
          </p>
          {chair ? (
            <div
              className="flex items-center justify-between px-3 py-2.5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xl shrink-0">{chair.emoji ?? "🪑"}</span>
                <span className="text-sm text-white font-medium truncate">{chair.name}</span>
              </div>
              <span className="text-sm font-bold text-amber-400 shrink-0 ml-2">
                ${chair.price}/wk
              </span>
            </div>
          ) : (
            <p className="text-xs italic px-1" style={{ color: "rgba(255,255,255,0.20)" }}>
              Not selected
            </p>
          )}
        </div>

        {/* Accessories */}
        {accessories.length > 0 && (
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-2"
              style={{ color: "rgba(255,255,255,0.18)" }}
            >
              Add-ons
            </p>
            <div className="space-y-1.5">
              {accessories.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between px-3 py-2 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base shrink-0">{a.emoji}</span>
                    <span className="text-xs font-medium truncate" style={{ color: "rgba(255,255,255,0.65)" }}>
                      {a.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-400 shrink-0 ml-2">
                    ${a.price}/wk
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {itemCount === 0 && (
          <div className="py-8 text-center">
            <p className="text-3xl mb-3">🏝️</p>
            <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.25)" }}>
              Start building
            </p>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.15)" }}>
              Pick a desk and chair to begin
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="px-4 pb-5 pt-4 border-t space-y-3"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        {/* Delivery badge */}
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2.5"
          style={{
            background: "rgba(74,222,128,0.07)",
            border: "1px solid rgba(74,222,128,0.14)",
          }}
        >
          <span className="text-sm">⚡</span>
          <p className="text-xs font-semibold" style={{ color: "rgba(134,239,172,0.85)" }}>
            Same-day delivery in Bali
          </p>
        </div>

        {/* Price breakdown */}
        <div
          className="rounded-xl p-3 space-y-1.5"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex justify-between text-xs">
            <span style={{ color: "rgba(255,255,255,0.38)" }}>Weekly</span>
            <span className="font-semibold text-white">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span style={{ color: "rgba(255,255,255,0.38)" }}>
              Monthly{" "}
              <span style={{ color: "rgba(134,239,172,0.8)" }}>−25%</span>
            </span>
            <span className="font-semibold text-white">${monthly.toFixed(2)}</span>
          </div>
        </div>

        {/* Grand total */}
        <div className="flex items-center justify-between pt-0.5">
          <span className="font-bold text-white text-sm">Total / week</span>
          <span className="font-black text-2xl text-amber-400">
            ${total.toFixed(2)}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={onRent}
          disabled={!hasSetup}
          className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200"
          style={
            hasSetup
              ? {
                  background: "linear-gradient(135deg,#F59E0B 0%,#D97706 100%)",
                  color: "white",
                  boxShadow: "0 4px 24px rgba(245,158,11,0.28)",
                }
              : {
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.20)",
                  cursor: "not-allowed",
                }
          }
          onMouseEnter={(e) => {
            if (hasSetup)
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "";
          }}
        >
          {hasSetup ? "🏄 Rent My Setup" : "Select desk & chair first"}
        </button>

        {/* Trust signals */}
        <div className="flex items-center justify-center gap-3 pt-0.5">
          {["✓ Free delivery", "✓ Cancel anytime", "✓ Insured"].map((t) => (
            <span key={t} className="text-[10px]" style={{ color: "rgba(255,255,255,0.18)" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

