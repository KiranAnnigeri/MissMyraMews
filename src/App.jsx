import "./App.css";
import { Analytics } from "@vercel/analytics/react";
import colors from "./constants/colors";
import { NAV_TARGETS, SCROLL_HEIGHT_MULTIPLIER } from "./constants/timeline";
import useScrollProgress from "./hooks/useScrollProgress";
import ProgressNav from "./components/ProgressNav";
import HeroSection from "./components/sections/HeroSection";
import PawSection from "./components/sections/PawSection";
import IntroSection from "./components/sections/IntroSection";
import VibeSection from "./components/sections/VibeSection";
import StatsSection from "./components/sections/StatsSection";
import ContactSection from "./components/sections/ContactSection";

// ─────────────────────────────────────────────────────────────────
//  APP — Clean composition root
//  @react-patterns: Container component, composition over inheritance
//  @react-state-management: State colocated in useScrollProgress hook
// ─────────────────────────────────────────────────────────────────
export default function App() {
  const { scrollProgress, scrollRef, scrollTo } = useScrollProgress();

  // Active progress dot — updated thresholds for compressed timeline
  const p = scrollProgress;
  const dotIndex = p < 0.16 ? 0 : p < 0.48 ? 1 : p < 0.66 ? 2 : p < 0.82 ? 3 : p < 0.93 ? 4 : 5;

  const handleNavigate = (idx) => scrollTo(NAV_TARGETS[idx]);

  return (
    <div
      ref={scrollRef}
      style={{
        height: "100vh",
        overflowY: "scroll",
        overflowX: "hidden",
        background: colors.bg,
        scrollbarWidth: "none",
      }}
    >
      <div style={{ height: `${SCROLL_HEIGHT_MULTIPLIER * 100}vh`, position: "relative" }}>
        <div className="sticky-viewport">

          {/* Background scene with noise grain overlay */}
          <div className="scene-background">
            <div className="scene-gradient" />
            {[
              { w: "58vw", c: "rgba(244,143,177,0.10)", t: "2%", l: "52%", a: "blob1 13s ease-in-out infinite" },
              { w: "48vw", c: "rgba(232,137,154,0.08)", t: "50%", l: "3%", a: "blob2 17s ease-in-out infinite" },
              { w: "38vw", c: "rgba(212,165,116,0.07)", t: "20%", l: "35%", a: "blob3 10s ease-in-out infinite" },
            ].map((b, i) => (
              <div key={i} className="scene-blob" style={{ width: b.w, height: b.w, background: `radial-gradient(circle, ${b.c} 0%, transparent 70%)`, top: b.t, left: b.l, animation: b.a }} />
            ))}
            <div className="scene-noise" />
            <div className="scene-vignette" />
          </div>

          {/* Floating background decorations */}
          <div className="bg-decorations" aria-hidden="true">
            <div className="bg-paw bg-paw--1" />
            <div className="bg-paw bg-paw--2" />
            <div className="bg-heart bg-heart--1" />
            <div className="bg-heart bg-heart--2" />
            <div className="bg-heart bg-heart--3" />
          </div>

          {/* Progress navigation */}
          <ProgressNav activeIndex={dotIndex} onNavigate={handleNavigate} />

          {/* Sections */}
          <HeroSection scrollProgress={p} />
          <PawSection scrollProgress={p} />
          <IntroSection scrollProgress={p} />
          <VibeSection scrollProgress={p} />
          <StatsSection scrollProgress={p} />
          <ContactSection scrollProgress={p} />

        </div>
      </div>
      <Analytics />
    </div>
  );
}
