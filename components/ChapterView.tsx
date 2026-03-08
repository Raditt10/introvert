'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Chapter, ChapterParagraph, references, sourceInfo } from '@/lib/chapters';

// ─── Typing cursor blink ────────────────────────────────────────────────────
function Cursor({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <span className="inline-block w-[2px] h-[1.1em] bg-slate-300 ml-[1px] align-middle animate-cursor-blink" />
  );
}

// ─── Single paragraph with typing effect ─────────────────────────────────────
function TypingParagraph({
  paragraph,
  onComplete,
  startTyping,
  speed = 18,
}: {
  paragraph: ChapterParagraph;
  onComplete: () => void;
  startTyping: boolean;
  speed?: number;
}) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completedRef = useRef(false);

  const finishTyping = useCallback(() => {
    setDisplayed(paragraph.text);
    setDone(true);
    if (!completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  }, [paragraph.text, onComplete]);

  useEffect(() => {
    if (!startTyping) return;

    // Heading types faster
    const actualSpeed = paragraph.isHeading ? speed * 0.6 : speed;

    intervalRef.current = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current >= paragraph.text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        finishTyping();
      } else {
        setDisplayed(paragraph.text.slice(0, indexRef.current + 1));
      }
    }, actualSpeed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startTyping, paragraph.text, paragraph.isHeading, speed, finishTyping]);

  // Skip on click
  const handleClick = () => {
    if (!done && startTyping) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      finishTyping();
    }
  };

  if (paragraph.isHeading) {
    return (
      <h3
        className="novel-heading font-heading text-xl md:text-2xl font-bold text-slate-100 mt-10 mb-4 tracking-tight cursor-pointer select-none"
        onClick={handleClick}
      >
        <span className="heading-accent inline-block w-1 h-6 mr-3 rounded-full bg-blue-400/80 align-middle" />
        {displayed}
        <Cursor visible={startTyping && !done} />
      </h3>
    );
  }

  if (paragraph.isQuote) {
    return (
      <blockquote
        className="novel-quote relative my-8 pl-6 border-l-2 border-blue-400/40 italic text-slate-400 text-sm md:text-base leading-relaxed cursor-pointer select-none"
        onClick={handleClick}
      >
        {displayed}
        <Cursor visible={startTyping && !done} />
      </blockquote>
    );
  }

  return (
    <p
      className={`novel-paragraph text-sm md:text-base leading-[1.9] mb-6 cursor-pointer select-none ${
        paragraph.isBold ? 'text-slate-200 font-medium' : 'text-slate-400'
      }`}
      onClick={handleClick}
    >
      {displayed}
      <Cursor visible={startTyping && !done} />
    </p>
  );
}

