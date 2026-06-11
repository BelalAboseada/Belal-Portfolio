'use client';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [photoLoaded, setPhotoLoaded] = useState(false);

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const wordLeft = line2Ref.current?.querySelector('.word-left');
    const wordRight = line2Ref.current?.querySelector('.word-right');
    const wordScript = line2Ref.current?.querySelector('.word-script');

    if (
      line1Ref.current &&
      wordLeft &&
      wordRight &&
      wordScript &&
      photoRef.current &&
      line3Ref.current &&
      bottomRef.current
    ) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(line1Ref.current, { y: 100, opacity: 0, duration: 0.9 })
        .from(wordLeft, { x: -80, opacity: 0, duration: 0.8 }, '-=0.5')
        .from(wordRight, { x: 80, opacity: 0, duration: 0.8 }, '<')
        .from(wordScript, { scale: 0, rotate: -20, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.4')
        .from(photoRef.current, { y: 80, opacity: 0, duration: 1, ease: 'power2.out' }, '-=0.6')
        .from(line3Ref.current, { y: 30, opacity: 0, duration: 0.7 }, '-=0.4')
        .from(bottomRef.current, { opacity: 0, y: 10, duration: 0.6 }, '-=0.2');
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #08090d 0%, #0b1528 50%, #022644 100%)',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '2vw',
        paddingRight: '2vw',
        paddingTop: '8vh',
        paddingBottom: '0',
        boxSizing: 'border-box',
        // Define local custom font properties to resolve to our Google fonts
        ['--font-display' as string]: 'var(--font-display-hero), "Space Grotesk", sans-serif',
        ['--font-script' as string]: 'var(--font-accent), "Caveat", cursive',
      } as React.CSSProperties}
    >
      {/* CSS overrides for mobile viewports */}
      <style>{`
        @media (max-width: 768px) {
          .hero-line1 {
            font-size: 26vw !important;
          }
          .word-left {
            font-size: 11vw !important;
          }
          .word-right {
            font-size: 11vw !important;
          }
          .word-script {
            font-size: 10vw !important;
            transform: rotate(-8deg) translateY(-2.5vw) !important;
          }
          .hero-photo {
            width: 65vw !important;
            height: 50vh !important;
          }
          .hero-line3 span {
            font-size: 4.5vw !important;
          }
          .hero-tagline {
            font-size: 11px !important;
            max-width: 200px !important;
          }
        }
      `}</style>

      {/* LINE 1 — full width single word */}
      <div
        ref={line1Ref}
        className="hero-line1"
        style={{
          fontSize: '28vw', // Tuned to 28vw to fill edge-to-edge
          fontWeight: 900,
          lineHeight: 0.85,
          color: '#ffffff',
          fontFamily: 'var(--font-display)',
          letterSpacing: '-0.03em',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          position: 'relative',
          zIndex: 10,
        }}
      >
        BELAL
      </div>

      {/* LINE 2 — photo sandwich text containers */}
      <div
        ref={line2Ref}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexShrink: 0,
          lineHeight: 0.85,
          marginTop: '-1.5vw', /* tight against line 1 */
          position: 'relative',
          width: '100%',
        }}
      >
        {/* LEFT WORD — behind the photo */}
        <span
          className="word-left"
          style={{
            fontSize: '15.5vw',
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(255,255,255,0.85)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.03em',
            lineHeight: 0.85,
            position: 'relative',
            zIndex: 10,
          }}
        >
          ABOSEADA
        </span>
      

        {/* RIGHT WORD & ACCENT SCRIPT — stacked relative to photo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            position: 'relative',
          }}
        >
          {/* Accent Script - layered in front of the photo */}
          <span
            className="word-script"
            style={{
              fontSize: '5vw',
              fontStyle: 'italic',
              fontFamily: 'var(--font-script)',
              color: '#38bdf8',
              letterSpacing: '-0.01em',
              lineHeight: 0.85,
              display: 'inline-block',
              transform: 'rotate(-8deg) translateY(-1.5vw)',
              marginLeft: '2vw',
              position: 'relative',
              zIndex: 30, // sandwich: in front of the photo
              textShadow: '0 0 20px rgba(56,189,248,0.2)',
            }}
          >
            &quot;developer&quot;
          </span>
        </div>
      </div>

      {/* ABSOLUTE CENTERED PHOTO — z-index 20 sandwich (covers Line 1/2 text, behind script word) */}
      <div
        ref={photoRef}
        className="hero-photo"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '48vw',
          minWidth: '280px',
          height: '85vh',
          zIndex: 20,
          pointerEvents: 'none',
         
        }}
      >
        <Image
          src="/belal-nobg.png"
          alt="Belal Aboseada"
          fill
          style={{ objectFit: 'contain', objectPosition: 'bottom center', filter: 'grayscale(100%)' }}
          priority
          onLoad={() => setPhotoLoaded(true)}
        />
        {/* Placeholder shown when no image or loading */}
        {!photoLoaded && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(255,255,255,0.03)',
            border: '1px dashed rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.15)', fontSize: '11px', fontFamily: 'monospace',
          }}>
            [ photo ]
          </div>
        )}
      </div>

      {/* LINE 3 — role */}
      <div
        ref={line3Ref}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '2vw',
          marginTop: '1.5vw',
          flexShrink: 0,
          position: 'relative',
          zIndex: 10,
        }}
      >
        <span style={{
          fontSize: 'clamp(13px, 3vw, 46px)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.22)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-display)',
        }}>
          FULL STACK
        </span>
      </div>

      {/* BOTTOM BAR */}
      <div
        ref={bottomRef}
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '2vw',
          right: '2vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          zIndex: 35, // on top of photo
        }}
      >
        {/* Left */}
        <div>
          {/* <p
            className="hero-tagline"
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '13px',
              lineHeight: 1.7,
              maxWidth: '260px',
              marginBottom: '10px',
              fontFamily: 'var(--font-display)',
            }}
          >
            Your code sets your level before you speak.<br />
            I build the kind that puts you a step above.
          </p> */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#4ade80', display: 'inline-block',
              boxShadow: '0 0 8px #4ade80aa',
            }} />
            <span style={{
              color: '#4ade80', fontSize: '10px',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              fontFamily: 'monospace',
            }}>
              Available for hire
            </span>
          </div>
        </div>

        {/* Right */}
        <span style={{
          color: 'rgba(255,255,255,0.18)',
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontFamily: 'monospace',
        }}>
          (Scroll to see work)
        </span>
      </div>

      {/* ── Shadow/fade overlay at bottom edge to transition to next section ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: 'linear-gradient(180deg, transparent, #08090d 100%)',
          pointerEvents: 'none',
          zIndex: 25, // sits above photo (zIndex 20) but below bottom bar (zIndex 35)
        }}
      />

    </section>
  );
}
