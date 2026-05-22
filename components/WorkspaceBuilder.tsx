'use client';

import { useState, useCallback } from 'react';
import type { Product, WorkspaceState } from '@/types';
import { DESKS, CHAIRS } from '@/data/products';
import WorkspaceScene from './WorkspaceScene';
import ProductPanel from './ProductPanel';
import SummaryPanel from './SummaryPanel';
import CheckoutView from './CheckoutView';

export default function WorkspaceBuilder() {
  const [state, setState] = useState<WorkspaceState>({
    desk: DESKS[0],
    chair: CHAIRS[0],
    accessories: [],
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'desk' | 'chair' | 'accessories'>('desk');

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
    <div className="flex flex-col h-screen bg-stone-100">
      {/* ── TOP BAR ── */}
      <header className="shrink-0 h-14 bg-white border-b border-stone-200 flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-3">
          <a href="https://monis.rent" target="_blank" rel="noopener noreferrer">
            <span className="font-black text-lg tracking-tight text-stone-800">
              monis<span className="text-amber-500">.rent</span>
            </span>
          </a>
          <span className="text-stone-300">·</span>
          <span className="text-sm font-medium text-stone-500">Workspace Builder</span>
        </div>

        {/* Quick stats */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:flex items-center gap-1.5 text-sm text-stone-500">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Same-day delivery in Bali
          </span>
          <div className="flex items-center gap-2 bg-amber-50 rounded-xl px-4 py-1.5 border border-amber-200">
            <span className="text-xs text-stone-500">Total</span>
            <span className="font-black text-amber-600">${total.toFixed(2)}/wk</span>
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
        <div className="flex-1 flex flex-col min-w-0 p-4 gap-2">
          {/* Scene title */}
          <div className="flex items-center justify-between shrink-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
              Live Preview
            </p>
            <p className="text-xs text-stone-400">
              {state.desk?.name ?? 'No desk'} · {state.chair?.name ?? 'No chair'} ·{' '}
              {state.accessories.length} accessor{state.accessories.length !== 1 ? 'ies' : 'y'}
            </p>
          </div>

          {/* Scene container */}
          <div className="flex-1 min-h-0 rounded-2xl overflow-hidden shadow-xl border border-stone-200 relative"
            style={{ minHeight: '300px' }}
          >
            <WorkspaceScene state={state} />
          </div>

          {/* Quick-add accessory chips */}
          <div className="shrink-0 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-stone-400 shrink-0 font-medium">Quick add:</span>
            {[
              { id: 'monitor-24', label: '🖥️ Monitor' },
              { id: 'lamp', label: '💡 Lamp' },
              { id: 'keyboard', label: '⌨️ Keyboard' },
              { id: 'mouse', label: '🖱️ Mouse' },
              { id: 'plant', label: '🌿 Plant' },
              { id: 'coffee', label: '☕ Coffee' },
            ].map(({ id, label }) => {
              const isActive = state.accessories.some((a) => a.id === id);
              // Find the product
              const product =
                [...DESKS, ...CHAIRS].find((p) => p.id === id) ??
                state.accessories.find((a) => a.id === id);

              return (
                <button
                  key={id}
                  onClick={() => {
                    // Import needed product
                    import('@/data/products').then(({ ACCESSORIES }) => {
                      const p = ACCESSORIES.find((a) => a.id === id);
                      if (p) toggleAccessory(p);
                    });
                  }}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                    isActive
                      ? 'bg-amber-500 border-amber-500 text-white'
                      : 'bg-white border-stone-300 text-stone-600 hover:border-amber-400 hover:text-amber-600'
                  }`}
                >
                  {isActive ? '✓ ' : '+ '}{label}
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