// ─── Main Chapter View ───────────────────────────────────────────────────────
export default function ChapterView({ chapter }: { chapter: Chapter }) {
  const router = useRouter();
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [showEpigraph, setShowEpigraph] = useState(false);
  const [epigraphDone, setEpigraphDone] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Entrance animation sequence
  useEffect(() => {
    const t1 = setTimeout(() => setShowEpigraph(true), 600);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (epigraphDone) {
      const t = setTimeout(() => setShowContent(true), 400);
      return () => clearTimeout(t);
    }
  }, [epigraphDone]);

  // Auto-scroll to latest paragraph
  useEffect(() => {
    if (!contentRef.current) return;
    const paragraphs = contentRef.current.querySelectorAll('.novel-paragraph, .novel-quote, .novel-heading');
    const last = paragraphs[paragraphs.length - 1];
    if (last) {
      last.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentParagraph]);

  const handleParagraphComplete = useCallback(() => {
    setCurrentParagraph((prev) => {
      const next = prev + 1;
      if (next >= chapter.paragraphs.length) {
        setAllDone(true);
      }
      return next;
    });
  }, [chapter.paragraphs.length]);

  // Navigate between chapters
  const goToChapter = (id: number) => {
    router.push(`/bab/${id}`);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#0a0f1e] text-slate-300 relative overflow-hidden"
    >
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0a0f1e] to-[#0d1117]" />
        {chapter.kanji.map((k, i) => (
          <span
            key={i}
            className="absolute font-serif font-bold pointer-events-none select-none opacity-[0.02]"
            style={{
              fontSize: 'clamp(8rem, 20vw, 18rem)',
              top: `${15 + i * 28}%`,
              left: `${5 + i * 30}%`,
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            {k}
          </span>
        ))}
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* Top navigation bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0f1e]/80 border-b border-slate-800/50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-xs font-mono tracking-widest text-slate-500 hover:text-white transition-colors uppercase group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali
          </button>

          <span className="font-mono text-[10px] tracking-[0.4em] text-slate-600 uppercase">
            Phase {chapter.phase}
          </span>

          {/* Chapter navigation dots */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((id) => (
              <button
                key={id}
                onClick={() => goToChapter(id)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  id === chapter.id
                    ? 'bg-blue-400 scale-125'
                    : 'bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Bab ${id}`}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Chapter header */}
      <header className="relative z-10 pt-16 md:pt-24 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="chapter-entrance opacity-0 translate-y-8 animate-chapter-fade-in">
            <span className="font-mono text-[10px] tracking-[0.5em] text-slate-600 uppercase block mb-4">
              {chapter.subtitle}
            </span>
            <h1
              className={`font-heading text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] mb-6 ${chapter.gradientClass}`}
            >
              {chapter.title}
            </h1>
            <div
              className="h-[2px] w-16 rounded-full mb-8"
              style={{
                background: 'linear-gradient(90deg, rgba(100,150,255,0.8), transparent)',
              }}
            />
          </div>

          {/* Epigraph */}
          {chapter.epigraph && showEpigraph && (
            <div className="animate-chapter-fade-in opacity-0">
              <blockquote className="text-base md:text-lg italic text-slate-500 border-l-2 border-slate-700 pl-6 max-w-xl leading-relaxed">
                <EpigraphTyping
                  text={chapter.epigraph}
                  onComplete={() => setEpigraphDone(true)}
                />
              </blockquote>
            </div>
          )}
        </div>
      </header>

      {/* Novel content */}
      {showContent && (
        <main className="relative z-10 px-6 pb-32">
          <div ref={contentRef} className="max-w-3xl mx-auto animate-chapter-fade-in opacity-0">
            {/* Page texture line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-12" />

            {chapter.paragraphs.map((para, i) => (
              <TypingParagraph
                key={i}
                paragraph={para}
                startTyping={i <= currentParagraph && showContent}
                onComplete={handleParagraphComplete}
                speed={16}
              />
            ))}

            {/* Skip all button */}
            {!allDone && showContent && (
              <div className="fixed bottom-8 right-8 z-50">
                <button
                  onClick={() => {
                    setCurrentParagraph(chapter.paragraphs.length);
                    setAllDone(true);
                  }}
                  className="px-4 py-2 rounded-full text-[10px] font-mono tracking-widest uppercase bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/50 backdrop-blur-sm transition-all hover:bg-slate-700/80"
                >
                  Lewati Animasi ▸▸
                </button>
              </div>
            )}

            {/* Sources section */}
            {allDone && (
              <div className="mt-20 animate-chapter-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-12" />

                {/* Source info card */}
                <div className="glass p-8 md:p-10 mb-10">
                  <h3 className="font-heading text-lg font-bold text-slate-200 mb-6 tracking-tight flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Sumber Penelitian
                  </h3>

                  <div className="space-y-3 text-sm text-slate-400">
                    <p>
                      <span className="text-slate-500 font-mono text-xs">Judul:</span>{' '}
                      <span className="text-slate-300 font-medium">{sourceInfo.fullTitle}</span>
                    </p>
                    <p>
                      <span className="text-slate-500 font-mono text-xs">Jurnal:</span>{' '}
                      {sourceInfo.journal}, {sourceInfo.volume} ({sourceInfo.year})
                    </p>
                    <p>
                      <span className="text-slate-500 font-mono text-xs">DOI:</span>{' '}
                      <span className="font-mono text-blue-400/70 text-xs">{sourceInfo.doi}</span>
                    </p>
                    <div className="pt-2">
                      <span className="text-slate-500 font-mono text-xs block mb-2">Penulis:</span>
                      {sourceInfo.authors.map((a, i) => (
                        <p key={i} className="ml-4 text-slate-400">
                          {a.name}{' '}
                          <span className="text-slate-600 text-xs">— {a.affiliation}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* References toggle */}
                <button
                  onClick={() => setShowSources(!showSources)}
                  className="w-full flex items-center justify-between px-6 py-4 rounded-2xl border border-slate-800/50 bg-slate-900/30 text-slate-400 hover:text-white transition-colors group"
                >
                  <span className="text-xs font-mono tracking-widest uppercase">Daftar Pustaka</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${showSources ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showSources && (
                  <div className="mt-4 space-y-3 pl-6 border-l border-slate-800/50 animate-chapter-fade-in opacity-0">
                    {references.map((ref, i) => (
                      <p key={i} className="text-xs text-slate-500 leading-relaxed font-mono">
                        [{i + 1}] {ref}
                      </p>
                    ))}
                  </div>
                )}

                {/* Chapter navigation */}
                <div className="mt-16 flex items-center justify-between">
                  {chapter.id > 1 ? (
                    <button
                      onClick={() => goToChapter(chapter.id - 1)}
                      className="group flex items-center gap-3 text-sm text-slate-500 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      <span className="font-mono text-xs tracking-widest uppercase">Bab Sebelumnya</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {chapter.id < 4 ? (
                    <button
                      onClick={() => goToChapter(chapter.id + 1)}
                      className="group flex items-center gap-3 text-sm text-slate-500 hover:text-white transition-colors"
                    >
                      <span className="font-mono text-xs tracking-widest uppercase">Bab Selanjutnya</span>
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push('/')}
                      className="group flex items-center gap-3 text-sm text-slate-500 hover:text-white transition-colors"
                    >
                      <span className="font-mono text-xs tracking-widest uppercase">Kembali ke Beranda</span>
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {/* Reading progress bar */}
      <ReadingProgress total={chapter.paragraphs.length} current={currentParagraph} />
    </div>
  );
}

// ─── Epigraph typing (simpler, single text block) ─────────────────────────────
function EpigraphTyping({ text, onComplete }: { text: string; onComplete: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current >= text.length) {
        clearInterval(interval);
        setDisplayed(text);
        setDone(true);
        onComplete();
      } else {
        setDisplayed(text.slice(0, indexRef.current + 1));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <>
      {displayed}
      <Cursor visible={!done} />
    </>
  );
}

// ─── Reading progress indicator ──────────────────────────────────────────────
function ReadingProgress({ total, current }: { total: number; current: number }) {
  const pct = total > 0 ? Math.min((current / total) * 100, 100) : 0;

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[60]">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 transition-all duration-700 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
