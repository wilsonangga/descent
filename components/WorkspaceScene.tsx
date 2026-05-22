"use client";

import Image from "next/image";
import type { WorkspaceState } from "@/types";

interface Props {
  state: WorkspaceState;
}

function imgErr(emoji: string) {
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget as HTMLImageElement;
    img.style.display = "none";
    const p = img.parentElement;
    if (p)
      p.insertAdjacentHTML(
        "beforeend",
        `<span class="absolute inset-0 flex items-end justify-center pb-1 text-4xl pointer-events-none">${emoji}</span>`,
      );
  };
}

export default function WorkspaceScene({ state }: Props) {
  const { desk, chair, accessories } = state;

  const hasItem = (id: string) => accessories.some((a) => a.id === id);
  const monitors = accessories.filter((a) =>
    ["monitor-24", "monitor-27-4k"].includes(a.id),
  );
  const hasKeyboard = hasItem("keyboard");
  const hasMouse = hasItem("mouse");
  const hasLamp = hasItem("lamp");
  const hasWebcam = hasItem("webcam");
  const hasCoffee = hasItem("coffee");
  const hasPlant = hasItem("plant");

  const deskColor =
    desk?.id === "mechanical-desk"
      ? "linear-gradient(180deg,#7C5C1A 0%,#6A4E15 55%,#4A370E 100%)"
      : "linear-gradient(180deg,#23204A 0%,#1C1A3E 55%,#131130 100%)";

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      style={{ background: "linear-gradient(180deg,#0B0920 0%,#100D26 100%)" }}
    >
      {/* ── DEEP BACKGROUND GLOW ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%,rgba(80,60,180,0.18) 0%,transparent 70%)",
        }}
      />

      {/* ── WALL ── */}
      <div
        className="absolute inset-x-0 top-0 h-[56%]"
        style={{
          background:
            "linear-gradient(180deg,#13103A 0%,#0F0D2E 70%,#0D0B28 100%)",
        }}
      />

      {/* Subtle wall horizontal line texture */}
      <div
        className="absolute inset-x-0 top-0 h-[56%] opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(255,255,255,1) 28px,rgba(255,255,255,1) 29px)",
        }}
      />

      {/* ── MONITOR GLOW — ambient light cast on wall ── */}
      {monitors.length > 0 && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: "15%",
            right: "15%",
            bottom: "30%",
            height: "44%",
            background:
              "radial-gradient(ellipse 70% 80% at 50% 70%,rgba(60,100,255,0.10) 0%,transparent 70%)",
            filter: "blur(14px)",
            animation: "fadeIn 0.8s ease-out",
          }}
        />
      )}

      {/* ── LAMP WARM GLOW ── */}
      {hasLamp && (
        <div
          className="absolute pointer-events-none"
          style={{
            right: "8%",
            bottom: "28%",
            width: "34%",
            height: "50%",
            background:
              "radial-gradient(ellipse at 85% 60%,rgba(255,190,50,0.13) 0%,transparent 60%)",
            filter: "blur(12px)",
            animation: "fadeIn 0.6s ease-out",
          }}
        />
      )}

      {/* ── WALL / FLOOR DIVIDE ── */}
      <div
        className="absolute inset-x-0 h-px"
        style={{ top: "56%", background: "rgba(255,255,255,0.04)" }}
      />

      {/* ── FLOOR ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-[44%]"
        style={{
          background:
            "linear-gradient(180deg,#1D1108 0%,#150C05 60%,#0E0803 100%)",
        }}
      />

      {/* Floor plank grain */}
      <div
        className="absolute inset-x-0 bottom-0 h-[44%] opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(92deg,transparent,transparent 70px,rgba(255,200,80,1) 70px,rgba(255,200,80,1) 71px)",
        }}
      />

      {/* ── PLANT ── */}
      {hasPlant && (
        <div
          className="absolute"
          style={{
            left: "2%",
            bottom: "14%",
            width: "9%",
            height: "30%",
            animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <span className="flex items-end justify-center w-full h-full text-5xl pb-1">
            🌿
          </span>
        </div>
      )}

      {/* ── DESK LEGS ── */}
      {desk && (
        <>
          <div
            className="absolute"
            style={{
              left: "17%",
              bottom: "14.5%",
              width: "2.5%",
              height: "10%",
              background:
                "linear-gradient(180deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "3px",
            }}
          />
          <div
            className="absolute"
            style={{
              right: "17%",
              bottom: "14.5%",
              width: "2.5%",
              height: "10%",
              background:
                "linear-gradient(180deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "3px",
            }}
          />
        </>
      )}

      {/* ── DESK SURFACE ── */}
      <div
        className="absolute transition-all duration-500"
        style={{
          left: "14%",
          bottom: "23%",
          width: "72%",
          height: "16%",
          borderRadius: "8px 8px 4px 4px",
          background: desk ? deskColor : "rgba(255,255,255,0.04)",
          boxShadow: desk
            ? "0 12px 40px rgba(0,0,0,0.7),0 2px 8px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.12)"
            : "none",
          border: desk ? "none" : "1px dashed rgba(255,255,255,0.10)",
        }}
      >
        {desk ? (
          <>
            <div
              className="absolute top-0 inset-x-6 h-px rounded-full"
              style={{ background: "rgba(255,255,255,0.14)" }}
            />
            <div className="absolute bottom-2 right-4 text-[8px] font-mono tracking-widest opacity-20 text-white">
              {desk.id === "electric-desk" ? "⚡ ELEC" : "◈ MECH"}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white/20 text-xs font-medium">
              Choose a desk
            </span>
          </div>
        )}
      </div>

      {/* Desk front-face depth strip */}
      {desk && (
        <div
          className="absolute"
          style={{
            left: "14%",
            width: "72%",
            bottom: "21.5%",
            height: "1.5%",
            background: "rgba(0,0,0,0.45)",
            borderRadius: "0 0 4px 4px",
          }}
        />
      )}

      {/* ── COFFEE ── */}
      {hasCoffee && (
        <div
          className="absolute"
          style={{
            left: "16%",
            bottom: "37.5%",
            width: "9%",
            height: "14%",
            animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: "80%",
              height: "5px",
              background:
                "radial-gradient(ellipse,rgba(0,0,0,0.7) 0%,transparent 70%)",
              filter: "blur(2px)",
            }}
          />
          <Image
            src="https://strapi.monis.rent/uploads/Nespresso_Essenza_3_9f9b8a04a2.jpg"
            alt="Coffee Machine"
            fill
            className="object-contain drop-shadow-2xl"
            unoptimized
            onError={imgErr("☕")}
          />
        </div>
      )}

      {/* ── LAMP ── */}
      {hasLamp && (
        <div
          className="absolute"
          style={{
            right: "17%",
            bottom: "36.5%",
            width: "7%",
            height: "22%",
            animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: "100%",
              height: "5px",
              background:
                "radial-gradient(ellipse,rgba(0,0,0,0.7) 0%,transparent 70%)",
              filter: "blur(2px)",
            }}
          />
          <Image
            src="https://strapi.monis.rent/uploads/Xiaomi_Mi_Led_Desk_Lamp_1_S_4_928d77715a.jpg"
            alt="Desk Lamp"
            fill
            className="object-contain drop-shadow-2xl"
            unoptimized
            onError={imgErr("💡")}
          />
        </div>
      )}

      {/* ── MONITORS ── */}
      {monitors.map((monitor, idx) => {
        const total = monitors.length;
        const leftPct = total === 1 ? 34 : idx === 0 ? 21 : 51;
        const wPct = total === 1 ? 30 : 25;
        const hPct = total === 1 ? 33 : 28;
        return (
          <div
            key={monitor.id}
            className="absolute transition-all duration-500"
            style={{
              left: `${leftPct}%`,
              bottom: "37%",
              width: `${wPct}%`,
              height: `${hPct}%`,
              animation: "popIn 0.45s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            {/* Ground shadow on desk */}
            <div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full"
              style={{
                width: "60%",
                height: "8px",
                background:
                  "radial-gradient(ellipse,rgba(0,0,0,0.8) 0%,transparent 70%)",
                filter: "blur(4px)",
              }}
            />
            <Image
              src={monitor.image}
              alt={monitor.name}
              fill
              className="object-contain drop-shadow-2xl"
              unoptimized
              onError={imgErr("🖥️")}
            />
            {idx === 0 && hasWebcam && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-9 h-7"
                style={{ animation: "popIn 0.3s ease-out" }}
              >
                <Image
                  src="https://strapi.monis.rent/uploads/Logitech_4_K_Webcam_5_f91e71c14c.jpg"
                  alt="Webcam"
                  fill
                  className="object-contain"
                  unoptimized
                  onError={imgErr("📷")}
                />
              </div>
            )}
          </div>
        );
      })}

      {/* ── KEYBOARD ── */}
      {hasKeyboard && (
        <div
          className="absolute"
          style={{
            left: "27%",
            bottom: "25.5%",
            width: "30%",
            height: "8%",
            animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: "90%",
              height: "6px",
              background:
                "radial-gradient(ellipse,rgba(0,0,0,0.9) 0%,transparent 70%)",
              filter: "blur(3px)",
            }}
          />
          <Image
            src="https://strapi.monis.rent/uploads/Logitech_MX_keys_1_9977480ae1.jpg"
            alt="Keyboard"
            fill
            className="object-contain drop-shadow-xl"
            unoptimized
            onError={imgErr("⌨️")}
          />
        </div>
      )}

      {/* ── MOUSE ── */}
      {hasMouse && (
        <div
          className="absolute"
          style={{
            left: hasKeyboard ? "59%" : "50%",
            bottom: "25.5%",
            width: "7%",
            height: "10%",
            animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: "85%",
              height: "5px",
              background:
                "radial-gradient(ellipse,rgba(0,0,0,0.9) 0%,transparent 70%)",
              filter: "blur(2px)",
            }}
          />
          <Image
            src="https://strapi.monis.rent/uploads/Logitech_S3_6_4cf1e523b8.jpg"
            alt="Mouse"
            fill
            className="object-contain drop-shadow-xl"
            unoptimized
            onError={imgErr("🖱️")}
          />
        </div>
      )}

      {/* ── EMPTY DESK HINT ── */}
      {desk &&
        monitors.length === 0 &&
        !hasKeyboard &&
        !hasMouse &&
        !hasLamp && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: "50%",
              bottom: "37%",
              transform: "translateX(-50%)",
              animation: "fadeIn 0.5s ease-out",
            }}
          >
            <p className="text-white/20 text-xs font-medium whitespace-nowrap tracking-wide">
              ✦ Add accessories above
            </p>
          </div>
        )}

      {/* ── NO DESK HINT ── */}
      {!desk && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ bottom: "30%" }}
        >
          <div className="text-center">
            <p className="text-3xl mb-2">🏝️</p>
            <p className="text-white/25 text-sm font-medium">
              Choose a desk to start
            </p>
          </div>
        </div>
      )}

      {/* ── CHAIR ── */}
      {chair ? (
        <div
          className="absolute"
          style={{
            left: "37%",
            bottom: "1%",
            width: "26%",
            height: "23%",
            animation: "slideUp 0.5s ease-out",
          }}
        >
          {/* Chair floor shadow */}
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: "75%",
              height: "14px",
              background:
                "radial-gradient(ellipse,rgba(0,0,0,0.6) 0%,transparent 70%)",
              filter: "blur(5px)",
            }}
          />
          <Image
            src={chair.image}
            alt={chair.name}
            fill
            className="object-contain drop-shadow-2xl"
            unoptimized
            onError={imgErr("🪑")}
          />
        </div>
      ) : (
        <div
          className="absolute flex items-center justify-center"
          style={{ left: "38%", bottom: "2%", width: "24%", height: "20%" }}
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center"
            style={{
              border: "1px dashed rgba(255,255,255,0.08)",
            }}
          >
            <span className="text-white/20 text-xs">Choose chair</span>
          </div>
        </div>
      )}
    </div>
  );
}
