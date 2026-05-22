"use client";

import { useState, useCallback } from "react";
import type { Product, WorkspaceState } from "@/types";
import { DESKS, CHAIRS } from "@/data/products"; // used for initial state
import WorkspaceScene from "./WorkspaceScene";
import ProductPanel from "./ProductPanel";
import SummaryPanel from "./SummaryPanel";
import CheckoutView from "./CheckoutView";

export default function WorkspaceBuilder() {
  const [state, setState] = useState<WorkspaceState>({
    desk: DESKS[0],
    chair: CHAIRS[0],
    accessories: [],
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [activeCategory, setActiveCategory] = useState<
    "desk" | "chair" | "accessories"
  >("desk");

  const selectDesk = useCallback((desk: Product) => {
    setState((s) => ({ ...s, desk }));
  }, []);

  const selectChair = useCallback((chair: Product) => {
    setState((s) => ({ ...s, chair }));
  }, []);

  const toggleAccessory = useCallback((acc: Product) => {
    setState((s) => ({
      ...s,
      accessories: s.accessories.find((a) => a.id === acc.id)
        ? s.accessories.filter((a) => a.id !== acc.id)
        : [...s.accessories, acc],
    }));
  }, []);

  const total =
    (state.desk?.price ?? 0) +
    (state.chair?.price ?? 0) +
    state.accessories.reduce((sum, a) => sum + a.price, 0);

  if (showCheckout) {
    return (
      <CheckoutView
        state={state}
        total={total}
        onBack={() => setShowCheckout(false)}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen" style={{ background: "#08080F" }}>
      {/* ── HEADER ── */}
      <header
        className="shrink-0 h-14 flex items-center justify-between px-6 z-10 border-b"
        style={{
          background: "rgba(10,10,20,0.85)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          <a
            href="https://monis.rent"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <span className="font-black text-lg tracking-tight text-white">
              monis<span className="text-amber-400">.rent</span>
            </span>
          </a>
          <div
            className="w-px h-4"
            style={{ background: "rgba(255,255,255,0.10)" }}
          />
          <span
            className="text-sm font-medium"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Workspace Builder
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="hidden sm:flex items-center gap-1.5 text-xs"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Same-day delivery · Bali
          </span>
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-1.5 border"
            style={{
              background: "rgba(245,158,11,0.10)",
              borderColor: "rgba(245,158,11,0.22)",
            }}
          >
            <span
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Total
            </span>
            <span className="font-black text-amber-400 text-sm">
              ${total.toFixed(2)}/wk
            </span>
          </div>
        </div>
      </header>

      {/* ── MAIN LAYOUT ── */}
      <div className="flex flex-1 min-h-0">
        {/* Left: Product selector */}
        <div className="w-72 shrink-0 flex flex-col min-h-0">
          <ProductPanel
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            state={state}
            onSelectDesk={selectDesk}
            onSelectChair={selectChair}
            onToggleAccessory={toggleAccessory}
          />
        </div>

        {/* Center: Workspace preview */}
        <div className="flex-1 flex flex-col min-w-0 p-4 gap-3">
          {/* Scene label row */}
          <div className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Live Preview
              </p>
            </div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.18)" }}>
              {state.desk?.name ?? "No desk"} ·{" "}
              {state.chair?.name ?? "No chair"} · {state.accessories.length}{" "}
              add-on{state.accessories.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Scene container */}
          <div
            className="flex-1 min-h-0 rounded-2xl overflow-hidden relative"
            style={{
              minHeight: "300px",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.02), 0 24px 48px rgba(0,0,0,0.6)",
            }}
          >
            <WorkspaceScene state={state} />
          </div>

          {/* Quick-add chips */}
          <div className="shrink-0 flex items-center gap-2 overflow-x-auto pb-1">
            <span
              className="text-xs font-medium shrink-0"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Quick add:
            </span>
            {[
              { id: "monitor-24", label: 'Monitor 24"' },
              { id: "lamp", label: "Lamp" },
              { id: "keyboard", label: "Keyboard" },
              { id: "mouse", label: "Mouse" },
              { id: "plant", label: "Plant" },
              { id: "coffee", label: "Coffee" },
            ].map(({ id, label }) => {
              const isActive = state.accessories.some((a) => a.id === id);
              return (
                <button
                  key={id}
                  onClick={() => {
                    import("@/data/products").then(({ ACCESSORIES }) => {
                      const p = ACCESSORIES.find((a) => a.id === id);
                      if (p) toggleAccessory(p);
                    });
                  }}
                  className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150"
                  style={
                    isActive
                      ? {
                          background: "#F59E0B",
                          color: "white",
                          border: "1.5px solid #F59E0B",
                        }
                      : {
                          background: "rgba(255,255,255,0.04)",
                          color: "rgba(255,255,255,0.45)",
                          border: "1.5px solid rgba(255,255,255,0.09)",
                        }
                  }
                >
                  {isActive ? `✓ ${label}` : `+ ${label}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Summary */}
        <div className="w-72 shrink-0 flex flex-col min-h-0">
          <SummaryPanel
            state={state}
            total={total}
            onRent={() => setShowCheckout(true)}
          />
        </div>
      </div>
    </div>
  );
}
