// ─────────────────────────────────────────────────────────────────
//  SECTION — wrapper with opacity/transform + visibility control
//  Fixes ghosting by hiding sections when nearly transparent
// ─────────────────────────────────────────────────────────────────
export default function Section({ alpha, dy = 0, children, style = {}, label }) {
    return (
        <div
            role="region"
            aria-label={label}
            style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: alpha,
                visibility: alpha < 0.02 ? "hidden" : "visible",
                transform: `translateY(${dy}px)`,
                pointerEvents: alpha > 0.05 ? "auto" : "none",
                willChange: "opacity, transform",
                transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                ...style,
            }}
        >
            {children}
        </div>
    );
}
