import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(labelRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    })
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.3'
      )
      .to(
        bodyRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      .to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3'
      )
      .to(
        scrollRef.current,
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.2'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      className="relative flex flex-col justify-start"
      style={{ zIndex: 1, padding: '80px 6vw 3rem 6vw' }}
    >
      <div className="w-full">
        <span
          ref={labelRef}
          className="inline-block font-heading font-semibold text-xs tracking-[0.08em] uppercase opacity-0 translate-y-3"
          style={{ color: '#0099CC' }}
        >
          BLOG DI ARREDAMENTO UFFICIO
        </span>

        <h1
          ref={titleRef}
          className="font-heading font-bold text-5xl md:text-7xl leading-[0.95] mt-4 opacity-0 translate-y-5"
          style={{
            color: '#000000',
            textShadow: '0 2px 20px rgba(255,255,255,0.9)',
          }}
        >
          Il comfort che ti fa lavorare meglio
        </h1>

        <p
          ref={bodyRef}
          className="font-body text-lg leading-relaxed mt-6 opacity-0 translate-y-4"
          style={{ color: 'rgba(0,0,0,0.7)' }}
        >
          Scopri guide, novit&agrave; e consigli per arredare il tuo ufficio con stile
          ed ergonomia. Dal 2014 selezioniamo le migliori sedie, scrivanie e
          accessori per il workspace italiano.
        </p>

        <div ref={ctaRef} className="mt-8 flex flex-col sm:flex-row gap-4 items-start opacity-0 translate-y-3">
          <a
            href="#novita"
            className="inline-block font-heading font-semibold text-sm tracking-[0.02em] px-9 py-3.5 transition-all duration-300 hover:translate-y-[-1px]"
            style={{
              backgroundColor: '#0099CC',
              color: '#FFFFFF',
              borderRadius: '4px',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#007AA3';
              (e.target as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,153,204,0.3)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#0099CC';
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            Esplora il Blog
          </a>
          <a
            href="https://mobiliufficio.it"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading font-medium text-sm py-3.5 transition-colors duration-300 underline underline-offset-4"
            style={{ color: '#008000' }}
          >
            O scopri i prodotti su mobiliufficio.it &rarr;
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0"
      >
        <div className="relative w-[1px] h-10 overflow-hidden" style={{ backgroundColor: 'rgba(0,153,204,0.2)' }}>
          <div
            className="absolute top-0 left-0 w-full h-3 rounded-full"
            style={{
              backgroundColor: 'rgba(0,153,204,0.5)',
              animation: 'scrollDown 1.8s ease-in-out infinite',
            }}
          />
        </div>
        <style>{`
          @keyframes scrollDown {
            0% { top: -12px; }
            100% { top: 40px; }
          }
        `}</style>
      </div>
    </section>
  );
}
