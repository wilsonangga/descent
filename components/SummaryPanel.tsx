'use client';

import type { WorkspaceState } from '@/types';

interface Props {
  state: WorkspaceState;
  total: number;
  onRent: () => void;
}

export default function SummaryPanel({ state, total, onRent }: Props) {
  const { desk, chair, accessories } = state;
  const hasSetup = desk && chair;
  const itemCount = (desk ? 1 : 0) + (chair ? 1 : 0) + accessories.length;

  return (
    <div className="flex flex-col h-full bg-white border-l border-stone-200">
      {/* Header */}
      <div className="px-4 pt-5 pb-3 border-b border-stone-100">
        <h2 className="text-base font-bold text-stone-800">Your Setup</h2>
        <p className="text-xs text-stone-500 mt-0.5">
          {itemCount === 0
            ? 'Nothing selected yet'
            : `${itemCount} item${itemCount > 1 ? 's' : ''} selected`}
        </p>
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {/* Desk */}
        <div className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 pt-1">
          Desk
        </div>
        {desk ? (
          <div className="flex items-center justify-between py-1.5">
            <span className="text-sm text-stone-700 font-medium">{desk.name}</span>
            <span className="text-sm font-bold text-amber-600">${desk.price}/wk</span>
          </div>
        ) : (
          <p className="text-xs text-stone-400 italic py-1">Not selected</p>
        )}

        {/* Chair */}
        <div className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 pt-1">
          Chair
        </div>
        {chair ? (
          <div className="flex items-center justify-between py-1.5">
            <span className="text-sm text-stone-700 font-medium">{chair.name}</span>
            <span className="text-sm font-bold text-amber-600">${chair.price}/wk</span>
          </div>
        ) : (
          <p className="text-xs text-stone-400 italic py-1">Not selected</p>
        )}

        {/* Accessories */}
        {accessories.length > 0 && (
          <>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 pt-1">
              Accessories
            </div>
            {accessories.map((a) => (
              <div key={a.id} className="flex items-center justify-between py-1">
                <span className="text-xs text-stone-600">
                  {a.emoji} {a.name}
                </span>
                <span className="text-xs font-semibold text-amber-600">${a.price}/wk</span>
              </div>
            ))}
          </>
        )}

        {/* Empty state */}
        {itemCount === 0 && (
          <div className="py-6 text-center text-stone-400">
            <div className="text-4xl mb-2">🏝️</div>
            <p className="text-sm font-medium">Start building your setup</p>
            <p className="text-xs mt-1">Pick a desk and chair to begin</p>
          </div>
        )}
      </div>

      {/* Total + CTA */}
      <div className="px-4 pb-5 pt-3 border-t border-stone-100 space-y-3">
        {/* Delivery note */}
        <div className="flex items-start gap-2 bg-green-50 rounded-lg px-3 py-2">
          <span className="text-sm">⚡</span>
          <p className="text-xs text-green-700 font-medium leading-tight">
            Same-day delivery available in Bali
          </p>
        </div>

        {/* Price breakdown */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs text-stone-500">
            <span>Weekly total</span>
            <span className="font-semibold text-stone-700">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-stone-500">
            <span>Monthly total</span>
            <span className="font-semibold text-stone-700">${(total * 4 * 0.75).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-green-600">
            <span>Monthly savings (25%)</span>
            <span className="font-semibold">-${(total * 4 * 0.25).toFixed(2)}</span>
          </div>
        </div>

        {/* Total price */}
        <div className="flex justify-between items-center pt-2 border-t border-stone-100">
          <span className="font-bold text-stone-800">Total</span>
          <div className="text-right">
            <p className="font-bold text-xl text-amber-600">${total.toFixed(2)}</p>
            <p className="text-xs text-stone-400">per week</p>
          </div>
        </div>

        {/* Rent CTA */}
        <button
          onClick={onRent}
          disabled={!hasSetup}
          className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 ${
            hasSetup
              ? 'bg-amber-500 hover:bg-amber-400 text-white shadow-lg shadow-amber-200 hover:shadow-amber-300 hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          {hasSetup ? '🏄 Rent My Setup' : 'Select desk & chair first'}
        </button>

        {/* Trust signals */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <span className="text-[10px] text-stone-400">✓ Free delivery</span>
          <span className="text-[10px] text-stone-400">✓ Cancel anytime</span>
          <span className="text-[10px] text-stone-400">✓ Insured gear</span>
        </div>
      </div>
    </div>
  );
}
