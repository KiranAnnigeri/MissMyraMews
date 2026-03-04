import colors from "../../constants/colors";
import {
    TIMELINE,
    PAW_WAVE_OSCILLATIONS,
    PAW_MAX_ROTATION_DEG,
    PAW_BOB_AMPLITUDE,
    PAW_INITIAL_OFFSET,
    PAW_RISE_TILT_DEG,
} from "../../constants/timeline";
import { clamp01, invlerp, lerp, mapRange, fade } from "../../utils/math";
import PawSVG from "../PawSVG";
import Polaroid from "../Polaroid";
import { PawPrintSticker, HeartSticker, SparkleSticker } from "../Stickers";

// ─────────────────────────────────────────────────────────────────
//  CHAPTER 2 — PAW (scroll-driven wave animation)
//  Fixed: Paw is now much more visible, greeting appears sooner
// ─────────────────────────────────────────────────────────────────
export default function PawSection({ scrollProgress }) {
    const p = scrollProgress;
    const [pRS, pRE] = TIMELINE.pawRise;
    const [pWS, pWE] = TIMELINE.pawWave;
    const [pDS, pDE] = TIMELINE.pawDrop;

    // Vertical position — starts closer to visible
    const pawTY = p < pRS
        ? PAW_INITIAL_OFFSET
        : p < pRE
            ? mapRange(p, pRS, pRE, PAW_INITIAL_OFFSET, -10) // -10 to bring paw fully into view
            : p < pDS
                ? -10
                : p < pDE
                    ? mapRange(p, pDS, pDE, -10, PAW_INITIAL_OFFSET)
                    : PAW_INITIAL_OFFSET;

    // Rise tilt
    const pawRX = mapRange(p, pRS, pRE, PAW_RISE_TILT_DEG, 0);

    // Wave oscillation
    let pawRZ = 0;
    let pawBob = 0;
    if (p >= pWS && p <= pWE) {
        const phase = invlerp(p, pWS, pWE) * Math.PI * PAW_WAVE_OSCILLATIONS;
        pawRZ = Math.sin(phase) * PAW_MAX_ROTATION_DEG;
        pawBob = Math.sin(phase + Math.PI * 0.5) * PAW_BOB_AMPLITUDE;
    }

    // Opacity envelope
    const pawAlpha = fade(p, TIMELINE.pawOp[0], TIMELINE.pawOp[1], TIMELINE.pawOp[2], TIMELINE.pawOp[3]);

    // Shadow
    const shadowS = mapRange(p, pRS, pRE, 0.3, 1);
    const shadowA = pawAlpha * mapRange(p, pRS, pRE, 0, 1);

    // Greeting text — appears sooner with bounce
    const greetAlpha = p >= TIMELINE.greetIn[0]
        ? fade(p, TIMELINE.greetIn[0], TIMELINE.greetIn[1], TIMELINE.greetOut[0], TIMELINE.greetOut[1])
        : 0;

    // Baby Myra polaroid
    const pawPhotoAlpha = fade(p, 0.22, 0.28, 0.38, 0.45);
    const pawPhotoDx = lerp(-40, 0, clamp01(pawPhotoAlpha * 1.5));

    // Floating particles around paw — cute factor
    const pawParticleAlpha = pawAlpha * clamp01(mapRange(p, pWS, pWE, 0, 1));

    return (
        <div style={{
            position: "absolute",
            inset: 0,
            opacity: pawAlpha,
            visibility: pawAlpha < 0.02 ? "hidden" : "visible",
            pointerEvents: pawAlpha > 0.05 ? "auto" : "none",
        }}>

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
            <PawPrintSticker size={16} style={{ position: "absolute", top: "35%", left: "8%", opacity: pawPhotoAlpha * 0.6, transform: "rotate(-20deg)" }} />
            <PawPrintSticker size={12} style={{ position: "absolute", top: "42%", left: "12%", opacity: pawPhotoAlpha * 0.5, transform: "rotate(15deg)" }} />

            {/* Greeting */}
            <div style={{
                position: "absolute",
                top: "12%",
                width: "100%",
                textAlign: "center",
                opacity: greetAlpha,
                transform: `translateY(${lerp(24, 0, greetAlpha)}px) scale(${lerp(0.95, 1, greetAlpha)})`,
                transition: "transform 0.3s ease",
            }}>
                <p className="greeting-text">Oh, hello there!</p>
                <div className="greeting-subtitle-row">
                    <div className="greeting-line greeting-line--left" />
                    <p className="greeting-subtitle">She wants a high five</p>
                    <div className="greeting-line greeting-line--right" />
                </div>
            </div>

            {/* Warm radial glow behind paw */}
            <div style={{
                position: "absolute",
                bottom: "0%",
                left: "50%",
                transform: `translateX(-50%) scale(${mapRange(p, pRS, pRE, 0.3, 1.2)})`,
                width: "min(55vw, 450px)",
                height: "min(55vw, 450px)",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(244,143,177,0.18) 0%, rgba(232,137,154,0.08) 40%, transparent 70%)",
                filter: "blur(40px)",
                opacity: pawAlpha,
            }} />

            {/* Floating hearts around paw during wave */}
            {[
                { x: "38%", y: "58%", s: 14, d: "0.3s", r: -15 },
                { x: "62%", y: "55%", s: 12, d: "0.8s", r: 20 },
                { x: "35%", y: "40%", s: 10, d: "1.5s", r: -8 },
                { x: "65%", y: "38%", s: 16, d: "2.0s", r: 12 },
                { x: "45%", y: "70%", s: 10, d: "2.5s", r: -25 },
                { x: "55%", y: "72%", s: 8, d: "1.0s", r: 10 },
            ].map((h, i) => (
                <HeartSticker
                    key={i}
                    size={h.s}
                    color={i % 2 === 0 ? colors.roseLight : colors.blush}
                    style={{
                        position: "absolute",
                        left: h.x,
                        top: h.y,
                        opacity: pawParticleAlpha * 0.5,
                        transform: `rotate(${h.r}deg)`,
                        animationDelay: h.d,
                    }}
                />
            ))}

            {/* Sparkle stickers around paw */}
            <SparkleSticker size={14} style={{ position: "absolute", left: "42%", top: "65%", opacity: pawParticleAlpha * 0.4, animationDelay: "0.5s" }} />
            <SparkleSticker size={10} color={colors.roseLight} style={{ position: "absolute", left: "58%", top: "60%", opacity: pawParticleAlpha * 0.3, animationDelay: "1.2s" }} />

            {/* Floor shadow */}
            <div style={{
                position: "absolute",
                bottom: "3.5%",
                left: "50%",
                transform: `translateX(-50%) scale(${shadowS})`,
                width: "clamp(110px,22vw,250px)",
                height: 22,
                borderRadius: "50%",
                background: "radial-gradient(ellipse,rgba(232,137,154,0.30) 0%,transparent 70%)",
                filter: "blur(14px)",
                opacity: shadowA,
            }} />

            {/* The Paw — larger and more visible */}
            <div style={{
                position: "absolute",
                bottom: "-2%",
                left: "50%",
                marginLeft: "-165px",
                transformOrigin: "bottom center",
                perspective: "900px",
                transform: `translateY(${pawTY}%) translateY(${pawBob}%) rotateX(${pawRX}deg) rotateZ(${pawRZ}deg)`,
            }}>
                <PawSVG width={330} />
            </div>
        </div>
    );
}
