import colors from "../../constants/colors";
import { TIMELINE } from "../../constants/timeline";
import { clamp01, lerp, mapRange } from "../../utils/math";
import Section from "../Section";
import { SparkleSticker, BlossomSticker } from "../Stickers";

// ─────────────────────────────────────────────────────────────────
//  CHAPTER 1 — HERO
// ─────────────────────────────────────────────────────────────────

// Static JSX hoisted outside the component (react-best-practices: rendering-hoist-jsx)
const dividerStar = (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 0 L8.5 5.5 L14 7 L8.5 8.5 L7 14 L5.5 8.5 L0 7 L5.5 5.5 Z" fill={colors.rose} opacity="0.85" />
    </svg>
);

export default function HeroSection({ scrollProgress }) {
    const p = scrollProgress;

    const heroAlpha = p < TIMELINE.heroFull[1]
        ? 1
        : mapRange(p, TIMELINE.heroFade[0], TIMELINE.heroFade[1], 1, 0);
    const heroScale = mapRange(p, 0, 0.16, 1, 1.06);

    return (
        <Section alpha={heroAlpha} label="Hero" style={{ transform: `scale(${heroScale})` }}>
            <div style={{ textAlign: "center", position: "relative" }}>

                {/* Hero background photo — circular, subtle */}
                <div className="hero-bg-photo" style={{
                    transform: `translate(-50%, ${lerp(-46, -54, clamp01(p / 0.16))}%) scale(1.05)`,
                }}>
                    <img src="/photos/sunset-lounging.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div className="hero-bg-overlay" />
                </div>

                {/* Floating mini polaroids around hero */}
                <div className="hero-float-photo" style={{ position: "absolute", top: "-12%", right: "-18%", transform: "rotate(8deg)", opacity: 0.7, zIndex: 0 }}>
                    <div className="polaroid-inner" style={{ width: 90 }}>
                        <img src="/photos/golden-portrait.jpg" alt="" className="polaroid-img" style={{ height: 108 }} loading="lazy" />
                    </div>
                </div>
                <div className="hero-float-photo" style={{ position: "absolute", bottom: "-20%", left: "-22%", transform: "rotate(-12deg)", opacity: 0.6, zIndex: 0 }}>
                    <div className="polaroid-inner" style={{ width: 80 }}>
                        <img src="/photos/cherry-blossom.jpg" alt="" className="polaroid-img" style={{ height: 96 }} loading="lazy" />
                    </div>
                </div>
                <div className="hero-float-photo" style={{ position: "absolute", top: "15%", left: "-25%", transform: "rotate(-5deg)", opacity: 0.55, zIndex: 0 }}>
                    <div className="polaroid-inner" style={{ width: 75 }}>
                        <img src="/photos/cuddle-closeup.jpg" alt="" className="polaroid-img" style={{ height: 90 }} loading="lazy" />
                    </div>
                </div>

                {/* Concentric rings */}
                {[1, 1.38, 1.76].map((sc, i) => (
                    <div key={i} className="hero-ring" style={{
                        transform: `translate(-50%,-50%) scale(${sc})`,
                        border: `1px solid rgba(232,137,154,${0.22 - i * 0.04})`,
                        animation: `ringBreath ${4.5 + i * 1.6}s ease-in-out ${i * 0.7}s infinite`,
                    }} />
                ))}

                {/* Sparkle stickers */}
                <SparkleSticker size={18} style={{ position: "absolute", top: "-8%", right: "12%", animationDelay: "0s" }} />
                <SparkleSticker size={12} color={colors.roseLight} style={{ position: "absolute", bottom: "-15%", left: "18%", animationDelay: "1.5s" }} />
                <BlossomSticker size={20} style={{ position: "absolute", top: "5%", left: "5%", animationDelay: "0.8s" }} />

                <h1 className="hero-title">MYRA</h1>

                <div className="hero-divider">
                    <div className="hero-divider-line hero-divider-line--left" />
                    {dividerStar}
                    <div className="hero-divider-line hero-divider-line--right" />
                </div>

                <p className="hero-subtitle">The Smartest Floof on the Internet</p>

                <div className="scroll-cue">
                    <span className="scroll-cue-text">Scroll to explore</span>
                    <div className="scroll-arrow">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.rose} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }} aria-hidden="true">
                            <path d="M7 13l5 5 5-5" />
                            <path d="M7 6l5 5 5-5" />
                        </svg>
                    </div>
                </div>

                {/* Petal particles */}
                {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="petal-particle" style={{
                        width: 3 + (i % 3) * 2,
                        height: 3 + (i % 3) * 2,
                        borderRadius: i % 3 === 0 ? "50%" : "40% 60% 60% 40%",
                        background: i % 3 === 0 ? colors.roseLight : i % 3 === 1 ? colors.blush : colors.champagne,
                        left: `${6 + i * 7.5}%`,
                        bottom: `${-28 + (i % 5) * 9}%`,
                        "--dx": `${(i % 2 === 0 ? 1 : -1) * 15 + i * 3}px`,
                        "--dr": `${(i % 2 === 0 ? 1 : -1) * 180}deg`,
                        animationDelay: `${i * 0.9}s`,
                        animationDuration: `${3.5 + i * 0.7}s`,
                    }} />
                ))}
            </div>
        </Section>
    );
}
