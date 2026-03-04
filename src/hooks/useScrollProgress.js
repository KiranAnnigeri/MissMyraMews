import { useState, useEffect, useRef, useCallback } from "react";
import { clamp01 } from "../utils/math";

/**
 * Custom hook for rAF-throttled scroll progress tracking.
 * Returns scroll progress as a value from 0 to 1.
 *
 * @react-state-management: Colocates scroll state in a reusable hook
 * @react-best-practices: client-event-listeners — throttled with rAF
 */
export default function useScrollProgress() {
    const scrollRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const ticking = useRef(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handleScroll = () => {
            if (!ticking.current) {
                requestAnimationFrame(() => {
                    const max = el.scrollHeight - el.clientHeight;
                    if (max > 0) {
                        setScrollProgress(clamp01(el.scrollTop / max));
                    }
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };

        el.addEventListener("scroll", handleScroll, { passive: true });
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = useCallback((targetProgress) => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTo({
            top: targetProgress * (el.scrollHeight - el.clientHeight),
            behavior: "smooth",
        });
    }, []);

    return { scrollProgress, scrollRef, scrollTo };
}
