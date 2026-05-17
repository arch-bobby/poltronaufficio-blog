import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    slug: 'come-scegliere-sedia-ergonomica',
    image: '/featured-1.jpg',
    category: 'ERGONOMIA',
    title: 'Come scegliere la sedia ergonomica perfetta',
    date: '15 Gennaio 2026',
  },
  {
    slug: 'scrivanie-minimaliste-uffici',
    image: '/featured-2.jpg',
    category: 'DESIGN',
    title: 'Scrivanie minimaliste per uffici moderni',
    date: '10 Gennaio 2026',
  },
  {
    slug: 'arredare-coworking',
    image: '/featured-3.jpg',
    category: 'GUIDE',
    title: 'Come arredare uno spazio di coworking',
    date: '5 Gennaio 2026',
  },
];

export default function FeaturedArticles() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative"
      style={{
        zIndex: 2,
        backgroundColor: '#FFFFFF',
        padding: '5rem 4vw',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <span
          className="inline-block font-heading font-semibold text-xs tracking-[0.08em] uppercase mb-8"
          style={{ color: '#0099CC' }}
        >
          IN EVIDENZA
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <Link
              key={i}
              to={`/articolo/${article.slug}`}
              className="group block overflow-hidden transition-all duration-300 rounded-lg"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E5',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
              ref={(el) => { if (el) cardsRef.current[i] = el as HTMLElement; }}
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
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <span
                  className="absolute top-4 left-4 font-heading font-semibold text-xs tracking-[0.08em] uppercase px-3 py-1.5"
                  style={{
                    backgroundColor: 'rgba(0,153,204,0.9)',
                    color: '#FFFFFF',
                    borderRadius: '4px',
                  }}
                >
                  {article.category}
                </span>
              </div>
              <div className="p-6">
                <h3
                  className="font-heading font-medium text-lg leading-snug transition-colors duration-300 group-hover:text-[#0099CC]"
                  style={{ color: '#000000' }}
                >
                  {article.title}
                </h3>
                <p
                  className="font-heading font-medium text-xs mt-3 tracking-[0.02em]"
                  style={{ color: '#6B7280' }}
                >
                  {article.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
