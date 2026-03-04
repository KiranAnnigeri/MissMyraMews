// ─────────────────────────────────────────────────────────────────
//  SCROLL TIMELINE — progress ranges [0.0 – 1.0] for each section
//  Compressed for snappier scrolling (500vh total)
// ─────────────────────────────────────────────────────────────────
export const TIMELINE = {
    heroFull: [0.0, 0.10],
    heroFade: [0.10, 0.16],

    pawRise: [0.16, 0.22],
    pawWave: [0.22, 0.42],
    pawDrop: [0.42, 0.48],
    pawOp: [0.16, 0.20, 0.42, 0.48],

    greetIn: [0.22, 0.26],
    greetOut: [0.38, 0.44],

    intro: [0.48, 0.52, 0.62, 0.66],
    vibe: [0.66, 0.70, 0.78, 0.82],
    stats: [0.82, 0.86, 0.92, 0.95],
    contact: [0.93, 0.97],
};

// Named constants for magic numbers
export const SCROLL_HEIGHT_MULTIPLIER = 5; // 500vh (was 7 — now 30% less scrolling)
export const PAW_WAVE_OSCILLATIONS = 5;
export const PAW_MAX_ROTATION_DEG = 26;
export const PAW_BOB_AMPLITUDE = 3.5;
export const PAW_INITIAL_OFFSET = 80; // was 120, reduced so paw is more visible
export const PAW_RISE_TILT_DEG = 18;
export const SECTION_SLIDE_DISTANCE = 30; // increased for more dramatic entrance

// Navigation target positions for progress dots
export const NAV_TARGETS = [0.02, 0.20, 0.52, 0.68, 0.84, 0.95];
export const NAV_LABELS = ["Hero", "Paw", "Intro", "Vibe", "Stats", "Contact"];
