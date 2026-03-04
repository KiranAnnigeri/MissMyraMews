import colors from "../../constants/colors";
import { TIMELINE, SECTION_SLIDE_DISTANCE } from "../../constants/timeline";
import { clamp01, lerp, fade } from "../../utils/math";
import Section from "../Section";
import Polaroid from "../Polaroid";
import { BlossomSticker, HeartSticker, SparkleSticker } from "../Stickers";

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

const displayLg = {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)",
    fontWeight: 600,
    lineHeight: 1.08,
    letterSpacing: "-0.02em",
    color: colors.cream,
    margin: 0,
};

// ─────────────────────────────────────────────────────────────────
//  CHAPTER 4 — VIBE
// ─────────────────────────────────────────────────────────────────
export default function VibeSection({ scrollProgress }) {
    const vibeA = fade(scrollProgress, ...TIMELINE.vibe);
    const slideY = lerp(SECTION_SLIDE_DISTANCE, 0, vibeA);
    const vibePhotoRot = lerp(8, -3, clamp01(vibeA));
    const photoScale = lerp(0.88, 1, clamp01(vibeA * 1.2));

    return (
        <Section alpha={vibeA} dy={slideY} label="The Vibe">
            <div style={{ textAlign: "center", padding: "0 5vw", position: "relative" }}>

                {/* Cherry blossom polaroid — more vivid */}
                <Polaroid
                    src="/photos/cherry-blossom.jpg"
                    caption="Flower girl vibes 🌸"
                    rotation={vibePhotoRot}
                    alpha={Math.min(1, vibeA * 0.9)}
                    scale={photoScale}
                    position={{ top: "-42%", right: "clamp(-25%, -12vw, -12%)", zIndex: 0 }}
                />

                {/* Sunset standing polaroid — more vivid */}
                <Polaroid
                    src="/photos/sunset-standing.jpg"
                    caption="Golden hour queen 🌅"
                    rotation={-6}
                    alpha={Math.min(1, vibeA * 0.9)}
                    dx={lerp(-30, 0, clamp01(vibeA * 1.4))}
                    scale={photoScale}
                    position={{ bottom: "-46%", left: "clamp(-25%, -12vw, -12%)", zIndex: 0 }}
                />

                {/* Stickers */}
                <BlossomSticker size={24} style={{ position: "absolute", top: "-18%", left: "20%", animationDelay: "0.3s" }} />
                <HeartSticker size={18} color={colors.roseDeep} style={{ position: "absolute", bottom: "-20%", right: "18%", animationDelay: "1.2s" }} />
                <SparkleSticker size={14} style={{ position: "absolute", top: "10%", right: "30%", animationDelay: "2.0s" }} />

                <span style={eyebrow}>The vibe</span>
                <h2 style={{ ...displayLg, maxWidth: 740, margin: "0 auto" }}>
                    I do high fives,<br />
                    <em style={{ color: colors.muted, fontStyle: "italic" }}>brain games,</em><br />
                    and demand treats.
                </h2>
            </div>
        </Section>
    );
}
