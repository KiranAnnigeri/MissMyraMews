// ─────────────────────────────────────────────────────────────────
//  MATH UTILITIES — scroll-driven interpolation helpers
// ─────────────────────────────────────────────────────────────────

/** Clamp a value between 0 and 1 */
export const clamp01 = (t) => Math.min(1, Math.max(0, t));

/** Inverse lerp — returns where `v` sits between `a` and `b` as 0–1 */
export const invlerp = (v, a, b) => clamp01((v - a) / (b - a));

/** Linear interpolation from `a` to `b` by factor `t` */
export const lerp = (a, b, t) => a + (b - a) * t;

/** Map a value from input range [i0, i1] to output range [o0, o1] */
export const mapRange = (v, i0, i1, o0, o1) => lerp(o0, o1, invlerp(v, i0, i1));

/**
 * Fade in/out envelope.
 * Returns 0 outside [start, end], fades in from start→fadeInEnd,
 * holds at 1, fades out from fadeOutStart→end.
 */
export const fade = (p, start, fadeInEnd, fadeOutStart, end) => {
    if (p <= start || p >= end) return 0;
    if (p < fadeInEnd) return mapRange(p, start, fadeInEnd, 0, 1);
    if (p > fadeOutStart) return mapRange(p, fadeOutStart, end, 1, 0);
    return 1;
};
