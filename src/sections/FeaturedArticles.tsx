import { useMemo } from 'react';
import { Link } from 'react-router';

const novitaCard = {
  slug: 'horo-direzionale-anteprima-2026',
  image: './horo-1.jpg',
  category: 'NOVIT\u00C0',
  title: 'HORO: anteprima linea direzionale 2026',
  date: '22 Maggio 2026',
};

const designCards = [
  {
    slug: 'linea-sedute-star-operativa',
    image: './star-hero.png',
    category: 'DESIGN',
    title: 'STAR operativa: un classico da 12 anni',
    date: '22 Maggio 2026',
  },
];

const productCards = [
  {
    slug: 'ke123n-key-line-poltrona-operativa',
    image: './keyline-article-1.jpg',
    category: 'PRODOTTI',
    title: 'KE123N Key Line: design e tecnologia',
    date: '22 Maggio 2026',
  },
  {
    slug: 'poltrona-dattilo-ariston-aa08',
    image: './ariston-1.jpg',
    category: 'PRODOTTI',
    title: 'AA08 Poltrona Ariston: il best seller',
    date: '22 Maggio 2026',
  },
  {
    slug: 'panca-gig-bk234-best-seller',
    image: './panca-gig-1.jpg',
    category: 'PRODOTTI',
    title: 'BK234 Panca GIG: robustezza e durabilita',
    date: '22 Maggio 2026',
  },
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function FeaturedArticles() {
  const randomDesign = useMemo(() => getRandomItem(designCards), []);
  const randomProduct = useMemo(() => getRandomItem(productCards), []);

  // Card 1: NOVITÀ fixed, Card 2: DESIGN random, Card 3: PRODOTTI random
  const allCards = [novitaCard, randomDesign, randomProduct];

  return (
    <section
      id="blog"
      className="relative"
      style={{
        zIndex: 2,
        backgroundColor: '#F5F5F5',
        padding: '1.5rem 4vw 1rem 4vw',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <span
          className="inline-block font-heading font-semibold text-xs tracking-[0.08em] uppercase mb-3"
          style={{ color: '#0099CC' }}
        >
          IN EVIDENZA
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allCards.map((article, i) => (
            <Link
              key={i}
              to={`/articolo/${article.slug}`}
              className="group block overflow-hidden rounded-lg transition-all duration-300"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #D1D5DB',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = '#0099CC';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#D1D5DB';
              }}
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <span
                  className="absolute top-3 left-3 font-heading font-semibold text-[10px] tracking-[0.08em] uppercase px-2 py-1"
                  style={{
                    backgroundColor: 'rgba(0,153,204,0.9)',
                    color: '#FFFFFF',
                    borderRadius: '4px',
                  }}
                >
                  {article.category}
                </span>
              </div>
              <div className="p-3">
                <h3
                  className="font-heading font-medium text-sm leading-snug transition-colors duration-300 group-hover:text-[#0099CC]"
                  style={{ color: '#000000' }}
                >
                  {article.title}
                </h3>
                <p
                  className="font-heading font-medium text-[10px] mt-1 tracking-[0.02em]"
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
