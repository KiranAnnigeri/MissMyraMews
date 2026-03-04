// ─────────────────────────────────────────────────────────────────
import colors from "../../constants/colors";
import { TIMELINE, SECTION_SLIDE_DISTANCE } from "../../constants/timeline";
import { clamp01, lerp, fade } from "../../utils/math";
import Section from "../Section";
import Polaroid from "../Polaroid";
import { SparkleSticker, HeartSticker } from "../Stickers";

// Style tokens — contrast-safe
const eyebrow = {
    display: "block",
    fontFamily: "'Jost', system-ui, sans-serif",
    fontSize: "clamp(0.6rem, 1.2vw, 0.72rem)",
    fontWeight: 400,
    letterSpacing: "0.42em",
    textTransform: "uppercase",
    color: colors.roseDeep,
    marginBottom: "1.2rem",
};

const displayMd = {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "clamp(1.8rem, 4vw, 4rem)",
    fontWeight: 300,
    lineHeight: 1.2,
    color: colors.cream,
};

// Hoisted outside component — static data (react-best-practices: rendering-hoist-jsx)
const STATS_DATA = [
    { val: "1+", lbl: "Year of\ntraining" },
    { val: "∞", lbl: "Treats\ndemanded" },
    { val: "5★", lbl: "Floof\nrating" },
    { val: "0", lbl: "Commands\nignored" },
];

// ─────────────────────────────────────────────────────────────────
//  CHAPTER 5 — STATS (with staggered card animation)
// ─────────────────────────────────────────────────────────────────
export default function StatsSection({ scrollProgress }) {
    const statsA = fade(scrollProgress, ...TIMELINE.stats);
    const slideY = lerp(SECTION_SLIDE_DISTANCE, 0, statsA);
    const statsPhotoDy = lerp(30, 0, clamp01(statsA * 1.3));

    return (
        <Section alpha={statsA} dy={slideY} label="Fun facts">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2.5rem", textAlign: "center", position: "relative" }}>

                {/* Cuddle closeup polaroid — vivid */}
                <Polaroid
                    src="/photos/cuddle-closeup.jpg"
                    caption="Cuddle mode: ON 💕"
                    rotation={-4}
                    alpha={Math.min(1, statsA * 1.2)}
                    dy={statsPhotoDy}
                    position={{ top: "10%", left: "clamp(-32%, -16vw, -14%)", zIndex: 1 }}
                />

                {/* Sparkle stickers */}
                <SparkleSticker size={20} style={{ position: "absolute", top: "-15%", right: "10%", animationDelay: "0.7s" }} />
                <SparkleSticker size={14} color={colors.roseLight} style={{ position: "absolute", bottom: "-10%", left: "25%", animationDelay: "2.2s" }} />
                <HeartSticker size={12} style={{ position: "absolute", top: "5%", right: "25%", animationDelay: "1.5s" }} />

                <div>
                    <span style={eyebrow}>The facts</span>
                    <h2 style={{ ...displayMd, margin: 0 }}>
                        The <em style={{ color: colors.champagne, fontStyle: "italic" }}>feline</em> truth.
                    </h2>
                </div>

                <div style={{ display: "flex", gap: "clamp(0.8rem,2.5vw,2.5rem)", flexWrap: "wrap", justifyContent: "center" }}>
                    {STATS_DATA.map(({ val, lbl }, i) => (
                        <div
                            key={val}
                            className="stat-card"
                            style={{
                                animationDelay: `${i * 0.12}s`,
                                transform: statsA > 0.3
                                    ? `translateY(0) scale(1)`
                                    : `translateY(20px) scale(0.95)`,
                                opacity: statsA > 0.3 ? 1 : 0,
                                transition: `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s, opacity 0.4s ease ${i * 0.1}s`,
                            }}
                        >
                            <div className="stat-shimmer" />
                            <div className="stat-value">{val}</div>
                            <div className="stat-label">{lbl}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
