import { useState, useEffect, useRef } from "react";
import "./App.css";

// ─────────────────────────────────────────────────────────────────
//  COLOR PALETTE  — "Blushing Rose Garden" (light, airy, feminine)
// ─────────────────────────────────────────────────────────────────
const C = {
  bg: "#FFF5F7",
  bgDeep: "#FFF0F3",
  rose: "#E8899A",
  roseDeep: "#D4697C",
  blush: "#F5C6D0",
  petalPink: "#FADADD",
  champagne: "#D4A574",
  cream: "#2D1F2B",
  creamSoft: "#4A3347",
  muted: "rgba(45,31,43,0.50)",
  mutedMid: "rgba(45,31,43,0.65)",
  border: "rgba(232,137,154,0.18)",
  borderHi: "rgba(212,165,116,0.35)",
  white: "#FFFFFF",
  shadow: "rgba(232,137,154,0.12)",
};

// ─────────────────────────────────────────────────────────────────
//  MATH UTILITIES
// ─────────────────────────────────────────────────────────────────
const clamp01 = (t) => Math.min(1, Math.max(0, t));
const invlerp = (v, a, b) => clamp01((v - a) / (b - a));
const lerp = (a, b, t) => a + (b - a) * t;
const rng = (v, i0, i1, o0, o1) => lerp(o0, o1, invlerp(v, i0, i1));
const fade = (p, s, fs, fe, e) => {
  if (p <= s || p >= e) return 0;
  if (p < fs) return rng(p, s, fs, 0, 1);
  if (p > fe) return rng(p, fe, e, 1, 0);
  return 1;
};

// ─────────────────────────────────────────────────────────────────
//  SCROLL TIMELINE
// ─────────────────────────────────────────────────────────────────
const TL = {
  heroFull: [0.0, 0.12],
  heroFade: [0.12, 0.19],

  pawRise: [0.19, 0.27],
  pawWave: [0.27, 0.52],
  pawDrop: [0.52, 0.6],
  pawOp: [0.19, 0.23, 0.52, 0.6],

  greetIn: [0.29, 0.34],
  greetOut: [0.49, 0.56],

  intro: [0.59, 0.64, 0.72, 0.75],
  vibe: [0.75, 0.79, 0.85, 0.88],
  stats: [0.88, 0.92, 0.96, 0.99],
  contact: [0.97, 1.0],
};

