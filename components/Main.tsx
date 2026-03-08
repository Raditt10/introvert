'use client';

import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────
const sections = [
  {
    phase: '01',
    title: 'Sang Introvert',
    subtitle: 'Bab I · Memahami keheningan dari dalam',
    body: 'Bukan pemalu, bukan anti-sosial. Secara psikologis, introvert adalah mereka yang memperoleh energi melalui kesendirian. Saat dunia terus berteriak menuntut panggung, seorang introvert menemukan kedamaian dan kejernihan di balik layar—menyelami pikirannya sendiri sebelum berbicara.',
    tag: 'TENTANG KITA',
    tagLabel: 'About Us',
    gradientClass: 'text-gradient-hero',
    textSide: 'center',
    floatKanji: ['静', '内', '心'], // Quiet, Inside, Heart
    accent: 'rgba(100, 150, 255, 0.8)',
    isCTA: true,
  },
  {
    phase: '02',
    title: 'Baterai Sosial',
    subtitle: 'Bab II · Paradoks energi dan interaksi',
    body: "Bayangkan sebuah baterai smartphone. Ekstrovert mengisi daya dengan dicolokkan ke keramaian, sedangkan Introvert justru menguras daya di sana. Bagi kita, interaksi yang padat butuh 'di-charge' ulang di kamar yang sepi, dengan buku, musik, atau sekadar hening tanpa distraksi.",
    tag: 'PSIKOLOGI',
    tagLabel: 'Psychology',
    gradientClass: 'text-gradient-cool',
    textSide: 'right',
    floatKanji: ['電', '休', '息'], // Electricity/Battery, Rest, Breath
    accent: 'rgba(100, 150, 255, 0.8)',
    isCTA: true,
  },
  {
    phase: '03',
    title: 'Mitos vs Fakta',
    subtitle: 'Bab III · Meluruskan stereotip yang salah',
    body: "Mitos: Introvert benci orang dan tidak bisa jadi pemimpin. Fakta: Introvert sangat menghargai koneksi yang dalam (meski jumlahnya sedikit) dibanding basa-basi ringan. Bill Gates, Albert Einstein, dan Rosa Parks adalah introvert yang mengubah sejarah dengan kekuatan mendengarkan mereka.",
    tag: 'REALITA',
    tagLabel: 'Reality',
    gradientClass: 'text-gradient-nature',
    textSide: 'left',
    floatKanji: ['真', '実', '知'], // Truth, Reality, Knowledge
    accent: 'rgba(100, 150, 255, 0.8)',
    isCTA: true,
  },
  {
    phase: '04',
    title: 'Kekuatan',
    subtitle: 'Bab IV · Senjata rahasia yang tak bersuara',
    body: "Kita adalah pendengar yang luar biasa, pengamat yang tajam, dan pemikir yang sangat analitis. Dalam dunia yang tak pernah berhenti bicara, kemampuan untuk diam, menyimak, dan merumuskan ide adalah sebuah super-power. Ini bukan kelemahan; ini adalah identitas.",
    tag: 'IDENTITAS',
    tagLabel: 'Identity',
    gradientClass: 'text-gradient-hero',
    textSide: 'center',
    floatKanji: ['力', '深', '考'], // Power, Deep, Think
    accent: 'rgba(100, 150, 255, 0.8)',
    isCTA: true,
  },
];

