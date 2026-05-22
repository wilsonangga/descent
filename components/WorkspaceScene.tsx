'use client';

import Image from 'next/image';
import type { WorkspaceState, Product } from '@/types';

interface Props {
  state: WorkspaceState;
}

function SceneItem({
  src,
  alt,
  style,
  className = '',
  emoji,
}: {
  src?: string;
  alt: string;
  style: React.CSSProperties;
  className?: string;
  emoji?: string;
}) {
  return (
    <div
      className={`absolute transition-all duration-500 ease-out ${className}`}
      style={style}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain drop-shadow-lg"
          unoptimized
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = 'none';
            const parent = el.parentElement;
            if (parent) parent.dataset.fallback = 'true';
          }}
        />
      ) : (
        <span className="flex items-center justify-center w-full h-full text-5xl">
          {emoji}
        </span>
      )}
    </div>
  );
}

export default function WorkspaceScene({ state }: Props) {
  const { desk, chair, accessories } = state;

  const hasItem = (id: string) => accessories.some((a) => a.id === id);
  const getItem = (id: string): Product | undefined =>
    accessories.find((a) => a.id === id);

  const monitors = accessories.filter((a) =>
    ['monitor-24', 'monitor-27-4k'].includes(a.id)
  );
  const hasKeyboard = hasItem('keyboard');
  const hasMouse = hasItem('mouse');
  const hasLamp = hasItem('lamp');
  const hasWebcam = hasItem('webcam');
  const hasCoffee = hasItem('coffee');
  const hasPlant = hasItem('plant');

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl select-none">
      {/* ── ROOM BACKGROUND ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5EDE0] via-[#EFE3D0] to-[#D4B896]" />

      {/* Wall texture / tropical accent */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#C8A86B] to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-[#7BAE7F] to-transparent rounded-full blur-3xl" />
      </div>

      {/* ── WALL SECTION (top 55%) ── */}
      <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-[#FBF4EB] to-[#F0E5D0]" />

      {/* Window light effect */}
      <div
        className="absolute top-2 left-1/2 -translate-x-1/2 w-40 h-28 opacity-30 rounded-b-xl"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,241,200,0.8) 0%, transparent 100%)',
          boxShadow: '0 20px 60px rgba(255,220,100,0.3)',
        }}
      />

      {/* ── FLOOR SECTION (bottom 45%) ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-[46%]"
        style={{
          background:
            'linear-gradient(180deg, #C9A880 0%, #B8956A 50%, #A07850 100%)',
        }}
      />

      {/* Floor grain */}
      <div className="absolute inset-x-0 bottom-0 h-[46%] opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.05) 40px, rgba(0,0,0,0.05) 41px)',
        }}
      />

      {/* Wall / floor divider */}
      <div className="absolute inset-x-0 h-[3px] bg-[#C4A07A]/60" style={{ top: '54%' }} />

      {/* ── PLANT (left side, floor) ── */}
      {hasPlant && (
        <div
          className="absolute transition-all duration-700 ease-out"
          style={{
            left: '3%',
            bottom: '14%',
            width: '10%',
            height: '26%',
            animation: 'popIn 0.5s ease-out',
          }}
        >
          <span className="flex items-end justify-center w-full h-full text-6xl pb-2">🌿</span>
        </div>
      )}

      {/* ── DESK UNIT ── */}
      {/* Desk legs */}
      <div
        className="absolute"
        style={{
          left: '14%',
          bottom: '14%',
          width: '3%',
          height: '12%',
          background: 'linear-gradient(180deg, #5a3e28 0%, #3d2918 100%)',
          borderRadius: '3px',
        }}
      />
      <div
        className="absolute"
        style={{
          right: '14%',
          bottom: '14%',
          width: '3%',
          height: '12%',
          background: 'linear-gradient(180deg, #5a3e28 0%, #3d2918 100%)',
          borderRadius: '3px',
        }}
      />

      {/* Desk surface */}
      <div
        className="absolute transition-all duration-500"
        style={{
          left: '12%',
          bottom: '24%',
          width: '76%',
          height: '18%',
          borderRadius: '8px 8px 4px 4px',
          background: desk?.id === 'mechanical-desk'
            ? 'linear-gradient(180deg, #8B6914 0%, #7A5C10 60%, #5C450D 100%)'
            : 'linear-gradient(180deg, #4A3728 0%, #3D2E1F 60%, #2E2216 100%)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      >
        {/* Desk surface highlight */}
        <div
          className="absolute top-0 inset-x-4 h-[3px] rounded-full opacity-30"
          style={{ background: 'rgba(255,255,255,0.6)' }}
        />

        {/* Cable management slot */}
        <div className="absolute bottom-2 right-6 w-8 h-1 bg-black/20 rounded-full" />

        {/* Electric adjustment label */}
        {desk?.id === 'electric-desk' && (
          <div className="absolute top-2 right-3 text-[8px] text-white/40 font-mono tracking-wider">
            ▲ ▼
          </div>
        )}
      </div>

      {/* ── ITEMS ON DESK ── */}

      {/* Coffee machine - left side of desk */}
      {hasCoffee && (
        <div
          className="absolute transition-all duration-500"
          style={{
            left: '15%',
            bottom: '37%',
            width: '9%',
            height: '14%',
            animation: 'popIn 0.4s ease-out',
          }}
        >
          <Image
            src="https://strapi.monis.rent/uploads/Nespresso_Essenza_3_9f9b8a04a2.jpg"
            alt="Coffee Machine"
            fill
            className="object-contain drop-shadow-xl"
            unoptimized
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              const p = (e.currentTarget as HTMLImageElement).parentElement;
              if (p) p.innerHTML = '<span class="flex items-end justify-center w-full h-full text-4xl">☕</span>';
            }}
          />
        </div>
      )}

      {/* Lamp */}
      {hasLamp && (
        <div
          className="absolute transition-all duration-500"
          style={{
            right: '16%',
            bottom: '38%',
            width: '7%',
            height: '20%',
            animation: 'popIn 0.4s ease-out',
          }}
        >
          <Image
            src="https://strapi.monis.rent/uploads/Xiaomi_Mi_Led_Desk_Lamp_1_S_4_928d77715a.jpg"
            alt="Desk Lamp"
            fill
            className="object-contain drop-shadow-xl"
            unoptimized
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              const p = (e.currentTarget as HTMLImageElement).parentElement;
              if (p) p.innerHTML = '<span class="flex items-end justify-center w-full h-full text-4xl">💡</span>';
            }}
          />
          {/* Lamp glow effect */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-300/20 rounded-full blur-xl" />
        </div>
      )}

      {/* Monitors */}
      {monitors.length > 0 && (
        <>
          {monitors.map((monitor, idx) => {
            const totalMonitors = monitors.length;
            let leftPos = '35%';
            if (totalMonitors === 1) leftPos = '35%';
            else if (idx === 0) leftPos = '22%';
            else leftPos = '50%';

            return (
              <div
                key={monitor.id}
                className="absolute transition-all duration-500"
                style={{
                  left: leftPos,
                  bottom: '36%',
                  width: totalMonitors === 1 ? '28%' : '24%',
                  height: totalMonitors === 1 ? '30%' : '26%',
                  animation: 'popIn 0.45s ease-out',
                }}
              >
                <Image
                  src={monitor.image}
                  alt={monitor.name}
                  fill
                  className="object-contain drop-shadow-2xl"
                  unoptimized
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    const p = (e.currentTarget as HTMLImageElement).parentElement;
                    if (p) p.innerHTML = '<span class="flex items-end justify-center w-full h-full text-5xl">🖥️</span>';
                  }}
                />
                {/* Webcam on top of first monitor */}
                {idx === 0 && hasWebcam && (
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8"
                    style={{ animation: 'popIn 0.3s ease-out' }}
                  >
                    <Image
                      src="https://strapi.monis.rent/uploads/Logitech_4_K_Webcam_5_f91e71c14c.jpg"
                      alt="Webcam"
                      fill
                      className="object-contain drop-shadow-md"
                      unoptimized
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                        const p = (e.currentTarget as HTMLImageElement).parentElement;
                        if (p) p.innerHTML = '📷';
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}

      {/* Keyboard */}
      {hasKeyboard && (
        <div
          className="absolute transition-all duration-500"
          style={{
            left: '28%',
            bottom: '26%',
            width: '28%',
            height: '8%',
            animation: 'popIn 0.4s ease-out',
          }}
        >
          <Image
            src="https://strapi.monis.rent/uploads/Logitech_MX_keys_1_9977480ae1.jpg"
            alt="Keyboard"
            fill
            className="object-contain drop-shadow-lg"
            unoptimized
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              const p = (e.currentTarget as HTMLImageElement).parentElement;
              if (p) p.innerHTML = '<span class="flex items-end justify-center w-full h-full text-4xl">⌨️</span>';
            }}
          />
        </div>
      )}

      {/* Mouse */}
      {hasMouse && (
        <div
          className="absolute transition-all duration-500"
          style={{
            left: hasMouse && hasKeyboard ? '58%' : '50%',
            bottom: '26%',
            width: '6%',
            height: '9%',
            animation: 'popIn 0.4s ease-out',
          }}
        >
          <Image
            src="https://strapi.monis.rent/uploads/Logitech_S3_6_4cf1e523b8.jpg"
            alt="Mouse"
            fill
            className="object-contain drop-shadow-lg"
            unoptimized
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              const p = (e.currentTarget as HTMLImageElement).parentElement;
              if (p) p.innerHTML = '<span class="flex items-end justify-center w-full h-full text-3xl">🖱️</span>';
            }}
          />
        </div>
      )}

      {/* ── DESK SELECTION INDICATOR ── */}
      {!desk && (
        <div className="absolute" style={{ left: '12%', bottom: '24%', width: '76%', height: '18%' }}>
          <div className="w-full h-full border-2 border-dashed border-[#C4A07A]/60 rounded-lg flex items-center justify-center">
            <span className="text-[#9A7A5A] text-sm font-medium">Choose your desk ↓</span>
          </div>
        </div>
      )}

      {/* ── CHAIR ── */}
      {chair ? (
        <div
          className="absolute transition-all duration-500"
          style={{
            left: '37%',
            bottom: '2%',
            width: '26%',
            height: '22%',
            animation: 'slideUp 0.5s ease-out',
          }}
        >
          <Image
            src={chair.image}
            alt={chair.name}
            fill
            className="object-contain drop-shadow-2xl"
            unoptimized
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              const p = (e.currentTarget as HTMLImageElement).parentElement;
              if (p) p.innerHTML = '<span class="flex items-end justify-center w-full h-full text-6xl">🪑</span>';
            }}
          />
        </div>
      ) : (
        <div
          className="absolute border-2 border-dashed border-[#C4A07A]/60 rounded-full flex items-center justify-center"
          style={{ left: '38%', bottom: '2%', width: '24%', height: '20%' }}
        >
          <span className="text-[#9A7A5A] text-xs font-medium">Choose chair ↓</span>
        </div>
      )}

      {/* ── EMPTY DESK HINT ── */}
      {desk && monitors.length === 0 && !hasKeyboard && !hasMouse && !hasLamp && (
        <div
          className="absolute text-[#9A7A5A]/70 text-sm font-medium pointer-events-none"
          style={{ left: '50%', bottom: '36%', transform: 'translateX(-50%)' }}
        >
          ✦ Add accessories to fill your desk
        </div>
      )}

      {/* ── DESK BRAND BADGE ── */}
      {desk && (
        <div
          className="absolute bottom-[42%] text-[10px] font-semibold tracking-widest uppercase opacity-30"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            color: desk.id === 'mechanical-desk' ? '#fff' : '#ccc',
          }}
        >
          {desk.id === 'electric-desk' ? '⚡ ELECTRIC' : '◈ MECHANICAL'}
        </div>
      )}
    </div>
  );
}
