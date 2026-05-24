import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const standardArticles = [
  {
    slug: 'horo-direzionale-anteprima-2026',
    image:  './horo-1.jpg',
    category: 'NOVIT\u00C0',
    title: "HORO: anteprima linea direzionale 2026",
    excerpt: "Anteprima esclusiva della collezione HORO: design innovativo, eleganza senza tempo per gli uffici direzionali del futuro.",
  },
  {
    slug: 'kitchen-2026-linea-office',
    image:  './kitchen-2026.jpg',
    category: 'NOVIT\u00C0',
    title: 'Kitchen 2026: la nuova linea Office-Kitchen per aree break',
    excerpt: 'Scopri Office-Kitchen, la collezione LAS per aree break e spazi conviviali: design contemporaneo e funzionalit\u00E0.',
  },
];

const tallArticle = {
  slug: 'horo-direzionale-anteprima-2026',
  image:  './horo-1.jpg',
  category: "NOVITA'",
  title: "HORO: la nuova linea direzionale 2026 - Anteprima esclusiva",
};

const rightArticle = {
  image:  './news-2.jpg',
  category: 'DESIGN',
  title: 'Coworking e benessere: l\'ufficio del futuro',
  excerpt: 'Spazi flessibili, verde e luce naturale: come cambiano gli ambienti di lavoro.',
};

export default function LatestNews() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item) return;
        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="novita"
      style={{
        backgroundColor: '#FFFFFF',
        padding: '5rem 4vw',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <span
          className="inline-block font-heading font-semibold text-xs tracking-[0.08em] uppercase mb-8"
          style={{ color: '#0099CC' }}
        >
          ULTIME NOVIT&Agrave;
        </span>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            {standardArticles.map((article, i) => (
              <Link
                key={i}
                to={`/articolo/${article.slug}`}
                className="group block overflow-hidden rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}
                ref={(el) => { if (el) itemsRef.current[i] = el as HTMLElement; }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = '#0099CC';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#E5E5E5';
                }}
              >
                <div className="relative overflow-hidden aspect-[3/2]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <span
                    className="font-heading font-semibold text-xs tracking-[0.08em] uppercase"
                    style={{ color: '#0099CC' }}
                  >
                    {article.category}
                  </span>
                  <h3
                    className="font-heading font-semibold text-xl leading-snug mt-2 transition-colors duration-300 group-hover:text-[#0099CC]"
                    style={{ color: '#000000' }}
                  >
                    {article.title}
                  </h3>
                  <p
                    className="font-body text-sm leading-relaxed mt-3 line-clamp-2"
                    style={{ color: '#6B7280' }}
                  >
                    {article.excerpt}
                  </p>
                  <span
                    className="inline-block font-heading font-medium text-sm mt-4 transition-colors duration-300"
                    style={{ color: '#008000' }}
                  >
                    Leggi tutto &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            {/* Tall Featured Card */}
            <Link
              to="/articolo/horo-direzionale-anteprima-2026"
              className="group relative block overflow-hidden rounded-lg transition-all duration-300"
              ref={(el) => { if (el) itemsRef.current[2] = el as HTMLElement; }}
              style={{
                minHeight: '500px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                border: '1px solid #E5E5E5',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = '#0099CC';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#E5E5E5';
              }}
            >
              <img
                src={tallArticle.image}
                alt={tallArticle.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span
                  className="inline-block font-heading font-semibold text-xs tracking-[0.08em] uppercase px-3.5 py-1.5 mb-4"
                  style={{
                    backgroundColor: '#0099CC',
                    color: '#FFFFFF',
                    borderRadius: '4px',
                  }}
                >
                  {tallArticle.category}
                </span>
                <h2
                  className="font-heading font-semibold text-3xl md:text-4xl leading-tight"
                  style={{ color: '#FFFFFF' }}
                >
                  {tallArticle.title}
                </h2>
              </div>
            </Link>

            {/* Right Standard Card */}
            <Link
              to="/articolo/coworking-benessere"
              className="group block overflow-hidden rounded-lg transition-all duration-300"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E5',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
              ref={(el) => { if (el) itemsRef.current[3] = el as HTMLElement; }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = '#0099CC';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#E5E5E5';
              }}
            >
              <div className="relative overflow-hidden aspect-[3/2]">
                <img
                  src={rightArticle.image}
                  alt={rightArticle.title}
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6">
                <span
                  className="font-heading font-semibold text-xs tracking-[0.08em] uppercase"
                  style={{ color: '#0099CC' }}
                >
                  {rightArticle.category}
                </span>
                <h3
                  className="font-heading font-semibold text-xl leading-snug mt-2 transition-colors duration-300 group-hover:text-[#0099CC]"
                  style={{ color: '#000000' }}
                >
                  {rightArticle.title}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed mt-3 line-clamp-2"
                  style={{ color: '#6B7280' }}
                >
                  {rightArticle.excerpt}
                </p>
                <span
                  className="inline-block font-heading font-medium text-sm mt-4 transition-colors duration-300"
                  style={{ color: '#008000' }}
                >
                  Leggi tutto &rarr;
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
