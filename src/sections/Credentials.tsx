"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { credentials } from "@/lib/data";

export default function Credentials() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [imgError, setImgError] = useState<Set<string>>(new Set());
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

  const categories = ["HACKATHON", "MASTERCLASS", "WORKSHOP", "CERTIFICATE"] as const;

  const handleImgError = (id: string) => {
    setImgError((prev) => new Set(prev).add(id));
  };

  return (
    <section id="credentials" className="py-20 md:py-28 relative" aria-label="Credentials">
      <div className="container-grid">
        <ScrollReveal>
          <p className="section-number mb-4">CREDENTIALS</p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="text-h1 text-[var(--color-text-primary)] mb-6">
            CREDENTIALS &amp; LEARNING
          </h2>
        </ScrollReveal>

        {/* Category counts */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-6 mb-10">
            {categories.map((cat) => {
              const count = credentials.filter((c) => c.category === cat).length;
              return (
                <p key={cat} className="text-[10px] font-bold tracking-[0.15em] text-[var(--color-text-primary)]">
                  {cat}{" "}
                  <span className="text-[var(--color-text-muted)] font-normal">
                    ({count})
                  </span>
                </p>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Credential rows */}
        <div>
          {credentials.map((cred, i) => (
            <ScrollReveal key={cred.id} delay={i * 0.03}>
              <button
                onClick={() => setSelectedId(cred.id)}
                className="w-full text-left grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-5 border-t border-[var(--color-border)] hover:bg-[var(--color-bg-secondary)] transition-colors duration-200 px-4 -mx-4 group"
                data-cursor="VIEW"
                aria-label={`View certificate: ${cred.title}`}
              >
                <p className="text-xs font-mono text-[var(--color-text-muted)] md:col-span-1">
                  {cred.date}
                </p>
                <p className="text-[10px] font-bold tracking-[0.12em] text-[var(--color-accent)] md:col-span-2 uppercase">
                  {cred.category}
                </p>
                <p className="text-sm text-[var(--color-text-primary)] md:col-span-6 group-hover:text-[var(--color-accent)] transition-colors">
                  {cred.title}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] md:col-span-3 md:text-right">
                  {cred.organisation}
                </p>
              </button>
            </ScrollReveal>
          ))}
          <div className="border-t border-[var(--color-border)]" />
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-[var(--color-bg-primary)]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`Certificate: ${selected.title}`}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Certificate image or placeholder */}
              <div className="w-full aspect-[16/11] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center mb-6 overflow-hidden">
                {selected.certificateImage && !imgError.has(selected.id) ? (
                  <img
                    src={selected.certificateImage}
                    alt={`Certificate: ${selected.title}`}
                    className="w-full h-full object-contain"
                    onError={() => handleImgError(selected.id)}
                  />
                ) : (
                  <div className="text-center px-8">
                    <p className="text-[10px] tracking-widest text-[var(--color-accent)] mb-4">
                      CREDENTIAL
                    </p>
                    <p className="text-xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-3">
                      {selected.title}
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                      {selected.organisation}
                    </p>
                    <p className="text-[9px] font-mono text-[var(--color-text-muted)]">
                      Certificate image not yet added
                    </p>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <p className="text-[10px] font-bold tracking-[0.15em] text-[var(--color-accent)]">
                    {selected.category}
                  </p>
                  <p className="text-xs font-mono text-[var(--color-text-muted)]">
                    {selected.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={goPrev}
                    className="px-4 py-2.5 border border-[var(--color-border)] text-[10px] tracking-[0.15em] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
                    aria-label="Previous"
                  >
                    ← PREV
                  </button>
                  <button
                    onClick={goNext}
                    className="px-4 py-2.5 border border-[var(--color-border)] text-[10px] tracking-[0.15em] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
                    aria-label="Next"
                  >
                    NEXT →
                  </button>
                  <button
                    onClick={close}
                    className="px-5 py-2.5 bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-[10px] font-bold tracking-[0.15em] hover:bg-[var(--color-accent)] hover:text-white transition-colors ml-2"
                    aria-label="Close"
                  >
                    CLOSE ✕
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-border)]" />
    </section>
  );
}
