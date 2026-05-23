import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Ruler, Settings, Palette, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const productImages = [
   './keyline-1.jpg',
   './keyline-2.jpg',
   './keyline-3.jpg',
   './keyline-4.jpg',
];

export default function ProductSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

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
      className="relative py-1 px-4"
      style={{ zIndex: 1 }}
    >
      <div
        ref={contentRef}
        className="max-w-[1200px] mx-auto p-3 md:p-5 rounded-xl"
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
              PRODOTTO DELLA SETTIMANA
            </span>

            <h2
              className="font-heading font-semibold text-3xl md:text-4xl leading-tight"
              style={{ color: '#000000' }}
            >
              KE123N Key Line
            </h2>
            <p
              className="font-body text-sm mt-2"
              style={{ color: '#6B7280' }}
            >
              Poltrona operativa a rete
            </p>

            <p
              className="font-body text-lg mt-6 leading-relaxed"
              style={{ color: 'rgba(0,0,0,0.65)' }}
            >
              Poltrona girevole monoscocca in rete, parte della collezione Sedute operative Kastel.
              Struttura in poliammide rinforzato fibra vetro con rete portante in poliestere termoretraibile.
              Design agile e altamente personalizzabile, con rivestimenti e basi per ogni esigenza.
            </p>

            {/* Specs */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2">
                <Ruler size={16} style={{ color: '#008000' }} />
                <span className="font-heading font-semibold text-xs tracking-[0.08em] uppercase" style={{ color: '#6B7280' }}>
                  L.58 x P.63 x H.97/109
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Settings size={16} style={{ color: '#008000' }} />
                <span className="font-heading font-semibold text-xs tracking-[0.08em] uppercase" style={{ color: '#6B7280' }}>
                  Meccanismo girevole/oscillante
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Palette size={16} style={{ color: '#008000' }} />
                <span className="font-heading font-semibold text-xs tracking-[0.08em] uppercase" style={{ color: '#6B7280' }}>
                  4 colori rete disponibili
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-center gap-3">
              <span className="font-heading font-bold text-2xl" style={{ color: '#0099CC' }}>
                441,64 €
              </span>
              <span className="font-heading text-sm line-through" style={{ color: '#6B7280' }}>
                634,40 €
              </span>
              <span
                className="font-heading font-semibold text-[10px] tracking-[0.08em] uppercase px-2 py-1 rounded"
                style={{ backgroundColor: 'rgba(0,153,204,0.1)', color: '#0099CC' }}
              >
                IVA inclusa
              </span>
            </div>
            <p className="font-body text-xs mt-1" style={{ color: '#008000' }}>
              Trasporto GRATIS
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href="https://mobiliufficio.it/ke123n-poltrona-key-line-operativa-a-rete.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-heading font-medium text-sm tracking-[0.02em] px-7 py-3 border transition-all duration-300 hover:bg-[#008000] hover:text-white hover:border-[#008000]"
                style={{
                  borderColor: '#008000',
                  color: '#008000',
                  borderRadius: '4px',
                }}
              >
                Acquista su mobiliufficio.it &rarr;
              </a>
              <button
                onClick={() => setShowVideo(!showVideo)}
                className="inline-flex items-center gap-2 font-heading font-medium text-sm tracking-[0.02em] px-5 py-3 border transition-all duration-300 hover:bg-[#0099CC] hover:text-white hover:border-[#0099CC]"
                style={{
                  borderColor: '#0099CC',
                  color: '#0099CC',
                  borderRadius: '4px',
                }}
              >
                <Play size={14} /> Guarda il video
              </button>
            </div>

            {/* Video Embed */}
            {showVideo && (
              <div className="mt-6 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/fh7vCf0dPFE"
                  title="Kastel Key Line - la poltrona operativa come la vuoi tu"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}

            {/* Technical Details */}
            <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#F8F8F8' }}>
              <h4 className="font-heading font-semibold text-xs tracking-[0.08em] uppercase mb-3" style={{ color: '#6B7280' }}>
                Caratteristiche tecniche
              </h4>
              <ul className="space-y-2">
                {[
                  'Struttura in poliammide rinforzata fibra vetro',
                  'Sedile e schienale in rete portante poliestere termoretraibile',
                  'Meccanismo girevole o oscillante con blocco',
                  'Basamento in polipropilene con ruote piroettanti',
                  'Altezza seduta regolabile: 48/60 cm',
                ].map((spec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#0099CC' }} />
                    <span className="font-body text-xs" style={{ color: '#6B7280' }}>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Image Carousel */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
              {productImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Key Line KE123N - vista ${i + 1}`}
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

            {/* Video thumbnail overlay */}
            <button
              onClick={() => setShowVideo(!showVideo)}
              className="mt-4 w-full relative overflow-hidden rounded-lg group"
              style={{ aspectRatio: '16/9' }}
            >
              <img
                src="./keyline-1.jpg"
                alt="Key Line video"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'rgba(0,153,204,0.9)' }}>
                  <Play size={24} style={{ color: '#FFFFFF', marginLeft: '2px' }} />
                </div>
              </div>
              <span className="absolute bottom-3 left-3 font-heading text-xs" style={{ color: '#FFFFFF' }}>
                Kastel - Key Line: la poltrona operativa come la vuoi tu
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
