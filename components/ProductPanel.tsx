'use client';

import Image from 'next/image';
import type { Product, WorkspaceState } from '@/types';
import { DESKS, CHAIRS, ACCESSORIES } from '@/data/products';

interface Props {
  activeCategory: 'desk' | 'chair' | 'accessories';
  onCategoryChange: (c: 'desk' | 'chair' | 'accessories') => void;
  state: WorkspaceState;
  onSelectDesk: (d: Product) => void;
  onSelectChair: (c: Product) => void;
  onToggleAccessory: (a: Product) => void;
}

function ProductCard({
  product,
  selected,
  isToggle,
  onClick,
}: {
  product: Product;
  selected: boolean;
  isToggle: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center gap-3 w-full p-3 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
        selected
          ? 'border-amber-500 bg-amber-50 shadow-md shadow-amber-100'
          : 'border-stone-200 bg-white hover:border-amber-300 hover:shadow-sm'
      }`}
    >
      {/* Badge */}
      {product.badge && (
        <span className="absolute -top-2 -right-1 z-10 text-[9px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full shadow">
          {product.badge}
        </span>
      )}

      {/* Selected check */}
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold z-10">
          {isToggle ? '✓' : '●'}
        </div>
      )}

      {/* Image */}
      <div className="relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-stone-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          unoptimized
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.style.display = 'none';
            const parent = img.parentElement;
            if (parent) {
              parent.innerHTML = `<span class="flex items-center justify-center w-full h-full text-2xl">${product.emoji || '📦'}</span>`;
            }
          }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-stone-800 text-sm leading-tight truncate">
          {product.name}
        </p>
        <p className="text-xs text-stone-500 mt-0.5 leading-tight line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-amber-600 font-bold text-sm">${product.price}/wk</span>
          {product.priceOriginal && (
            <span className="text-stone-400 text-xs line-through">
              ${product.priceOriginal}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

const TABS = [
  { key: 'desk' as const, label: '🪑 Desks', count: DESKS.length },
  { key: 'chair' as const, label: '💺 Chairs', count: CHAIRS.length },
  { key: 'accessories' as const, label: '✦ Add-ons', count: ACCESSORIES.length },
];

export default function ProductPanel({
  activeCategory,
  onCategoryChange,
  state,
  onSelectDesk,
  onSelectChair,
  onToggleAccessory,
}: Props) {
  const products =
    activeCategory === 'desk'
      ? DESKS
      : activeCategory === 'chair'
      ? CHAIRS
      : ACCESSORIES;

  const isSelected = (p: Product) => {
    if (p.category === 'desk') return state.desk?.id === p.id;
    if (p.category === 'chair') return state.chair?.id === p.id;
    return state.accessories.some((a) => a.id === p.id);
  };

  const handleClick = (p: Product) => {
    if (p.category === 'desk') onSelectDesk(p);
    else if (p.category === 'chair') onSelectChair(p);
    else onToggleAccessory(p);
  };

  return (
    <div className="flex flex-col h-full bg-stone-50 border-r border-stone-200">
      {/* Header */}
      <div className="px-4 pt-5 pb-3">
        <h2 className="text-base font-bold text-stone-800">Build Your Setup</h2>
        <p className="text-xs text-stone-500 mt-0.5">Pick what you need, see it appear live</p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1 px-3 pb-3">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onCategoryChange(tab.key)}
            className={`flex-1 py-1.5 px-1 rounded-lg text-xs font-semibold transition-all duration-150 ${
              activeCategory === tab.key
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product list */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2">
        {activeCategory === 'accessories' && (
          <p className="text-[11px] text-stone-400 font-medium uppercase tracking-wider px-1 pt-1">
            Tap to add / remove
          </p>
        )}
        {activeCategory !== 'accessories' && (
          <p className="text-[11px] text-stone-400 font-medium uppercase tracking-wider px-1 pt-1">
            Select one option
          </p>
        )}
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            selected={isSelected(p)}
            isToggle={p.category === 'accessory'}
            onClick={() => handleClick(p)}
          />
        ))}
      </div>
    </div>
  );
}
