import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Weight, ShieldCheck, Factory } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const productImages = [
  '/product-aura.jpg',
  '/featured-1.jpg',
  '/news-1.jpg',
  '/hero-fallback.jpg',
];

export default function ProductSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % productImages.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + productImages.length) % productImages.length);

  return (
    <section
      ref={sectionRef}
      id="prodotti"
      className="relative py-20 px-4"
      style={{ zIndex: 1 }}
    >
      <div
        ref={contentRef}
        className="max-w-[1200px] mx-auto p-8 md:p-16 rounded-xl"
        style={{
          backgroundColor: 'rgba(255,255,255,0.92)',
          border: '1px solid #E5E5E5',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div>
            <span
              className="inline-block font-heading font-semibold text-xs tracking-[0.08em] uppercase mb-4"
              style={{ color: '#0099CC' }}
            >
              PRODOTTO DEL MESE
            </span>

            <h2
              className="font-heading font-semibold text-4xl md:text-5xl leading-tight"
              style={{ color: '#000000' }}
            >
              Sedia Ergonomica AURA Pro
            </h2>

            <p
              className="font-body text-lg mt-6 leading-relaxed"
              style={{ color: 'rgba(0,0,0,0.65)' }}
            >
              Design italiano incontra l&apos;ergonomia avanzata. Schienale in rete
              traspirante, braccioli 4D regolabili e seduta in memory foam ad alta
              densit&agrave;.
            </p>

            {/* Specs */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2">
                <Weight size={16} style={{ color: '#008000' }} />
                <span className="font-heading font-semibold text-xs tracking-[0.08em] uppercase" style={{ color: '#6B7280' }}>
                  Peso max: 150kg
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} style={{ color: '#008000' }} />
                <span className="font-heading font-semibold text-xs tracking-[0.08em] uppercase" style={{ color: '#6B7280' }}>
                  Garanzia: 5 anni
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Factory size={16} style={{ color: '#008000' }} />
                <span className="font-heading font-semibold text-xs tracking-[0.08em] uppercase" style={{ color: '#6B7280' }}>
                  Made in Italy
                </span>
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://mobiliufficio.it"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 font-heading font-medium text-sm tracking-[0.02em] px-7 py-3 border transition-all duration-300 hover:bg-[#008000] hover:text-white hover:border-[#008000]"
              style={{
                borderColor: '#008000',
                color: '#008000',
                borderRadius: '4px',
              }}
            >
              Vedi su mobiliufficio.it &rarr;
            </a>
          </div>

          {/* Right Column - Image Carousel */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg aspect-[4/5]">
              {productImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`AURA Pro - vista ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  style={{ opacity: i === currentSlide ? 1 : 0 }}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-3 right-3 flex justify-between pointer-events-none">
              <button
                onClick={prevSlide}
                className="pointer-events-auto w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:border-[#0099CC] hover:text-[#0099CC]"
                style={{
                  borderColor: '#E5E5E5',
                  color: '#000000',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                }}
                aria-label="Immagine precedente"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="pointer-events-auto w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:border-[#0099CC] hover:text-[#0099CC]"
                style={{
                  borderColor: '#E5E5E5',
                  color: '#000000',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                }}
                aria-label="Immagine successiva"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {productImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === currentSlide ? '#0099CC' : 'transparent',
                    border: `1px solid ${i === currentSlide ? '#0099CC' : '#E5E5E5'}`,
                  }}
                  aria-label={`Vai a immagine ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