// ─── Character splitter ────────────────────────────────────────────────────────
function SplitText({ text, charClass }: { text: string; charClass: string }) {
  // We split by words first, then wrap each word in an inline-flex container.
  // This ensures CSS flexbox wraps whole words, not individual characters.
  return (
    <>
      {text.split(' ').map((word, wIdx, arr) => (
        <span key={wIdx} className="inline-flex whitespace-nowrap">
          {word.split('').map((char, cIdx) => (
            <span key={`${wIdx}-${cIdx}`} className={`${charClass} inline-block opacity-0`}>
              {char}
            </span>
          ))}
          {/* Add a space character block between words (except the last one) */}
          {wIdx !== arr.length - 1 && (
            <span className={`${charClass} inline-block opacity-0`}>&nbsp;</span>
          )}
        </span>
      ))}
    </>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ── GSAP scrub animations ────────────────────────────────────────────────────
  useGSAP(
    () => {
      const sectionEls = containerRef.current?.querySelectorAll('.section-block');
      if (!sectionEls) return;

      sectionEls.forEach((section, idx) => {
        const titleChars = section.querySelectorAll('.char-title');
        const bodyChars  = section.querySelectorAll('.char-body');
        const metaEls    = section.querySelectorAll('.txt-meta');

        // Trigger bounds
        const startTitle = idx === 0 ? 'top 100%' : 'top 85%';
        const endTitle   = idx === 0 ? 'top 50%'  : 'top 20%';
        // Memperjauh jarak scroll (endBody) agar efek ketikannya berjalan sangat pelan ngikutin scroll user
        const startBody  = idx === 0 ? 'top 80%'  : 'top 70%';
        const endBody    = 'bottom 30%'; // Berhenti ngetik pas bagian bawah section hampir nyentuh tengah layar

        // 1. Meta Elements Fade Up
        gsap.fromTo(
          metaEls,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: startTitle,
              end: endTitle,
              scrub: 1,
            },
          }
        );

        // 2. Huge Title Character Reveal
        const isAnimeTyping = idx === 0;

        if (isAnimeTyping) {
          // Initialize outline: Transparent fill with a static 1px stroke
          gsap.set(titleChars, { 
            opacity: 1, 
            color: 'rgba(255, 255, 255, 0)', // Fill becomes transparent initially 
            WebkitTextStroke: '1px rgba(75, 137, 220, 0.4)', // The actual outline (kept static permanently, not animated)
            filter: 'blur(2px)' 
          });
          
          ScrollTrigger.create({
            trigger: section,
            start: startTitle,
            onEnter: () => {
              import('animejs').then(({ default: anime }) => {
                anime.remove(titleChars);
                anime.timeline({ loop: true })
                  .add({
                    targets: titleChars,
                    color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'], // Cuma warna isinya yang ditebalkan
                    filter: ['blur(2px)', 'blur(0px)'],
                    scale: [0.95, 1],
                    easing: 'easeOutExpo',
                    duration: 400,
                    delay: anime.stagger(150),
                  })
                  .add({
                    targets: titleChars,
                    color: 'rgba(255, 255, 255, 0)', // Kosongkan lagi isinya jadi transparan (kembali ke state outline bolong)
                    filter: 'blur(2px)',
                    easing: 'easeInExpo',
                    duration: 300,
                    delay: anime.stagger(100, { from: 'last' }),
                    endDelay: 1000,
                  });
              });
            },
            onLeaveBack: () => {
              import('animejs').then(({ default: anime }) => {
                anime.remove(titleChars);
                gsap.set(titleChars, { 
                  color: 'rgba(255, 255, 255, 0)',
                  filter: 'blur(2px)' 
                });
              });
            }
          });
        } else if (idx === 3) {
          // Kekuatan (idx: 3) kembali ke GSAP scrub biasa agar tidak ikut loop Sang Introvert
          gsap.fromTo(
            titleChars,
            { opacity: 0, scale: 1, rotationX: 0, rotationY: 0, x: 0, y: 0 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: 'steps(1)',
              scrollTrigger: {
                trigger: section,
                start: startTitle,
                end: endTitle,
                scrub: 1,
              }
            }
          );
        } else {
          let fromVars: any = { opacity: 0 };
          let toVars: any = {
            opacity: 1,
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            scale: 1,
            stagger: 0.05,
            ease: 'power2.out', // power2.out lebih cantik untuk gerak mundur maju scrub
            scrollTrigger: {
              trigger: section,
              start: startTitle,
              end: endTitle,
              scrub: 1, // Kunci: mengikuti kecepatan & arah berhenti scroll user
            },
          };

          if (idx === 1 || idx === 4) {
            // Baterai Sosial & Suara Kalian: muncul dari kanan
            fromVars.x = 100;
          } else if (idx === 2) {
            // Mitos vs Fakta: muncul dari kiri smooth
            fromVars.x = -150;
            toVars.stagger = 0.08;
          }

          gsap.fromTo(titleChars, fromVars, toVars);
        }

        // 3. Body Text (Typing Effect Otomatis Tanpa Scrub)
        gsap.fromTo(
          bodyChars,
          { opacity: 0 }, // No Y-translation for pure typing feel
          {
            opacity: 1,
            stagger: 0.02, // Kecepatan ngetik per huruf (0.02 detik per huruf)
            ease: 'none', // Linear ease agar ngetik tegas
            scrollTrigger: {
              trigger: section,
              start: startBody,
              end: endBody,
              scrub: false, // Dimatikan agar tidak nyangkut saat scroll berhenti
              toggleActions: 'play reverse play reverse', // Otomatis main terus biarpun user berhenti scroll
            },
          }
        );
      });

      // 4. CTA Scale-in (Baca Selengkapnya)
      const ctaEls = containerRef.current?.querySelectorAll('.txt-cta');
      if (ctaEls) {
        ctaEls.forEach((ctaEl) => {
          gsap.fromTo(
            ctaEl,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              ease: 'power3.out',
              duration: 0.8,
              scrollTrigger: {
                trigger: ctaEl,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // 5. Footer Reveal
      const footerWrap = containerRef.current?.querySelector('.footer-wrap');
      if (footerWrap) {
        gsap.fromTo(
          footerWrap.querySelectorAll('.footer-logo, .footer-desc'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerWrap,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            },
          }
        );
        gsap.fromTo(
          footerWrap.querySelectorAll('.footer-link'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            delay: 0.2,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: footerWrap,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            },
          }
        );
        gsap.fromTo(
          footerWrap.querySelector('.footer-credit'),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            delay: 0.4,
            scrollTrigger: {
              trigger: footerWrap,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: containerRef }
  );

  // ── Anime.js decorative enhancements ────────────────────────────────────────
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    import('animejs').then(({ default: anime }) => {
      // 1. Floating kanji characters (bg)
      const kanjiEls = containerRef.current?.querySelectorAll<HTMLElement>('.kanji-float');
      kanjiEls?.forEach((el, i) => {
        const anim = anime({
          targets: el,
          translateY: [0, -(25 + (i % 3) * 12), 0],
          translateX: [0, ((i % 2 === 0) ? 10 : -10), 0],
          rotate:     [0, (i % 2 === 0 ? 5 : -5), 0],
          opacity:    [0.01, 0.04, 0.01], // Lower max opacity to replace blur depth
          duration:   8000 + i * 1000, // Slower to save cpu/gpu redraws
          loop:       true,
          easing:     'easeInOutSine',
          delay:      i * 600,
        });
        cleanups.push(() => anim.pause());
      });

      // 2. Accent line draws in (IntersectionObserver trigger)
      const accentLines = containerRef.current?.querySelectorAll<HTMLElement>('.accent-line');
      accentLines?.forEach((el) => {
        gsap.set(el, { scaleX: 0, transformOrigin: 'left center' });
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              anime({
                targets:  el,
                scaleX:   [0, 1],
                opacity:  [0, 1],
                duration: 1000,
                easing:   'easeOutElastic(1, .6)',
              });
              observer.disconnect();
            }
          },
          { threshold: 0.5 }
        );
        observer.observe(el);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div ref={containerRef} className="w-full pointer-events-none select-none">
      {sections.map((s, i) => {
        const isLeft     = s.textSide === 'left';
        const isCentered = s.textSide === 'center';

        return (
          <section
            key={i}
            id={`phase-${s.phase}`}
            className="section-block relative w-full flex items-center px-4 sm:px-6 md:px-16 overflow-hidden"
            style={{ minHeight: '100dvh' }}
          >
            {/* Floating kanji (anime.js) */}
            {s.floatKanji.map((k, ki) => (
              <span
                key={ki}
                className="kanji-float absolute pointer-events-none font-bold opacity-5"
                style={{
                  fontSize: 'clamp(5rem, 15vw, 12rem)',
                  top:   `${15 + ki * 25}%`,
                  left:  `${isCentered ? (10 + ki * 30) : isLeft ? (60 + ki * 10) : (5 + ki * 10)}%`,
                  fontFamily: 'serif',
                  zIndex: 0,
                  color: 'rgba(255,255,255,0.5)'
                }}
              >
                {k}
              </span>
            ))}

            {/* Container for content */}
            <div
              className={`
                pointer-events-auto relative z-10 w-full
                flex flex-col
                ${isCentered ? 'items-center text-center' : isLeft ? 'items-start text-left mr-auto' : 'items-end text-right ml-auto'}
              `}
            >
              <div className={`max-w-xl md:max-w-3xl lg:max-w-5xl ${!isCentered && 'glass p-5 sm:p-8 md:p-12'}`}>
                
                {/* Phase & Tag Row */}
                <div
                  className="txt-meta flex flex-wrap items-center gap-4 mb-6 opacity-0"
                  style={{ justifyContent: isCentered ? 'center' : isLeft ? 'flex-start' : 'flex-end' }}
                >
                  <span className="font-mono text-sm tracking-[0.3em] uppercase text-slate-400">
                    Phase {s.phase}
                  </span>
                  <span
                    className="accent-line inline-block w-12 h-[2px] shrink-0 bg-slate-600"
                    style={{ opacity: 0 }}
                  />
                  <span className={`text-sm font-bold tracking-widest uppercase ${s.gradientClass}`}>
                    {s.tag}
                  </span>
                </div>

                {/* HUGE Title — character split */}
                <h2
                  className={`font-heading text-4xl sm:text-5xl md:text-7xl lg:text-[8rem] xl:text-[9rem] font-black mb-4 leading-[0.85] tracking-tighter ${s.gradientClass}`}
                  aria-label={s.title}
                  style={{
                    paddingBottom: '0.2em',
                    marginBottom: '-0.1em'
                  }}
                >
                  <SplitText text={s.title} charClass="char-title" />
                </h2>

                {/* Subtitle */}
                <p className="txt-meta text-sm sm:text-base md:text-xl lg:text-3xl text-slate-300 font-light tracking-tight mb-6 sm:mb-8 opacity-0">
                  {s.subtitle}
                </p>

              {/* Divider */}
              <div
                className="txt-meta h-px w-16 mb-5 opacity-0"
                style={{
                  background: `linear-gradient(90deg, ${s.accent}, transparent)`,
                  margin: isCentered ? '0 auto 1.25rem' : undefined,
                }}
              />

                {/* Body — character split */}
                <p
                className={`text-sm md:text-base text-slate-300 leading-relaxed ${isCentered ? 'text-center' : ''}`}
                  aria-label={s.body}
                >
                  <SplitText text={s.body} charClass="char-body" />
                </p>

                {/* CTA / Baca Selengkapnya (Hanya untuk Bab I - IV) */}
                {s.isCTA !== false && s.phase !== '05' && (
                  <div className="txt-cta mt-12 flex flex-col opacity-0" style={{ alignItems: isCentered ? 'center' : isLeft ? 'flex-start' : 'flex-end' }}>
                     <button
                        className="baca-selengkapnya-btn group relative px-8 py-3 overflow-hidden rounded-full border border-slate-700/50 bg-slate-900/50 text-xs font-bold tracking-widest text-slate-300 uppercase backdrop-blur-sm transition-all hover:text-white"
                        data-chapter={s.phase}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget.querySelector('.hover-fill');
                          import('animejs').then(({ default: anime }) => {
                            anime.remove(el);
                            anime({
                              targets: el,
                              scale: [0, 1.5],
                              opacity: [0, 1],
                              duration: 400,
                              easing: 'easeOutSine'
                            });
                          });
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget.querySelector('.hover-fill');
                          import('animejs').then(({ default: anime }) => {
                            anime.remove(el);
                            anime({
                              targets: el,
                              scale: 0,
                              opacity: 0,
                              duration: 300,
                              easing: 'easeInSine'
                            });
                          });
                        }}
                        onClick={(e) => {
                           const btn = e.currentTarget;
                           const chapterNum = parseInt(btn.getAttribute('data-chapter') || '1');
                           import('animejs').then(({ default: anime }) => {
                              anime({
                                targets: btn,
                                scale: [1, 0.9, 1],
                                duration: 300,
                                easing: 'easeOutElastic(1, .8)',
                                complete: () => {
                                  router.push(`/bab/${chapterNum}`);
                                }
                              });
                           });
                        }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Baca Selengkapnya
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                        {/* The expanding circle fill effect via anime.js */}
                        <span className="hover-fill absolute left-1/2 top-1/2 w-full pt-[100%] rounded-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20 -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 pointer-events-none mix-blend-screen" />
                      </button>
                  </div>
                )}
              </div>
            </div>

            {/* Scroll hint (only first section) */}
            {i === 0 && (
              <div className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-3 opacity-60">
                <span className="text-xs font-mono tracking-[0.4em] text-slate-400 uppercase">Scroll to Evolve</span>
                <div className="w-[2px] h-16 bg-gradient-to-b from-white via-slate-500 to-transparent animate-pulse rounded-full" />
              </div>
            )}
          </section>
        );
      })}

      {/* ── Ruang Cerita (User Stories Section) ── */}
      <section id="phase-05" className="section-block relative w-full min-h-[100dvh] flex items-center px-4 sm:px-6 md:px-16 overflow-hidden z-10 pointer-events-auto">
        {/* Floating kanji specific to Phase 5 */}
        <span
          className="kanji-float absolute pointer-events-none font-bold opacity-5"
          style={{
            fontSize: 'clamp(5rem, 15vw, 12rem)',
            top: '20%',
            left: '10%',
            color: 'inherit',
            filter: 'blur(2px)'
          }}
        >話</span>
        <span
          className="kanji-float absolute pointer-events-none font-bold opacity-5"
          style={{
            fontSize: 'clamp(5rem, 15vw, 12rem)',
            top: '60%',
            left: '30%',
            color: 'inherit',
            filter: 'blur(4px)'
          }}
        >声</span>

        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16 relative z-10">
          
          {/* Left: Card Stack */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start relative min-h-[320px] sm:min-h-[400px] lg:min-h-[450px]">
            <StoryStack />
          </div>

          {/* Right: Text and CTA (like Phase 03 layout but right aligned) */}
          <div className="w-full lg:w-1/2 flex flex-col items-end text-right ml-auto">
            <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">
              <div className="txt-meta opacity-0 flex flex-wrap items-center justify-end gap-4 mb-6">
                <span className="font-mono text-sm tracking-[0.3em] uppercase text-slate-400">
                  Phase 05
                </span>
                <span className="accent-line inline-block w-12 h-[2px] shrink-0 bg-slate-600" />
                <span className="text-sm font-bold tracking-widest uppercase text-gradient-cool">
                  Ruang Cerita
                </span>
              </div>

              <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] xl:text-[8rem] font-black mb-4 leading-[0.85] tracking-tighter text-gradient-hero flex flex-col items-end">
                <div className="flex whitespace-nowrap">
                  {'Suara'.split('').map((char, index) => (
                    <span key={`s-${index}`} className="char-title inline-block opacity-0">
                      {char}
                    </span>
                  ))}
                </div>
                <div className="flex whitespace-nowrap">
                  {'Kalian'.split('').map((char, index) => (
                    <span key={`k-${index}`} className="char-title inline-block opacity-0">
                      {char}
                    </span>
                  ))}
                </div>
              </h2>

              <p className="txt-meta opacity-0 text-sm sm:text-base md:text-xl lg:text-3xl text-slate-300 font-light tracking-tight mb-6 sm:mb-8">
                Bab V · Gema dalam keheningan
              </p>

              <div className="txt-meta opacity-0 h-px w-16 mb-6 bg-slate-700" style={{ marginLeft: 'auto' }} />

              <p 
                className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-lg ml-auto mb-8 sm:mb-10 text-right"
                aria-label="Setiap introvert memiliki perjalanan keheningannya sendiri. Baca kisah mereka yang menemukan kekuatan dalam kesunyian, dan geser kartu untuk mendengar lebih banyak. Anda tidak sendirian."
              >
                <SplitText text="Setiap introvert memiliki perjalanan keheningannya sendiri. Baca kisah mereka yang menemukan kekuatan dalam kesunyian, dan geser kartu untuk mendengar lebih banyak. Anda tidak sendirian." charClass="char-body" />
              </p>

              <div className="txt-cta opacity-0 flex flex-col items-end gap-4 mt-2">
                <p className="text-xs font-mono tracking-[0.3em] text-slate-500 uppercase mb-1">Bagikan Cerita Anda</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/6289661916855?text=Halo%2C%20saya%20ingin%20berbagi%20cerita%20introvert%20saya..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-3 px-5 sm:px-6 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/15 hover:border-emerald-400/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="text-xs font-bold tracking-widest uppercase">WhatsApp</span>
                  </a>
                  {/* Email */}
                  <a
                    href="mailto:iniakuraditt@gmail.com?subject=Cerita%20Introvert%20Saya&body=Halo%2C%20saya%20ingin%20berbagi%20cerita%20introvert%20saya..."
                    className="group flex items-center justify-center gap-3 px-5 sm:px-6 py-3 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 hover:bg-blue-500/15 hover:border-blue-400/60 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <span className="text-xs font-bold tracking-widest uppercase">Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Footer Sederhana & Elegan ── */}
      <footer className="footer-wrap relative w-full px-4 sm:px-6 md:px-16 py-6 sm:py-8 md:py-12 border-t border-slate-800/50 bg-slate-950/30 backdrop-blur-sm overflow-hidden z-20 pointer-events-auto">
        {/* Subtle top gradient line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-8 pointer-events-none">
          <div className="flex flex-col items-center md:items-start gap-1">
            <h3 className="footer-logo font-heading tracking-widest text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500 uppercase opacity-0">Sang Introvert</h3>
            <p className="footer-desc text-[10px] md:text-xs text-slate-500 font-mono tracking-[0.3em] uppercase opacity-0">Menemukan suara dalam jeda.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 pointer-events-auto">
            {['I', 'II', 'III', 'IV', 'V'].map((bab, index) => (
              <a 
                key={index} 
                href={`#phase-0${index + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(`phase-0${index + 1}`)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="footer-link group relative text-[10px] md:text-xs text-slate-400 hover:text-white transition-colors uppercase tracking-[0.2em] font-semibold opacity-0"
              >
                Bab {bab}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="footer-credit text-[10px] text-slate-600 font-mono tracking-widest uppercase text-center md:text-right opacity-0 flex flex-col items-center md:items-end">
            <span>&copy; {new Date().getFullYear()} Sang Introvert.</span>
            <span className="text-slate-700 mt-1">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Story Stack Interactive Component ──────────────────────────────────────────
const MOCK_STORIES = [
  {
    id: 1,
    text: "Dulu saya sering pura-pura sibuk di HP saat kumpul keluarga besar. Sekarang saya paham, saya hanya butuh jeda untuk me-recharge energi. Mengatakannya secara jujur membuat saya jauh lebih tenang.",
    author: "Rina Saraswati",
    role: "Desainer Grafis",
    initial: "R"
  },
  {
    id: 2,
    text: "Dunia korporat sangat berisik. Saya sempat merasa salah profesi karena jarang bicara di meeting. Sampai bos saya bilang ide-ide tenang saya via email yang menyelamatkan proyek.",
    author: "Bimo Anggara",
    role: "Data Analyst",
    initial: "B"
  },
  {
    id: 3,
    text: "Akhir pekan terbaik saya bukanlah di kafe hype, tapi di kamar, hujan turun, dan buku bagus di tangan. Saya tidak kesepian, saya menikmati waktu luang bersama pikiran saya sendiri.",
    author: "Kevin T.",
    role: "Penulis Lepas",
    initial: "K"
  }
];

function StoryStack() {
  const [cards, setCards] = useState(MOCK_STORIES);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    // Initial stacking animation
    import('animejs').then(({ default: anime }) => {
      const els = containerRef.current?.querySelectorAll('.story-card');
      if (els) {
        anime.set(els, { 
          translateY: (_: any, i: number) => i * 20, 
          translateX: (_: any, i: number) => i * 10,
          scale: (_: any, i: number) => 1 - (i * 0.05),
          zIndex: (_: any, i: number) => MOCK_STORIES.length - i,
          opacity: (_: any, i: number) => 1 - (i * 0.2)
        });
      }
    });
  }, []);

  const handleNext = async () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    
    const anime = (await import('animejs')).default;
    const els = containerRef.current?.querySelectorAll('.story-card');
    if (!els || els.length === 0) return;

    const topCard = els[0] as HTMLElement;
    
    // 1. Throw the top card out smoothly
    anime({
      targets: topCard,
      translateX: -350,
      translateY: 50,
      rotateZ: -20,
      opacity: 0,
      duration: 600,
      easing: 'easeOutQuint',
    });

    // 2. Midway through the throw, reset state and glide the rest of the cards into place
    setTimeout(() => {
        setCards((prev: typeof MOCK_STORIES) => {
          const newArr = [...prev];
          const first = newArr.shift();
          if (first) newArr.push(first);
          return newArr;
        });

        // Let React render the DOM changes
        setTimeout(() => {
           const newEls = containerRef.current?.querySelectorAll('.story-card');
           if (newEls) {
              const lastCard = newEls[newEls.length - 1];
              // Pre-position the card that is moving to the back so it sweeps in from the right
              anime.set(lastCard, { 
                translateX: 150, 
                translateY: 60, 
                rotateZ: 10,
                scale: 0.85, 
                opacity: 0 
              });

              // Glide all cards smoothly into their final positions with a slight stagger
              anime({
                targets: newEls,
                translateY: (_: any, i: number) => i * 20, 
                translateX: (_: any, i: number) => i * 10,
                rotateZ: 0,
                scale: (_: any, i: number) => 1 - (i * 0.05),
                zIndex: (_: any, i: number) => MOCK_STORIES.length - i,
                opacity: (_: any, i: number) => 1 - (i * 0.2),
                duration: 900,
                delay: anime.stagger(40),
                easing: 'easeOutExpo',
                complete: () => {
                  isAnimating.current = false;
                }
              });
           }
        }, 50);

    }, 150); // Start the next sequence early to make it overlap fluidly
  };

  useEffect(() => {
    // Auto cycle the cards every 20 seconds
    const intervalId = setInterval(() => {
      handleNext();
    }, 20000); // 20 seconds, as requested

    return () => clearInterval(intervalId);
  }, [cards]); // Needs to re-trigger or hold reference (though handleNext recreates, it accesses newest context indirectly through functional update)

  return (
    <div ref={containerRef} className="relative w-full max-w-sm sm:max-w-md ml-0 lg:ml-24" style={{ minHeight: '300px' }}>
       {cards.map((story: typeof MOCK_STORIES[0], i: number) => (
         <div 
           key={story.id} 
           className="story-card absolute top-0 left-0 w-full glass bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 md:p-10 flex flex-col cursor-pointer transition-shadow hover:shadow-[0_0_30px_rgba(75,137,220,0.2)] select-none"
           onClick={handleNext}
           style={{ minHeight: '300px' }}
         >
           <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 flex-grow italic">
             "{story.text}"
           </p>
           <div className="flex items-center gap-4 mt-auto">
             <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-base sm:text-lg shadow-inner">
               {story.initial}
             </div>
             <div>
               <h4 className="font-bold text-white text-sm whitespace-nowrap">{story.author}</h4>
               <span className="text-xs text-slate-500 whitespace-nowrap">{story.role}</span>
             </div>
           </div>
           
           {/* Swipe hint on top card only */}
           {i === 0 && (
             <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-2 items-center opacity-50 animate-pulse pointer-events-none">
               <span className="text-[10px] tracking-widest uppercase font-mono bg-slate-800/50 px-3 py-1 rounded-full backdrop-blur-md">Tap to swipe card</span>
             </div>
           )}
         </div>
       ))}
    </div>
  );
}

