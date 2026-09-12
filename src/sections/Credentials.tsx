"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { ParallaxLayer } from "@/components/ScrollParallax";
import { credentials, type Credential } from "@/lib/data";

const ALL_CATS = ["ALL", "ACHIEVEMENT", "HACKATHON", "MASTERCLASS", "WORKSHOP", "CERTIFICATE", "APPRECIATION"] as const;
type Cat = (typeof ALL_CATS)[number];

export default function Credentials() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [imgError, setImgError] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<Cat>("ALL");
  const scrollRef = useRef<HTMLDivElement>(null);
  const selected = credentials.find((c) => c.id === selectedId);

  const close = useCallback(() => setSelectedId(null), []);
  const goNext = useCallback(() => {
    const idx = credentials.findIndex((c) => c.id === selectedId);
    if (idx < credentials.length - 1) setSelectedId(credentials[idx + 1].id);
  }, [selectedId]);
  const goPrev = useCallback(() => {
    const idx = credentials.findIndex((c) => c.id === selectedId);
    if (idx > 0) setSelectedId(credentials[idx - 1].id);
  }, [selectedId]);

  useEffect(() => {
    if (!selectedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedId, close, goNext, goPrev]);

  const handleImgError = (id: string) =>
    setImgError((prev) => new Set(prev).add(id));

  const filtered = useMemo(
    () => (filter === "ALL" ? credentials : credentials.filter((c) => c.category === filter)),
    [filter],
  );

  /* Scroll the card track */
  const scrollTrack = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.6;
    scrollRef.current.scrollBy({
      left: dir === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="credentials" className="cr-section" aria-label="Credentials">
      <div className="cr-ambient" />

      <div className="wide-grid">
        {/* ── Hero ── */}
        <div className="cr-hero">
          <div className="cr-hero-left">
            <ScrollReveal direction="right" distance={8}>
              <div className="cr-eyebrow-row">
                <span className="cr-eyebrow-line" />
                <span className="text-eyebrow cr-blue">CREDENTIALS</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <ParallaxLayer speed={0.04}>
                <h2 className="cr-heading">
                  CREDENTIALS <span className="cr-blue">&amp;</span> LEARNING
                </h2>
              </ParallaxLayer>
            </ScrollReveal>

            <ScrollReveal delay={0.15} distance={14}>
              <p className="cr-desc">
                A collection of certifications, workshops, hackathons, and recognitions that
                reflect my learning journey and commitment to building, learning, and contributing.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2} distance={14}>
            <div className="cr-stat">
              <span className="cr-stat-num">{credentials.length}+</span>
              <span className="cr-stat-label">
                CERTIFICATIONS
                <br />
                &amp; WORKSHOPS
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Filter Bar ── */}
        <ScrollReveal delay={0.2} distance={10}>
          <div className="cr-filter-bar">
            <nav className="cr-nav" aria-label="Filter credentials">
              {ALL_CATS.map((cat) => {
                const count =
                  cat === "ALL"
                    ? credentials.length
                    : credentials.filter((c) => c.category === cat).length;
                if (count === 0 && cat !== "ALL") return null;
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`cr-nav-btn ${filter === cat ? "cr-nav-active" : ""}`}
                    aria-pressed={filter === cat}
                  >
                    {filter === cat && <span className="cr-nav-dot" />}
                    {cat} ({count})
                  </button>
                );
              })}
            </nav>

            {/* Scroll arrows */}
            <div className="cr-arrows">
              <button
                onClick={() => scrollTrack("left")}
                className="cr-arrow-btn"
                aria-label="Scroll left"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => scrollTrack("right")}
                className="cr-arrow-btn"
                aria-label="Scroll right"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ── Horizontal Card Track ── */}
      <ScrollReveal delay={0.25} distance={16}>
        <div className="cr-track-wrap">
          <div className="cr-track" ref={scrollRef}>
            {/* Left spacer for grid alignment */}
            <div className="cr-track-spacer" />

            {filtered.map((cred, i) => {
              const globalIdx = credentials.indexOf(cred);
              return (
                <button
                  key={cred.id}
                  onClick={() => setSelectedId(cred.id)}
                  className="cr-card group"
                  aria-label={`View certificate: ${cred.title}`}
                >
                  <div className="cr-card-head">
                    <span className="cr-card-num">
                      {String(globalIdx + 1).padStart(2, "0")}
                    </span>
                    <span className="cr-card-cat">{cred.category}</span>
                  </div>

                  <h3 className="cr-card-title">{cred.title}</h3>

                  <div className="cr-card-foot">
                    <div>
                      <p className="cr-card-org">{cred.organisation}</p>
                      <p className="cr-card-date">{cred.date}</p>
                    </div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="cr-card-arrow"
                    >
                      <path
                        d="M5 11L11 5M11 5H6M11 5V10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
              );
            })}

            {/* Right spacer */}
            <div className="cr-track-spacer" />
          </div>
        </div>
      </ScrollReveal>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="cr-lb-backdrop"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`Certificate: ${selected.title}`}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="cr-lb-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={close}
                className="cr-lb-close"
                aria-label="Close certificate viewer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              <div className="cr-lb-img-wrap">
                {selected.certificateImage && !imgError.has(selected.id) ? (
                  <img
                    src={selected.certificateImage}
                    alt={`Certificate: ${selected.title} — ${selected.organisation}`}
                    className="cr-lb-img"
                    onError={() => handleImgError(selected.id)}
                  />
                ) : (
                  <div className="cr-lb-placeholder">
                    <p className="cr-lb-ph-label">CREDENTIAL</p>
                    <p className="cr-lb-ph-title">{selected.title}</p>
                    <p className="cr-lb-ph-org">{selected.organisation}</p>
                  </div>
                )}
              </div>

              <div className="cr-lb-footer">
                <div className="cr-lb-info">
                  <span className="cr-lb-cat">{selected.category}</span>
                  <span className="cr-lb-date">{selected.date}</span>
                </div>
                <div className="cr-lb-nav">
                  <button onClick={goPrev} className="cr-lb-btn" aria-label="Previous">← PREV</button>
                  <button onClick={goNext} className="cr-lb-btn" aria-label="Next">NEXT →</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="cr-rule" />
    </section>
  );
}