// ─────────────────────────────────────────────────────────────────
//  PAW SVG  — Rose / pink tones for Myra
// ─────────────────────────────────────────────────────────────────
function PawSVG({ width = 300 }) {
  return (
    <svg
      width={width}
      viewBox="0 0 300 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <defs>
        <radialGradient id="gArm" cx="40%" cy="18%" r="70%">
          <stop offset="0%" stopColor="#FCE4EC" />
          <stop offset="100%" stopColor="#F8BBD0" />
        </radialGradient>
        <radialGradient id="gPad" cx="35%" cy="28%" r="68%">
          <stop offset="0%" stopColor="#F48FB1" />
          <stop offset="100%" stopColor="#E8899A" />
        </radialGradient>
        <radialGradient id="gToe" cx="35%" cy="26%" r="65%">
          <stop offset="0%" stopColor="#F48FB1" />
          <stop offset="100%" stopColor="#EC407A" />
        </radialGradient>
        <filter id="fDrp">
          <feDropShadow dx="0" dy="16" stdDeviation="22" floodColor="rgba(232,137,154,0.35)" />
        </filter>
        <filter id="fGlw">
          <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="rgba(244,143,177,0.25)" />
        </filter>
      </defs>
      <path d="M74 460 C 66 345,70 232,78 182 C 86 138,100 114,114 102 C 128 88,172 88,186 102 C 200 114,214 138,222 182 C 230 232,234 345,226 460 Z" fill="url(#gArm)" filter="url(#fDrp)" />
      <path d="M76 460 C 68 345,72 232,80 182 C 86 148,98 120,110 107" stroke="rgba(255,255,255,0.25)" strokeWidth="7" fill="none" strokeLinecap="round" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={94 + i * 13} y1={145 + i * 18} x2={101 + i * 13} y2={172 + i * 18} stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />
      ))}
      <ellipse cx="150" cy="162" rx="64" ry="23" fill="#F8BBD0" />
      <ellipse cx="150" cy="159" rx="60" ry="18" fill="#FCE4EC" />
      <path d="M90 182 C 88 150,108 126,150 122 C 192 126,212 150,210 182 C 218 215,194 250,150 254 C 106 250,82 215,90 182 Z" fill="url(#gPad)" filter="url(#fGlw)" />
      <ellipse cx="126" cy="165" rx="19" ry="12" fill="rgba(255,255,255,0.28)" transform="rotate(-28 126 165)" />
      <ellipse cx="78" cy="122" rx="23" ry="25" fill="url(#gArm)" />
      <ellipse cx="78" cy="122" rx="19" ry="21" fill="url(#gToe)" />
      <ellipse cx="71" cy="115" rx="5.5" ry="5" fill="rgba(255,255,255,0.3)" transform="rotate(-24 71 115)" />
      <path d="M69 97 Q77 83 83 95" stroke="rgba(255,200,200,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="118" cy="95" rx="25" ry="27" fill="url(#gArm)" />
      <ellipse cx="118" cy="95" rx="21" ry="23" fill="url(#gToe)" />
      <ellipse cx="111" cy="87" rx="6.5" ry="6" fill="rgba(255,255,255,0.28)" transform="rotate(-14 111 87)" />
      <path d="M109 71 Q117 57 125 68" stroke="rgba(255,200,200,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="182" cy="95" rx="25" ry="27" fill="url(#gArm)" />
      <ellipse cx="182" cy="95" rx="21" ry="23" fill="url(#gToe)" />
      <ellipse cx="175" cy="87" rx="6.5" ry="6" fill="rgba(255,255,255,0.28)" transform="rotate(-5 175 87)" />
      <path d="M173 71 Q181 57 189 68" stroke="rgba(255,200,200,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="222" cy="122" rx="23" ry="25" fill="url(#gArm)" />
      <ellipse cx="222" cy="122" rx="19" ry="21" fill="url(#gToe)" />
      <ellipse cx="215" cy="115" rx="5.5" ry="5" fill="rgba(255,255,255,0.3)" transform="rotate(16 215 115)" />
      <path d="M212 97 Q220 83 226 95" stroke="rgba(255,200,200,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M145 182 C145 178,148 175,151 175 C154 175,156 178,156 182 C156 178,159 175,162 175 C165 175,167 178,167 182 C167 188,156 195,156 195 C156 195,145 188,145 182 Z" fill="rgba(255,255,255,0.22)" transform="translate(-3, -2) scale(0.6)" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
//  POLAROID COMPONENT  — reusable photo frame
// ─────────────────────────────────────────────────────────────────
function Polaroid({ src, caption, rotation = 0, alpha = 1, dx = 0, dy = 0, scale = 1, position = {} }) {
  return (
    <div
      className="polaroid"
      style={{
        position: "absolute",
        opacity: alpha,
        transform: `translate(${dx}px, ${dy}px) rotate(${rotation}deg) scale(${scale})`,
        willChange: "opacity, transform",
        pointerEvents: alpha > 0.1 ? "auto" : "none",
        ...position,
      }}
    >
      <div className="polaroid-inner">
        <img src={src} alt={caption} className="polaroid-img" loading="lazy" />
        <p className="polaroid-caption">{caption}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  STICKER SVG COMPONENTS
// ─────────────────────────────────────────────────────────────────
function SparkleSticker({ size = 24, color = C.champagne, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="sticker" style={style}>
      <path d="M12 0 L13.5 9 L22 12 L13.5 15 L12 24 L10.5 15 L2 12 L10.5 9 Z" fill={color} opacity="0.5" />
    </svg>
  );
}

function HeartSticker({ size = 20, color = C.rose, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="sticker" style={style}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={color} opacity="0.35" />
    </svg>
  );
}

function PawPrintSticker({ size = 18, color = C.roseDeep, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="sticker" style={style}>
      <ellipse cx="12" cy="16" rx="5" ry="4" fill={color} opacity="0.3" />
      <ellipse cx="6" cy="10" rx="2.5" ry="3" fill={color} opacity="0.3" />
      <ellipse cx="11" cy="7" rx="2.5" ry="3" fill={color} opacity="0.3" />
      <ellipse cx="17" cy="8" rx="2.5" ry="3" fill={color} opacity="0.3" />
      <ellipse cx="20" cy="12" rx="2.5" ry="3" fill={color} opacity="0.3" />
    </svg>
  );
}

function BlossomSticker({ size = 22, color = C.blush, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="sticker" style={style}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={angle} cx="12" cy="6" rx="3.5" ry="5" fill={color} opacity="0.35" transform={`rotate(${angle} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="3" fill={C.champagne} opacity="0.45" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
//  SHARED STYLE TOKENS
// ─────────────────────────────────────────────────────────────────
const eyebrow = {
  display: "block",
  fontFamily: "'Jost', system-ui, sans-serif",
  fontSize: "clamp(0.55rem, 1.1vw, 0.68rem)",
  fontWeight: 300,
  letterSpacing: "0.48em",
  textTransform: "uppercase",
  color: C.rose,
  marginBottom: "1.2rem",
  opacity: 0.85,
};
const displayLg = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)",
  fontWeight: 600,
  lineHeight: 1.08,
  letterSpacing: "-0.02em",
  color: C.cream,
  margin: 0,
};
const displayMd = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontSize: "clamp(1.8rem, 4vw, 4rem)",
  fontWeight: 300,
  lineHeight: 1.2,
  color: C.cream,
};
const bodyText = {
  fontFamily: "'Jost', system-ui, sans-serif",
  fontSize: "clamp(0.82rem, 1.7vw, 1.02rem)",
  fontWeight: 300,
  color: C.muted,
  lineHeight: 1.82,
  letterSpacing: "0.025em",
  marginTop: "1.2rem",
};

// ─────────────────────────────────────────────────────────────────
//  SECTION WRAPPER
// ─────────────────────────────────────────────────────────────────
function Section({ alpha, dy = 0, children, style = {} }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: alpha,
        transform: `translateY(${dy}px)`,
        pointerEvents: alpha > 0.05 ? "auto" : "none",
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  APP
// ─────────────────────────────────────────────────────────────────
export default function App() {
  const scrollEl = useRef(null);
  const [p, setP] = useState(0);

  // Scroll progress from container
  useEffect(() => {
    const el = scrollEl.current;
    if (!el) return;
    const handle = () => {
      const max = el.scrollHeight - el.clientHeight;
      if (max > 0) setP(clamp01(el.scrollTop / max));
    };
    el.addEventListener("scroll", handle, { passive: true });
    return () => el.removeEventListener("scroll", handle);
  }, []);

  // ── COMPUTE ALL VALUES FROM p ───────────────────────────────
  const heroAlpha = p < TL.heroFull[1] ? 1 : rng(p, TL.heroFade[0], TL.heroFade[1], 1, 0);
  const heroScale = rng(p, 0, 0.19, 1, 1.06);

  const [pRS, pRE] = TL.pawRise;
  const [pWS, pWE] = TL.pawWave;
  const [pDS, pDE] = TL.pawDrop;

  const pawTY = p < pRS ? 120 : p < pRE ? rng(p, pRS, pRE, 120, 0) : p < pDS ? 0 : p < pDE ? rng(p, pDS, pDE, 0, 120) : 120;
  const pawRX = rng(p, pRS, pRE, 22, 0);

  let pawRZ = 0, pawBob = 0;
  if (p >= pWS && p <= pWE) {
    const phase = invlerp(p, pWS, pWE) * Math.PI * 5;
    pawRZ = Math.sin(phase) * 26;
    pawBob = Math.sin(phase + Math.PI * 0.5) * 3.5;
  }

  const pawAlpha = fade(p, TL.pawOp[0], TL.pawOp[1], TL.pawOp[2], TL.pawOp[3]);
  const shadowS = rng(p, pRS, pRE, 0.2, 1);
  const shadowA = pawAlpha * rng(p, pRS, pRE, 0, 1);
  const greetAlpha = p >= TL.greetIn[0] ? fade(p, TL.greetIn[0], TL.greetIn[1], TL.greetOut[0], TL.greetOut[1]) : 0;

  const introA = fade(p, ...TL.intro);
  const vibeA = fade(p, ...TL.vibe);
  const statsA = fade(p, ...TL.stats);
  const contactA = p >= TL.contact[1] ? 1 : rng(p, TL.contact[0], TL.contact[1], 0, 1);

  const slideY = (a) => lerp(20, 0, a);

  // ── POLAROID scroll transforms (tied to section alphas) ─────
  // Paw section — baby kitten floats in from left
  const pawPhotoAlpha = fade(p, 0.28, 0.33, 0.48, 0.55);
  const pawPhotoDx = lerp(-60, 0, clamp01(pawPhotoAlpha * 1.5));

  // Intro — golden portrait slides in from right
  const introPhotoDx = lerp(50, 0, clamp01(introA * 1.5));

  // Vibe — cherry blossom photo spins in gently
  const vibePhotoRot = lerp(8, -3, clamp01(vibeA));

  // Stats — cuddle photo drifts from bottom-left
  const statsPhotoDy = lerp(40, 0, clamp01(statsA * 1.3));

  // Contact — sunset portrait parallax
  const contactPhotoDy = lerp(20, -5, clamp01(contactA));

  // Progress dot
  const dotI = p < 0.19 ? 0 : p < 0.6 ? 1 : p < 0.75 ? 2 : p < 0.88 ? 3 : p < 0.97 ? 4 : 5;

  const scrollTo = (idx) => {
    const el = scrollEl.current;
    if (!el) return;
    const targets = [0.02, 0.23, 0.63, 0.77, 0.9, 0.98];
    el.scrollTo({ top: targets[idx] * (el.scrollHeight - el.clientHeight), behavior: "smooth" });
  };

  return (
    <div
      ref={scrollEl}
      style={{
        height: "100vh",
        overflowY: "scroll",
        overflowX: "hidden",
        background: C.bg,
        scrollbarWidth: "none",
      }}
    >
      <div style={{ height: "700vh", position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {/* ══ BACKGROUND ══════════════════════════════════════════ */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `
                  radial-gradient(ellipse 120% 80% at 10% 45%, rgba(253,220,228,0.6) 0%, transparent 52%),
                  radial-gradient(ellipse 80%  90% at 90% 15%, rgba(245,198,208,0.4) 0%, transparent 52%),
                  radial-gradient(ellipse 90%  70% at 50% 95%, rgba(255,240,243,0.8) 0%, transparent 60%),
                  linear-gradient(145deg, #FFF5F7 0%, #FFF0F3 30%, #FFEEF2 65%, #FFF5F7 100%)
                `,
              }}
            />
            {[
              { w: "58vw", c: "rgba(244,143,177,0.08)", t: "2%", l: "52%", a: "blob1 13s ease-in-out infinite" },
              { w: "48vw", c: "rgba(232,137,154,0.06)", t: "50%", l: "3%", a: "blob2 17s ease-in-out infinite" },
              { w: "38vw", c: "rgba(212,165,116,0.06)", t: "20%", l: "35%", a: "blob3 10s ease-in-out infinite" },
            ].map((b, i) => (
              <div key={i} style={{ position: "absolute", width: b.w, height: b.w, borderRadius: "50%", background: `radial-gradient(circle, ${b.c} 0%, transparent 70%)`, top: b.t, left: b.l, filter: "blur(72px)", animation: b.a }} />
            ))}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 72% 72% at 50% 50%, transparent 28%, rgba(255,240,243,0.6) 100%)" }} />
          </div>

          {/* ══ PROGRESS DOTS ═══════════════════════════════════════ */}
          <nav style={{ position: "fixed", right: "clamp(12px,2vw,22px)", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 8, zIndex: 200 }}>
            {["Hero", "Paw", "Intro", "Vibe", "Stats", "Contact"].map((label, i) => (
              <div
                key={i}
                title={label}
                onClick={() => scrollTo(i)}
                style={{
                  width: 4,
                  height: i === dotI ? 16 : 4,
                  borderRadius: i === dotI ? 4 : "50%",
                  background: i === dotI ? C.roseDeep : "rgba(232,137,154,0.25)",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                  boxShadow: i === dotI ? `0 0 8px ${C.rose}80` : "none",
                }}
              />
            ))}
          </nav>

          {/* ══ CHAPTER 1 — HERO ════════════════════════════════════ */}
          <Section alpha={heroAlpha} style={{ transform: `scale(${heroScale})` }}>
            <div style={{ textAlign: "center", position: "relative" }}>

              {/* Hero background photo — sunset lounging, large + visible */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, ${lerp(-46, -54, clamp01(p / 0.19))}%) scale(1.05)`,
                width: "min(85vw, 560px)",
                height: "min(85vw, 560px)",
                borderRadius: "50%",
                overflow: "hidden",
                opacity: 0.28,
                zIndex: 0,
                pointerEvents: "none",
              }}>
                <img
                  src="/photos/sunset-lounging.jpg"
                  alt="Myra lounging"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {/* Gradient overlay for text readability */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle, rgba(255,245,247,0.25) 0%, rgba(255,240,243,0.65) 75%, rgba(255,245,247,0.9) 100%)",
                }} />
              </div>

              {/* Floating mini polaroids around hero */}
              <div className="hero-float-photo" style={{ position: "absolute", top: "-12%", right: "-18%", transform: "rotate(8deg)", opacity: 0.55, zIndex: 0 }}>
                <div className="polaroid-inner" style={{ width: 90 }}>
                  <img src="/photos/golden-portrait.jpg" alt="Myra" className="polaroid-img" style={{ height: 108 }} loading="lazy" />
                </div>
              </div>
              <div className="hero-float-photo" style={{ position: "absolute", bottom: "-20%", left: "-22%", transform: "rotate(-12deg)", opacity: 0.45, zIndex: 0 }}>
                <div className="polaroid-inner" style={{ width: 80 }}>
                  <img src="/photos/cherry-blossom.jpg" alt="Myra" className="polaroid-img" style={{ height: 96 }} loading="lazy" />
                </div>
              </div>
              <div className="hero-float-photo" style={{ position: "absolute", top: "15%", left: "-25%", transform: "rotate(-5deg)", opacity: 0.40, zIndex: 0 }}>
                <div className="polaroid-inner" style={{ width: 75 }}>
                  <img src="/photos/cuddle-closeup.jpg" alt="Myra" className="polaroid-img" style={{ height: 90 }} loading="lazy" />
                </div>
              </div>

              {/* Concentric rings */}
              {[1, 1.38, 1.76].map((sc, i) => (
                <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: "min(44vw,290px)", height: "min(44vw,290px)", transform: `translate(-50%,-50%) scale(${sc})`, borderRadius: "50%", border: `1px solid rgba(232,137,154,${0.18 - i * 0.04})`, animation: `ringBreath ${4.5 + i * 1.6}s ease-in-out ${i * 0.7}s infinite`, pointerEvents: "none" }} />
              ))}

              {/* Sparkle stickers around hero */}
              <SparkleSticker size={18} style={{ position: "absolute", top: "-8%", right: "12%", animationDelay: "0s" }} />
              <SparkleSticker size={12} color={C.rose} style={{ position: "absolute", bottom: "-15%", left: "18%", animationDelay: "1.5s" }} />
              <BlossomSticker size={20} style={{ position: "absolute", top: "5%", left: "5%", animationDelay: "0.8s" }} />

              <h1 className="hero-title">MYRA</h1>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.6rem auto", justifyContent: "center" }}>
                <div style={{ width: 32, height: 1, background: `linear-gradient(to right, transparent, ${C.rose}80)` }} />
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 0 L8.5 5.5 L14 7 L8.5 8.5 L7 14 L5.5 8.5 L0 7 L5.5 5.5 Z" fill={C.rose} opacity="0.7" />
                </svg>
                <div style={{ width: 32, height: 1, background: `linear-gradient(to left, transparent, ${C.rose}80)` }} />
              </div>

              <p className="hero-subtitle">The Smartest Floof on the Internet</p>

              <div className="scroll-cue">
                <span style={{ fontSize: "0.52rem", letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(232,137,154,0.55)", fontFamily: "'Jost',system-ui,sans-serif", fontWeight: 300 }}>Scroll to explore</span>
                <div className="scroll-arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.rose} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                    <path d="M7 13l5 5 5-5" />
                    <path d="M7 6l5 5 5-5" />
                  </svg>
                </div>
              </div>

              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="petal-particle" style={{ width: 2 + (i % 3) * 1.5, height: 2 + (i % 3) * 1.5, borderRadius: i % 3 === 0 ? "50%" : "40% 60% 60% 40%", background: i % 3 === 0 ? C.rose : i % 3 === 1 ? C.blush : C.champagne, left: `${6 + i * 7.5}%`, bottom: `${-28 + (i % 5) * 9}%`, "--dx": `${(i % 2 === 0 ? 1 : -1) * 15 + i * 3}px`, "--dr": `${(i % 2 === 0 ? 1 : -1) * 180}deg`, animationDelay: `${i * 0.9}s`, animationDuration: `${3.5 + i * 0.7}s` }} />
              ))}
            </div>
          </Section>

          {/* ══ CHAPTER 2 — PAW (scroll-driven) ═════════════════════ */}
          <div style={{ position: "absolute", inset: 0, opacity: pawAlpha, pointerEvents: pawAlpha > 0.05 ? "auto" : "none" }}>

            {/* Baby Myra polaroid — floats in from left */}
            <Polaroid
              src="/photos/curious-kitten.jpg"
              caption="Baby Myra days 🐱"
              rotation={-5}
              alpha={pawPhotoAlpha}
              dx={pawPhotoDx}
              position={{ top: "8%", left: "clamp(3%,5vw,10%)", zIndex: 10 }}
            />

            {/* Paw print sticker trail */}
            <PawPrintSticker size={16} style={{ position: "absolute", top: "35%", left: "8%", opacity: pawPhotoAlpha * 0.4, transform: "rotate(-20deg)" }} />
            <PawPrintSticker size={12} style={{ position: "absolute", top: "42%", left: "12%", opacity: pawPhotoAlpha * 0.3, transform: "rotate(15deg)" }} />

            {/* Greeting */}
            <div style={{ position: "absolute", top: "14%", width: "100%", textAlign: "center", opacity: greetAlpha, transform: `translateY(${lerp(18, 0, greetAlpha)}px)` }}>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem,4.5vw,4rem)", fontWeight: 300, fontStyle: "italic", color: C.mutedMid, letterSpacing: "0.04em", margin: 0 }}>
                Oh, hello there!
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", justifyContent: "center", marginTop: "0.7rem" }}>
                <div style={{ width: 24, height: 1, background: `linear-gradient(to right,transparent,${C.rose}80)` }} />
                <p style={{ fontFamily: "'Jost',system-ui,sans-serif", fontSize: "clamp(0.55rem,1.1vw,0.68rem)", fontWeight: 200, letterSpacing: "0.46em", textTransform: "uppercase", color: C.rose, opacity: 0.8, margin: 0 }}>
                  She wants a high five
                </p>
                <div style={{ width: 24, height: 1, background: `linear-gradient(to left,transparent,${C.rose}80)` }} />
              </div>
            </div>

            <div style={{ position: "absolute", bottom: "0%", left: "50%", transform: `translateX(-50%) scale(${rng(p, pRS, pRE, 0.3, 1)})`, width: "min(40vw,340px)", height: "min(40vw,340px)", borderRadius: "50%", background: "radial-gradient(circle,rgba(244,143,177,0.12) 0%,transparent 70%)", filter: "blur(35px)", opacity: pawAlpha }} />
            <div style={{ position: "absolute", bottom: "3.5%", left: "50%", transform: `translateX(-50%) scale(${shadowS})`, width: "clamp(110px,22vw,250px)", height: 20, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(232,137,154,0.25) 0%,transparent 70%)", filter: "blur(14px)", opacity: shadowA }} />

            <div style={{ position: "absolute", bottom: "-4%", left: "50%", marginLeft: "-150px", transformOrigin: "bottom center", perspective: "900px", transform: `translateY(${pawTY}%) translateY(${pawBob}%) rotateX(${pawRX}deg) rotateZ(${pawRZ}deg)` }}>
              <PawSVG width={300} />
            </div>
          </div>

          {/* ══ CHAPTER 3 — INTRO ════════════════════════════════════ */}
          <Section alpha={introA} dy={slideY(introA)}>
            <div style={{ display: "flex", alignItems: "center", padding: "0 8vw", gap: "5vw", width: "100%", maxWidth: 1000, position: "relative" }}>
              <div style={{ flexShrink: 0, opacity: 0.1 }}>
                <PawSVG width={110} />
              </div>
              <div style={{ flex: 1, position: "relative", zIndex: 2 }}>
                <span style={eyebrow}>The introduction</span>
                <h2 style={displayLg}>
                  Hi, I'm <em style={{ color: C.roseDeep, fontStyle: "italic" }}>Myra</em>.
                </h2>
                <p style={bodyText}>
                  Not just a cat. Smart, fluffy, and totally in charge.<br />
                  I respond to "come here" — not pspsps.
                </p>
              </div>

              {/* Golden portrait polaroid — slides in from right */}
              <Polaroid
                src="/photos/golden-portrait.jpg"
                caption="Main character energy ✨"
                rotation={4}
                alpha={introA}
                dx={introPhotoDx}
                scale={clamp01(introA * 1.2)}
                position={{ position: "relative", zIndex: 1, flexShrink: 0 }}
              />

              {/* Stickers */}
              <SparkleSticker size={16} style={{ position: "absolute", top: "-5%", right: "15%", animationDelay: "0.5s" }} />
              <HeartSticker size={14} style={{ position: "absolute", bottom: "10%", right: "8%", animationDelay: "2s" }} />
            </div>
          </Section>

          {/* ══ CHAPTER 4 — VIBE ═════════════════════════════════════ */}
          <Section alpha={vibeA} dy={slideY(vibeA)}>
            <div style={{ textAlign: "center", padding: "0 5vw", position: "relative" }}>

              {/* Cherry blossom polaroid — far top-right, decorative */}
              <Polaroid
                src="/photos/cherry-blossom.jpg"
                caption="Flower girl vibes 🌸"
                rotation={vibePhotoRot}
                alpha={vibeA * 0.6}
                position={{ top: "-42%", right: "clamp(-25%, -12vw, -12%)", zIndex: 0 }}
              />

              {/* Sunset standing polaroid — far bottom-left, decorative */}
              <Polaroid
                src="/photos/sunset-standing.jpg"
                caption="Golden hour queen 🌅"
                rotation={-6}
                alpha={vibeA * 0.6}
                dx={lerp(-30, 0, clamp01(vibeA * 1.4))}
                position={{ bottom: "-46%", left: "clamp(-25%, -12vw, -12%)", zIndex: 0 }}
              />

              {/* Blossom + heart stickers */}
              <BlossomSticker size={24} style={{ position: "absolute", top: "-18%", left: "20%", animationDelay: "0.3s" }} />
              <HeartSticker size={18} color={C.roseDeep} style={{ position: "absolute", bottom: "-20%", right: "18%", animationDelay: "1.2s" }} />

              <span style={eyebrow}>The vibe</span>
              <h2 style={{ ...displayLg, maxWidth: 740, margin: "0 auto" }}>
                I do high fives,<br />
                <em style={{ color: "rgba(45,31,43,0.28)", fontStyle: "italic" }}>brain games,</em><br />
                and demand treats.
              </h2>
            </div>
          </Section>

          {/* ══ CHAPTER 5 — STATS ════════════════════════════════════ */}
          <Section alpha={statsA} dy={slideY(statsA)}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2.5rem", textAlign: "center", position: "relative" }}>

              {/* Cuddle closeup polaroid — far left of cards */}
              <Polaroid
                src="/photos/cuddle-closeup.jpg"
                caption="Cuddle mode: ON 💕"
                rotation={-4}
                alpha={statsA}
                dy={statsPhotoDy}
                position={{ top: "10%", left: "clamp(-32%, -16vw, -14%)", zIndex: 1 }}
              />

              {/* Sparkle stickers */}
              <SparkleSticker size={20} style={{ position: "absolute", top: "-15%", right: "10%", animationDelay: "0.7s" }} />
              <SparkleSticker size={14} color={C.rose} style={{ position: "absolute", bottom: "-10%", left: "25%", animationDelay: "2.2s" }} />

              <div>
                <span style={eyebrow}>The facts</span>
                <h2 style={{ ...displayMd, margin: 0 }}>
                  The <em style={{ color: C.champagne, fontStyle: "italic" }}>feline</em> truth.
                </h2>
              </div>
              <div style={{ display: "flex", gap: "clamp(0.8rem,2.5vw,2.5rem)", flexWrap: "wrap", justifyContent: "center" }}>
                {[
                  { val: "1+", lbl: "Year of\ntraining" },
                  { val: "∞", lbl: "Treats\ndemanded" },
                  { val: "5★", lbl: "Floof\nrating" },
                  { val: "0", lbl: "Commands\nignored" },
                ].map(({ val, lbl }) => (
                  <div key={val} className="stat-card">
                    <div className="stat-shimmer" />
                    <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 600, color: C.roseDeep, lineHeight: 1 }}>{val}</div>
                    <div style={{ fontFamily: "'Jost',system-ui,sans-serif", fontSize: "0.61rem", fontWeight: 300, letterSpacing: "0.18em", textTransform: "uppercase", color: C.muted, marginTop: "0.5rem", whiteSpace: "pre-line" }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* ══ CHAPTER 6 — CONTACT ══════════════════════════════════ */}
          <Section alpha={contactA} dy={slideY(contactA)} style={{ background: "rgba(255,245,247,0.95)", backdropFilter: "blur(26px)", zIndex: 30 }}>

            {/* Sunset portrait as subtle parallax bg */}
            <div style={{
              position: "absolute",
              top: "50%",
              right: "clamp(3%, 8vw, 15%)",
              transform: `translateY(${contactPhotoDy - 50}%)`,
              opacity: 0.08,
              pointerEvents: "none",
              zIndex: 0,
              width: "min(35vw, 280px)",
              height: "min(45vw, 360px)",
              borderRadius: "1.5rem",
              overflow: "hidden",
            }}>
              <img
                src="/photos/sunset-standing.jpg"
                alt="Myra sunset"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Watermark paw */}
            <div style={{ position: "absolute", opacity: 0.04, pointerEvents: "none", zIndex: 0 }}>
              <PawSVG width={Math.min(480, typeof window !== "undefined" ? window.innerWidth * 0.68 : 480)} />
            </div>

            <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 660, padding: "0 2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", justifyContent: "center", marginBottom: "1.8rem" }}>
                <div style={{ width: 36, height: 1, background: `linear-gradient(to right,transparent,${C.rose}60)` }} />
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path d="M7 0 L8.5 5.5 L14 7 L8.5 8.5 L7 14 L5.5 8.5 L0 7 L5.5 5.5 Z" fill={C.rose} opacity="0.65" />
                </svg>
                <div style={{ width: 36, height: 1, background: `linear-gradient(to left,transparent,${C.rose}60)` }} />
              </div>

              {/* Heart stickers around CTA */}
              <HeartSticker size={16} style={{ position: "absolute", top: "-10%", left: "10%", animationDelay: "0.5s" }} />
              <HeartSticker size={20} color={C.blush} style={{ position: "absolute", top: "5%", right: "5%", animationDelay: "1.8s" }} />

              <span style={eyebrow}>Connect with Myra</span>

              <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(3rem,10vw,8rem)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.025em", color: C.cream, margin: "0 0 1.2rem" }}>
                Let's<br />
                <em style={{ color: C.roseDeep, fontStyle: "italic" }}>Collab.</em>
              </h2>

              <p style={{ ...bodyText, maxWidth: 440, margin: "0 auto 2.5rem" }}>
                Partnerships, sponsorships, or just to send love<br />
                to the smartest floof on the internet.
              </p>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                <a href="mailto:missmyramews@gmail.com" className="btn-primary">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  missmyramews@gmail.com
                </a>
                <a href="https://www.instagram.com/miss.myra.mews?igsh=MTd0dDU3bGU2cmxqag%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  @miss.myra.mews
                </a>
              </div>
            </div>

            <p style={{ position: "absolute", bottom: "3vh", left: "50%", transform: "translateX(-50%)", fontFamily: "'Jost',system-ui,sans-serif", fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(232,137,154,0.35)", whiteSpace: "nowrap" }}>
              © {new Date().getFullYear()} Miss Myra Mews · All rights reserved
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
