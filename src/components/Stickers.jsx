import colors from "../constants/colors";

// ─────────────────────────────────────────────────────────────────
//  STICKER SVG COMPONENTS — decorative, all aria-hidden
//  Colors updated to use roseLight for decorative elements
// ─────────────────────────────────────────────────────────────────

export function SparkleSticker({ size = 24, color = colors.champagne, style = {} }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="sticker" style={style} aria-hidden="true" focusable="false">
            <path d="M12 0 L13.5 9 L22 12 L13.5 15 L12 24 L10.5 15 L2 12 L10.5 9 Z" fill={color} opacity="0.6" />
        </svg>
    );
}

export function HeartSticker({ size = 20, color = colors.roseLight, style = {} }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="sticker" style={style} aria-hidden="true" focusable="false">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={color} opacity="0.45" />
        </svg>
    );
}

export function PawPrintSticker({ size = 18, color = colors.roseDeep, style = {} }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="sticker" style={style} aria-hidden="true" focusable="false">
            <ellipse cx="12" cy="16" rx="5" ry="4" fill={color} opacity="0.35" />
            <ellipse cx="6" cy="10" rx="2.5" ry="3" fill={color} opacity="0.35" />
            <ellipse cx="11" cy="7" rx="2.5" ry="3" fill={color} opacity="0.35" />
            <ellipse cx="17" cy="8" rx="2.5" ry="3" fill={color} opacity="0.35" />
            <ellipse cx="20" cy="12" rx="2.5" ry="3" fill={color} opacity="0.35" />
        </svg>
    );
}

export function BlossomSticker({ size = 22, color = colors.blush, style = {} }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="sticker" style={style} aria-hidden="true" focusable="false">
            {[0, 72, 144, 216, 288].map((angle) => (
                <ellipse key={angle} cx="12" cy="6" rx="3.5" ry="5" fill={color} opacity="0.45" transform={`rotate(${angle} 12 12)`} />
            ))}
            <circle cx="12" cy="12" r="3" fill={colors.champagne} opacity="0.55" />
        </svg>
    );
}
