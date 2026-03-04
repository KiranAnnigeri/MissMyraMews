import colors from "../constants/colors";
import { NAV_LABELS } from "../constants/timeline";

// ─────────────────────────────────────────────────────────────────
//  PROGRESS NAV — side navigation dots with accessibility
// ─────────────────────────────────────────────────────────────────
export default function ProgressNav({ activeIndex, onNavigate }) {
    return (
        <nav
            aria-label="Page sections"
            style={{
                position: "fixed",
                right: "clamp(12px,2vw,22px)",
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                zIndex: 200,
            }}
        >
            {NAV_LABELS.map((label, i) => (
                <button
                    key={i}
                    type="button"
                    aria-label={`Go to ${label} section`}
                    aria-current={i === activeIndex ? "true" : undefined}
                    onClick={() => onNavigate(i)}
                    style={{
                        width: 24,
                        height: 24,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        border: "none",
                        padding: 0,
                        background: "transparent",
                    }}
                >
                    <span style={{
                        display: "block",
                        width: 4,
                        height: i === activeIndex ? 16 : 4,
                        borderRadius: i === activeIndex ? 4 : "50%",
                        background: i === activeIndex
                            ? colors.roseDeep
                            : "rgba(232,137,154,0.25)",
                        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                        boxShadow: i === activeIndex
                            ? `0 0 8px ${colors.rose}80`
                            : "none",
                    }} />
                </button>
            ))}
        </nav>
    );
}
