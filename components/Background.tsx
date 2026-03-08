'use client';

import { useEffect, useRef } from 'react';

const CHARACTERS = [
  {
    src: '/char1.png',
    alt: 'Anime girl reading – left side',
    style: {
      left: '-3vw',
      top: '4%',
      width: 'clamp(180px, 22vw, 420px)',
    },
    fromSide: 'left',
  },
  {
    src: '/char2.png',
    alt: 'Anime boy rooftop – right side',
    style: {
      right: '-3vw',
      top: '26%',
      width: 'clamp(180px, 22vw, 420px)',
    },
    fromSide: 'right',
  },
  {
    src: '/char3.png',
    alt: 'Anime girl library – left side',
    style: {
      left: '-3vw',
      top: '50%',
      width: 'clamp(180px, 22vw, 420px)',
    },
    fromSide: 'left',
  },
  {
    src: '/char4.png',
    alt: 'Anime character blanket – right side',
    style: {
      right: '-3vw',
      top: '72%',
      width: 'clamp(170px, 21vw, 400px)',
    },
    fromSide: 'right',
  },
];

export default function AnimeBackground() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let animeLib: any;

    import('animejs').then(({ default: anime }) => {
      animeLib = anime;

      refs.current.forEach((el, i) => {
        if (!el) return;

        // Gentle floating idle loop
        anime({
          targets: el,
          translateY: [0, i % 2 === 0 ? -18 : 18, 0],
          translateX: [0, i % 2 === 0 ? 6 : -6, 0],
          rotate: [0, i % 2 === 0 ? 1.5 : -1.5, 0],
          duration: 7000 + i * 800,
          loop: true,
          easing: 'easeInOutSine',
          delay: i * 700,
        });

        // IntersectionObserver — slide in when entering viewport
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              anime({
                targets: el,
                opacity: [0, 0.18],
                translateX: [i % 2 === 0 ? -60 : 60, 0],
                duration: 1400,
                easing: 'easeOutExpo',
              });
              observer.disconnect();
            }
          },
          { threshold: 0.05 }
        );
        observer.observe(el);
      });
    });

    return () => {
      if (animeLib) {
        refs.current.forEach((el) => {
          if (el) animeLib.remove(el);
        });
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden hidden md:block"
      aria-hidden="true"
    >
      {CHARACTERS.map((char, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          className="absolute opacity-0"
          style={{
            ...char.style,
            WebkitMaskImage:
              i % 2 === 0
                ? 'linear-gradient(to right, rgba(0,0,0,0.9) 50%, transparent 100%)'
                : 'linear-gradient(to left, rgba(0,0,0,0.9) 50%, transparent 100%)',
            maskImage:
              i % 2 === 0
                ? 'linear-gradient(to right, rgba(0,0,0,0.9) 50%, transparent 100%)'
                : 'linear-gradient(to left, rgba(0,0,0,0.9) 50%, transparent 100%)',
            // 'screen' blend mode: dark/black pixels become fully transparent
            // so the rectangular image box disappears against the dark background
            filter: 'saturate(0.5) brightness(1.4) contrast(1.1)',
            mixBlendMode: 'screen',
          }}
        >
          <img
            src={char.src}
            alt={char.alt}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
