import colors from "../../constants/colors";
import { TIMELINE, SECTION_SLIDE_DISTANCE } from "../../constants/timeline";
import { clamp01, lerp, mapRange } from "../../utils/math";
import Section from "../Section";
import PawSVG from "../PawSVG";
import { HeartSticker, SparkleSticker, BlossomSticker } from "../Stickers";

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

const bodyText = {
    fontFamily: "'Jost', system-ui, sans-serif",
    fontSize: "clamp(0.88rem, 1.8vw, 1.05rem)",
    fontWeight: 300,
    color: colors.muted,
    lineHeight: 1.75,
    letterSpacing: "0.02em",
    marginTop: "1.2rem",
};

// Hoisted static SVG (react-best-practices: rendering-hoist-jsx)
const contactStar = (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 0 L8.5 5.5 L14 7 L8.5 8.5 L7 14 L5.5 8.5 L0 7 L5.5 5.5 Z" fill={colors.rose} opacity="0.85" />
    </svg>
);

// Email obfuscation — assembled at runtime to avoid spam scraping
const emailUser = "missmyramews";
const emailDomain = "gmail.com";
const getEmail = () => `${emailUser}@${emailDomain}`;

// ─────────────────────────────────────────────────────────────────
//  CHAPTER 6 — CONTACT (with solid background, higher z-index)
// ─────────────────────────────────────────────────────────────────
export default function ContactSection({ scrollProgress }) {
    const p = scrollProgress;
    const contactA = p >= TIMELINE.contact[1] ? 1 : mapRange(p, TIMELINE.contact[0], TIMELINE.contact[1], 0, 1);
    const slideY = lerp(SECTION_SLIDE_DISTANCE, 0, contactA);
    const contactPhotoDy = lerp(20, -5, clamp01(contactA));

    return (
        <Section
            alpha={contactA}
            dy={slideY}
            label="Contact"
            style={{
                background: colors.bg,
                zIndex: 50,
            }}
        >
            {/* Sunset portrait as subtle parallax bg */}
            <div style={{
                position: "absolute",
                top: "50%",
                right: "clamp(3%, 8vw, 15%)",
                transform: `translateY(${contactPhotoDy - 50}%)`,
                opacity: 0.10,
                pointerEvents: "none",
                zIndex: 0,
                width: "min(35vw, 280px)",
                height: "min(45vw, 360px)",
                borderRadius: "1.5rem",
                overflow: "hidden",
            }}>
                <img
                    src="/photos/sunset-standing.jpg"
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </div>

            {/* Watermark paw */}
            <div style={{ position: "absolute", opacity: 0.05, pointerEvents: "none", zIndex: 0 }}>
                <PawSVG width={480} />
            </div>

            <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 660, padding: "0 2rem" }}>
                <div className="contact-divider">
                    <div className="contact-divider-line contact-divider-line--left" />
                    {contactStar}
                    <div className="contact-divider-line contact-divider-line--right" />
                </div>

                {/* Stickers */}
                <HeartSticker size={16} style={{ position: "absolute", top: "-10%", left: "10%", animationDelay: "0.5s" }} />
                <HeartSticker size={20} color={colors.blush} style={{ position: "absolute", top: "5%", right: "5%", animationDelay: "1.8s" }} />
                <SparkleSticker size={14} style={{ position: "absolute", bottom: "20%", left: "5%", animationDelay: "2.5s" }} />
                <BlossomSticker size={18} style={{ position: "absolute", bottom: "15%", right: "8%", animationDelay: "1.0s" }} />

                <span style={eyebrow}>Connect with Myra</span>

                <h2 className="contact-heading">
                    Let's<br />
                    <em style={{ color: colors.roseDeep, fontStyle: "italic" }}>Collab.</em>
                </h2>

                <p style={{ ...bodyText, maxWidth: 440, margin: "0 auto 2.5rem" }}>
                    Partnerships, sponsorships, or just to send love<br />
                    to the smartest floof on the internet.
                </p>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                    <a href={`mailto:${getEmail()}`} className="btn-primary" aria-label="Send email to Miss Myra Mews">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        {getEmail()}
                    </a>
                    <a
                        href="https://www.instagram.com/miss.myra.mews?igsh=MTd0dDU3bGU2cmxqag%3D%3D&utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        aria-label="Visit Miss Myra Mews on Instagram"
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <rect x="2" y="2" width="20" height="20" rx="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                        @miss.myra.mews
                    </a>
                </div>
            </div>

            <p className="footer-copyright">
                © {new Date().getFullYear()} Miss Myra Mews · All rights reserved
            </p>
        </Section>
    );
}
