// ─────────────────────────────────────────────────────────────────
//  POLAROID — reusable photo frame with hover effect
//  Supports scale prop for entrance animation
// ─────────────────────────────────────────────────────────────────
export default function Polaroid({ src, caption, rotation = 0, alpha = 1, dx = 0, dy = 0, scale = 1, position = {} }) {
    return (
        <div
            className="polaroid"
            style={{
                position: position.position || "absolute",
                ...position,
                opacity: alpha,
                visibility: alpha < 0.02 ? "hidden" : "visible",
                transform: `translate(${dx}px, ${dy}px) rotate(${rotation}deg) scale(${scale})`,
            }}
        >
            <div className="polaroid-inner">
                <img src={src} alt="" className="polaroid-img" loading="lazy" />
                <p className="polaroid-caption">{caption}</p>
            </div>
        </div>
    );
}
