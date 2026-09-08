"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* ── Premium easing curves ── */
const EASE_CINE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const EASE_HEAVY: [number, number, number, number] = [0.22, 0.68, 0, 1];

const SESSION_KEY = "kv-intro-played";

interface CinematicIntroProps {
  /** Fires when the hero content should begin its staggered reveal */
  onHeroReveal?: () => void;
  /** Fires when the intro is fully unmounted */
  onComplete?: () => void;
}

/**
 * CinematicIntro — Premium opening sequence
 *
 * Timeline:
 *   Phase 0 (0ms)     — Mount, black screen
 *   Phase 1 (50ms)    — Ambient light slowly appears
 *   Phase 2 (600ms)   — KV monogram reveals with soft glow
 *   Phase 3 (1200ms)  — KV fades, horizontal light line sweeps
 *   Phase 4 (1700ms)  — Large centered name: KRISHNA / VARSHITH
 *   Phase 5 (2800ms)  — Name transitions (shift + fade), hero reveal fires
 *   Phase 6 (3800ms)  — Overlay begins exit animation
 *   Unmounted (4800ms) — Fully interactive
 */
export default function CinematicIntro({
  onHeroReveal,
  onComplete,
}: CinematicIntroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);
  const [shouldSkip, setShouldSkip] = useState(false);
  const heroRevealCalled = useRef(false);
  const completeCalled = useRef(false);

  /* ── Session check ── */
  useEffect(() => {
    if (prefersReducedMotion) {
      setShouldSkip(true);
      return;
    }

    // Skip intro if navigating directly to a section hash or another path
    if (typeof window !== "undefined" && (window.location.hash.length > 1 || window.location.pathname !== "/")) {
      setShouldSkip(true);
      return;
    }

    try {
      if (sessionStorage.getItem(SESSION_KEY) === "true") {
        setShouldSkip(true);
      }
    } catch {
      /* sessionStorage unavailable — play the intro */
    }
  }, [prefersReducedMotion]);

  /* ── Skip: immediately show portfolio ── */
  useEffect(() => {
    if (shouldSkip) {
      if (!heroRevealCalled.current) {
        heroRevealCalled.current = true;
        onHeroReveal?.();
      }
      setVisible(false);
      if (!completeCalled.current) {
        completeCalled.current = true;
        onComplete?.();
      }
    }
  }, [shouldSkip, onHeroReveal, onComplete]);

  /* ── Phase timeline ── */
  useEffect(() => {
    if (shouldSkip) return;

    document.body.style.overflow = "hidden";

    const timers = [
      /* Phase 1 — ambient light begins */
      setTimeout(() => setPhase(1), 50),

      /* Phase 2 — KV monogram appears */
      setTimeout(() => setPhase(2), 600),

      /* Phase 3 — KV fades, light line sweeps */
      setTimeout(() => setPhase(3), 1200),

      /* Phase 4 — Large name reveals centered */
      setTimeout(() => setPhase(4), 1700),

      /* Phase 5 — Name transitions, hero reveal fires */
      setTimeout(() => {
        setPhase(5);
        if (!heroRevealCalled.current) {
          heroRevealCalled.current = true;
          onHeroReveal?.();
        }
      }, 2800),

      /* Phase 6 — Begin overlay exit */
      setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
        try {
          sessionStorage.setItem(SESSION_KEY, "true");
        } catch {
          /* ignore */
        }
      }, 3800),
    ];

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, [shouldSkip, onHeroReveal, onComplete]);

  /* ── Safety fallback — always reveal hero ── */
  useEffect(() => {
    const safety = setTimeout(() => {
      if (!heroRevealCalled.current) {
        heroRevealCalled.current = true;
        onHeroReveal?.();
      }
      if (visible) {
        setVisible(false);
        document.body.style.overflow = "";
      }
      if (!completeCalled.current) {
        completeCalled.current = true;
        onComplete?.();
      }
    }, 7000);
    return () => clearTimeout(safety);
  }, [onHeroReveal, onComplete, visible]);

  /* ── Exit complete handler ── */
  const handleExitComplete = useCallback(() => {
    if (!completeCalled.current) {
      completeCalled.current = true;
      onComplete?.();
    }
  }, [onComplete]);

  if (shouldSkip && !visible) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="cinematic-intro"
          className="ci-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1.0, ease: EASE_CINE },
          }}
          aria-hidden="true"
        >
          {/* ── Background layer ── */}
          <div className="ci-bg" />

          {/* ── Ambient glow — cinematic light source ── */}
          <motion.div
            className="ci-ambient"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 2.0, ease: EASE_SMOOTH }}
          />

          {/* ── Ambient secondary — top-down light ── */}
          <motion.div
            className="ci-ambient-top"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 1 : 0 }}
            transition={{ duration: 1.5, ease: EASE_SMOOTH }}
          />

          {/* ── KV Monogram — Phase 2–3 ── */}
          <AnimatePresence>
            {phase >= 2 && phase < 4 && (
              <motion.div
                key="kv-monogram"
                className="ci-kv"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{
                  opacity: phase < 3 ? 1 : 0,
                  scale: phase < 3 ? 1 : 1.03,
                }}
                exit={{
                  opacity: 0,
                  scale: 1.03,
                  transition: { duration: 0.4, ease: EASE_CINE },
                }}
                transition={{ duration: 0.55, ease: EASE_CINE }}
              >
                <span className="ci-kv-text">KV</span>
                <div className="ci-kv-glow" />
                <motion.span
                  className="ci-kv-tagline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: phase < 3 ? 0.4 : 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: EASE_SMOOTH }}
                >
                  IDEAS · BUILD · IMPACT
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Light Line — Phase 3+ ── */}
          <motion.div
            className="ci-light-line"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: phase >= 3 ? 1 : 0,
              opacity: phase >= 3 && phase < 5 ? 1 : 0,
            }}
            transition={{
              scaleX: { duration: 0.7, ease: EASE_CINE },
              opacity: {
                duration: phase >= 5 ? 0.5 : 0.35,
                ease: EASE_SMOOTH,
              },
            }}
          >
            {/* Glow layer */}
            <div className="ci-light-line-glow" />
          </motion.div>

          {/* ── Name Block — Phase 4+ ── */}
          <AnimatePresence>
            {phase >= 4 && (
              <motion.div
                key="name-block"
                className="ci-name"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: phase >= 5 ? 0 : 1,
                  x: phase >= 5 ? "-18vw" : "0%",
                  y: phase >= 5 ? "-2vh" : "0%",
                  scale: phase >= 5 ? 0.78 : 1,
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.3, ease: EASE_CINE },
                }}
                transition={{
                  opacity: { duration: 0.8, ease: EASE_HEAVY },
                  x: { duration: 1.0, ease: EASE_HEAVY },
                  y: { duration: 1.0, ease: EASE_HEAVY },
                  scale: { duration: 1.0, ease: EASE_HEAVY },
                }}
              >
                {/* KRISHNA */}
                <motion.div
                  className="ci-name-line"
                  initial={{ opacity: 0, y: 30, filter: "blur(16px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.75, ease: EASE_CINE }}
                >
                  KRISHNA
                </motion.div>

                {/* VARSHITH */}
                <motion.div
                  className="ci-name-line"
                  initial={{ opacity: 0, y: 30, filter: "blur(16px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.75,
                    delay: 0.1,
                    ease: EASE_CINE,
                  }}
                >
                  VARSHITH
                </motion.div>

                {/* Cinematic light sweep across name */}
                <motion.div
                  className="ci-name-sweep"
                  initial={{ x: "-120%" }}
                  animate={{ x: "220%" }}
                  transition={{
                    duration: 1.8,
                    delay: 0.3,
                    ease: EASE_SMOOTH,
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
