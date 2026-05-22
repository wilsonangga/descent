"use client";

import Image from "next/image";
import type { Product, WorkspaceState } from "@/types";
import { DESKS, CHAIRS, ACCESSORIES } from "@/data/products";

interface Props {
  activeCategory: "desk" | "chair" | "accessories";
  onCategoryChange: (c: "desk" | "chair" | "accessories") => void;
  state: WorkspaceState;
  onSelectDesk: (d: Product) => void;
  onSelectChair: (c: Product) => void;
  onToggleAccessory: (a: Product) => void;
}

function BigCard({
  product,
  selected,
  onClick,
}: {
  product: Product;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl overflow-hidden transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
      style={
        selected
          ? {
              border: "1.5px solid rgba(245,158,11,0.55)",
              background: "rgba(245,158,11,0.07)",
              boxShadow: "0 0 0 3px rgba(245,158,11,0.10)",
            }
          : {
              border: "1.5px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.03)",
            }
      }
    >
      {/* Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "16/9",
          background: "rgba(255,255,255,0.04)",
        }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-5"
          unoptimized
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.style.display = "none";
            const parent = img.parentElement;
            if (parent)
              parent.innerHTML = `<span class="flex items-center justify-center w-full h-full text-5xl">${product.emoji || "📦"}</span>`;
          }}
        />
        {product.badge && (
          <span
            className="absolute top-2.5 left-2.5 text-[9px] font-bold text-white px-2 py-0.5 rounded-full z-10"
            style={{ background: "#EF4444" }}
          >
            {product.badge}
          </span>
        )}
        {selected && (
          <div
            className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center z-10"
            style={{ background: "#F59E0B" }}
          >
            <span className="text-white text-xs font-bold">✓</span>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="px-3.5 py-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-semibold text-white text-sm leading-snug truncate">
              {product.name}
            </p>
            <p
              className="text-xs mt-0.5 leading-tight line-clamp-1"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {product.description}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-amber-400 font-bold text-sm leading-tight">
              ${product.price}
              <span
                className="text-[10px] font-normal"
                style={{ color: "rgba(245,158,11,0.6)" }}
              >
                /wk
              </span>
            </p>
            {product.priceOriginal && (
              <p
                className="text-[11px] line-through leading-tight"
                style={{ color: "rgba(255,255,255,0.22)" }}
              >
                ${product.priceOriginal}
              </p>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

function AccessoryCard({
  product,
  selected,
  onClick,
}: {
  product: Product;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-xl p-2.5 text-center transition-all duration-200 flex flex-col items-center gap-1.5 hover:scale-[1.03] active:scale-[0.97]"
      style={
        selected
          ? {
              border: "1.5px solid rgba(245,158,11,0.55)",
              background: "rgba(245,158,11,0.10)",
              boxShadow: "0 0 16px rgba(245,158,11,0.10)",
            }
          : {
              border: "1.5px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.03)",
            }
      }
    >
      {selected && (
        <div
          className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center"
          style={{ background: "#F59E0B" }}
        >
          <span className="text-white text-[8px] font-bold">✓</span>
        </div>
      )}
      <div className="relative w-10 h-10">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain"
          unoptimized
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.style.display = "none";
            const parent = img.parentElement;
            if (parent)
              parent.innerHTML = `<span class="flex items-center justify-center w-full h-full text-2xl">${product.emoji || "📦"}</span>`;
          }}
        />
      </div>
      <p
        className="text-[11px] font-semibold leading-tight text-center line-clamp-2"
        style={{
          color: selected ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)",
        }}
      >
        {product.name}
      </p>
      <p className="text-[10px] font-bold text-amber-400">
        ${product.price}/wk
      </p>
    </button>
  );
}

const TABS = [
  { key: "desk" as const, label: "Desks" },
  { key: "chair" as const, label: "Chairs" },
  { key: "accessories" as const, label: "Add-ons" },
];

export default function ProductPanel({
  activeCategory,
  onCategoryChange,
  state,
  onSelectDesk,
  onSelectChair,
  onToggleAccessory,
}: Props) {
  const isSelected = (p: Product) => {
    if (p.category === "desk") return state.desk?.id === p.id;
    if (p.category === "chair") return state.chair?.id === p.id;
    return state.accessories.some((a) => a.id === p.id);
  };

  const handleClick = (p: Product) => {
    if (p.category === "desk") onSelectDesk(p);
    else if (p.category === "chair") onSelectChair(p);
    else onToggleAccessory(p);
  };

  return (
    <div
      className="flex flex-col h-full border-r"
      style={{
        background: "#0C0C18",
        borderColor: "rgba(255,255,255,0.05)",
      }}
    >
      {/* Header */}
      <div
        className="px-4 pt-5 pb-4 border-b"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <h2 className="text-sm font-bold text-white tracking-tight">
          Build Your Setup
        </h2>
        <p
          className="text-xs mt-0.5"
          style={{ color: "rgba(255,255,255,0.30)" }}
        >
          Gear delivered same-day in Bali
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 p-3">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onCategoryChange(tab.key)}
            className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
            style={
              activeCategory === tab.key
                ? { background: "#F59E0B", color: "white" }
                : {
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.40)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {activeCategory === "accessories" ? (
          <div className="grid grid-cols-2 gap-2 pt-1">
            {ACCESSORIES.map((p) => (
              <AccessoryCard
                key={p.id}
                product={p}
                selected={isSelected(p)}
                onClick={() => handleClick(p)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2.5 pt-1">
            {(activeCategory === "desk" ? DESKS : CHAIRS).map((p) => (
              <BigCard
                key={p.id}
                product={p}
                selected={isSelected(p)}
                onClick={() => handleClick(p)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
