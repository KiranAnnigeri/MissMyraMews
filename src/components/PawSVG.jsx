// ─────────────────────────────────────────────────────────────────
//  PAW SVG — Rose / pink tones for Myra (decorative)
// ─────────────────────────────────────────────────────────────────
export default function PawSVG({ width = 300 }) {
    return (
        <svg
            width={width}
            viewBox="0 0 300 460"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
            aria-hidden="true"
            focusable="false"
        >
            <defs>
                <radialGradient id="gArm" cx="40%" cy="18%" r="70%">
                    <stop offset="0%" stopColor="#FCE4EC" />
                    <stop offset="100%" stopColor="#F8BBD0" />
                </radialGradient>
                <radialGradient id="gPad" cx="35%" cy="28%" r="68%">
                    <stop offset="0%" stopColor="#F48FB1" />
                    <stop offset="100%" stopColor="#E8899A" />
                </radialGradient>
                <radialGradient id="gToe" cx="35%" cy="26%" r="65%">
                    <stop offset="0%" stopColor="#F48FB1" />
                    <stop offset="100%" stopColor="#EC407A" />
                </radialGradient>
                <filter id="fDrp">
                    <feDropShadow dx="0" dy="16" stdDeviation="22" floodColor="rgba(232,137,154,0.35)" />
                </filter>
                <filter id="fGlw">
                    <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="rgba(244,143,177,0.25)" />
                </filter>
            </defs>
            {/* Arm */}
            <path d="M74 460 C 66 345,70 232,78 182 C 86 138,100 114,114 102 C 128 88,172 88,186 102 C 200 114,214 138,222 182 C 230 232,234 345,226 460 Z" fill="url(#gArm)" filter="url(#fDrp)" />
            {/* Arm highlight */}
            <path d="M76 460 C 68 345,72 232,80 182 C 86 148,98 120,110 107" stroke="rgba(255,255,255,0.25)" strokeWidth="7" fill="none" strokeLinecap="round" />
            {/* Fur lines */}
            {Array.from({ length: 9 }, (_, i) => (
                <line key={i} x1={94 + i * 13} y1={145 + i * 18} x2={101 + i * 13} y2={172 + i * 18} stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />
            ))}
            {/* Wrist */}
            <ellipse cx="150" cy="162" rx="64" ry="23" fill="#F8BBD0" />
            <ellipse cx="150" cy="159" rx="60" ry="18" fill="#FCE4EC" />
            {/* Main pad */}
            <path d="M90 182 C 88 150,108 126,150 122 C 192 126,212 150,210 182 C 218 215,194 250,150 254 C 106 250,82 215,90 182 Z" fill="url(#gPad)" filter="url(#fGlw)" />
            <ellipse cx="126" cy="165" rx="19" ry="12" fill="rgba(255,255,255,0.28)" transform="rotate(-28 126 165)" />
            {/* Toe beans */}
            <ellipse cx="78" cy="122" rx="23" ry="25" fill="url(#gArm)" />
            <ellipse cx="78" cy="122" rx="19" ry="21" fill="url(#gToe)" />
            <ellipse cx="71" cy="115" rx="5.5" ry="5" fill="rgba(255,255,255,0.3)" transform="rotate(-24 71 115)" />
            <path d="M69 97 Q77 83 83 95" stroke="rgba(255,200,200,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" />

            <ellipse cx="118" cy="95" rx="25" ry="27" fill="url(#gArm)" />
            <ellipse cx="118" cy="95" rx="21" ry="23" fill="url(#gToe)" />
            <ellipse cx="111" cy="87" rx="6.5" ry="6" fill="rgba(255,255,255,0.28)" transform="rotate(-14 111 87)" />
            <path d="M109 71 Q117 57 125 68" stroke="rgba(255,200,200,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" />

            <ellipse cx="182" cy="95" rx="25" ry="27" fill="url(#gArm)" />
            <ellipse cx="182" cy="95" rx="21" ry="23" fill="url(#gToe)" />
            <ellipse cx="175" cy="87" rx="6.5" ry="6" fill="rgba(255,255,255,0.28)" transform="rotate(-5 175 87)" />
            <path d="M173 71 Q181 57 189 68" stroke="rgba(255,200,200,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" />

            <ellipse cx="222" cy="122" rx="23" ry="25" fill="url(#gArm)" />
            <ellipse cx="222" cy="122" rx="19" ry="21" fill="url(#gToe)" />
            <ellipse cx="215" cy="115" rx="5.5" ry="5" fill="rgba(255,255,255,0.3)" transform="rotate(16 215 115)" />
            <path d="M212 97 Q220 83 226 95" stroke="rgba(255,200,200,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Tiny heart */}
            <path d="M145 182 C145 178,148 175,151 175 C154 175,156 178,156 182 C156 178,159 175,162 175 C165 175,167 178,167 182 C167 188,156 195,156 195 C156 195,145 188,145 182 Z" fill="rgba(255,255,255,0.22)" transform="translate(-3, -2) scale(0.6)" />
        </svg>
    );
}
