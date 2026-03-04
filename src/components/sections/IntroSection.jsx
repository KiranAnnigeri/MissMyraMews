import colors from "../../constants/colors";
import { TIMELINE, SECTION_SLIDE_DISTANCE } from "../../constants/timeline";
import { clamp01, lerp, fade } from "../../utils/math";
import Section from "../Section";
import PawSVG from "../PawSVG";
import Polaroid from "../Polaroid";
import { SparkleSticker, HeartSticker } from "../Stickers";

// ─────────────────────────────────────────────────────────────────
//  SHARED STYLE TOKENS — contrast-safe
// ─────────────────────────────────────────────────────────────────
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

const displayLg = {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "clamp(2.6rem, 5.5vw, 5.5rem)",
    fontWeight: 600,
    lineHeight: 1.08,
    letterSpacing: "-0.02em",
    color: colors.cream,
    margin: 0,
};

const bodyText = {
    fontFamily: "'Jost', system-ui, sans-serif",
    fontSize: "clamp(0.88rem, 1.8vw, 1.05rem)",
    fontWeight: 300,
    color: colors.muted,
    lineHeight: 1.75,
    letterSpacing: "0.02em",
    marginTop: "1.2rem",
};

// ─────────────────────────────────────────────────────────────────
//  CHAPTER 3 — INTRO
// ─────────────────────────────────────────────────────────────────
export default function IntroSection({ scrollProgress }) {
    const introA = fade(scrollProgress, ...TIMELINE.intro);
    const slideY = lerp(SECTION_SLIDE_DISTANCE, 0, introA);
    const introPhotoDx = lerp(40, 0, clamp01(introA * 1.5));
    const photoScale = lerp(0.9, 1, clamp01(introA * 1.3));

    return (
        <Section alpha={introA} dy={slideY} label="Introduction">
            <div style={{ display: "flex", alignItems: "center", padding: "0 8vw", gap: "5vw", width: "100%", maxWidth: 1000, position: "relative" }}>
                <div style={{ flexShrink: 0, opacity: 0.12 }}>
                    <PawSVG width={110} />
                </div>
                <div style={{ flex: 1, position: "relative", zIndex: 2 }}>
                    <span style={eyebrow}>The introduction</span>
                    <h2 style={displayLg}>
                        Hi, I'm <em style={{ color: colors.roseDeep, fontStyle: "italic" }}>Myra</em>.
                    </h2>
                    <p style={bodyText}>
                        Not just a cat. Smart, fluffy, and totally in charge.<br />
                        I respond to "come here" — not pspsps.
                    </p>
                </div>

                {/* Golden portrait polaroid — vivid, slides in */}
                <Polaroid
                    src="/photos/golden-portrait.jpg"
                    caption="Main character energy ✨"
                    rotation={4}
                    alpha={Math.min(1, introA * 1.3)}
                    dx={introPhotoDx}
                    scale={photoScale}
                    position={{ position: "relative", zIndex: 1, flexShrink: 0 }}
                />

                {/* Stickers */}
                <SparkleSticker size={16} style={{ position: "absolute", top: "-5%", right: "15%", animationDelay: "0.5s" }} />
                <HeartSticker size={14} style={{ position: "absolute", bottom: "10%", right: "8%", animationDelay: "2s" }} />
            </div>
        </Section>
    );
}
