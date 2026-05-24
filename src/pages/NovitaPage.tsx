import { useNavigate } from 'react-router';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';

const novitaArticles = [
  {
    slug: 'horo-direzionale-anteprima-2026',
    title: "HORO: la nuova linea direzionale 2026 - Anteprima esclusiva",
    excerpt: "Anteprima esclusiva della collezione HORO: design innovativo, eleganza senza tempo e funzionalita per gli uffici direzionali del futuro.",
    image: './horo-1.jpg',
    date: '22 Maggio 2026',
    readTime: '5 min',
  },
  {
    slug: '20-anni-kicca-kastel',
    title: 'I 20 anni di Kicca: due decadi di design senza tempo',
    excerpt: 'Kicca compie 20 anni. Venti anni di storia, evoluzione e design senza tempo per la sedia iconica di Kastel.',
    image: './kicca-20-anni-hero.jpg',
    date: '21 Maggio 2026',
    readTime: '7 min',
  },
  {
    slug: 'kitchen-2026-linea-office',
    title: 'Kitchen 2026: la nuova linea Office-Kitchen per aree break e spazi conviviali',
    excerpt: 'Scopri Office-Kitchen, la nuova collezione LAS pensata per aree break, cucine ufficio e spazi conviviali: design contemporaneo, funzionalit\u00E0 ed essenzialit\u00E0.',
    image: './kitchen-2026.jpg',
    date: '20 Maggio 2026',
    readTime: '6 min',
  },
];

export default function NovitaPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Header */}
      <div
        className="py-12 px-6"
        style={{
          background: 'linear-gradient(135deg, #0099CC 0%, #007AA3 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 font-heading font-medium text-sm mb-6 transition-all duration-300 hover:translate-x-[-4px]"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            <ArrowLeft size={16} /> Torna alla Home
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div
              className="font-heading font-semibold text-xs tracking-[0.1em] uppercase px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: '#FFFFFF',
              }}
            >
              NOVITA'
            </div>
          </div>

          <h1
            className="font-heading font-bold text-3xl md:text-5xl leading-tight max-w-3xl"
            style={{ color: '#FFFFFF' }}
          >
            Tutte le novita'
          </h1>
          <p
            className="font-body text-lg mt-4 max-w-2xl"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            Scopri gli ultimi articoli, tendenze e novita' dal mondo dell'arredo ufficio
          </p>
          <p
            className="font-heading text-sm mt-2"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            {novitaArticles.length} {novitaArticles.length === 1 ? 'articolo' : 'articoli'}
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {novitaArticles.map((article) => (
            <button
              key={article.slug}
              onClick={() => navigate(`/articolo/${article.slug}`)}
              className="group text-left rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E5',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              {/* Cover Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute top-4 left-4 font-heading font-semibold text-[10px] tracking-[0.08em] uppercase px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: '#0099CC',
                    color: '#FFFFFF',
                  }}
                >
                  NOVITA'
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div
                  className="flex items-center gap-4 font-heading text-xs"
                  style={{ color: '#6B7280' }}
                >
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {article.readTime} di lettura
                  </span>
                </div>

                <h2
                  className="font-heading font-bold text-lg leading-snug mt-3 group-hover:text-[#0099CC] transition-colors"
                  style={{ color: '#000000' }}
                >
                  {article.title}
                </h2>

                <p
                  className="font-body text-sm mt-3 leading-relaxed"
                  style={{ color: '#6B7280' }}
                >
                  {article.excerpt}
                </p>

                <div
                  className="flex items-center gap-1 mt-4 font-heading font-semibold text-sm group-hover:gap-2 transition-all"
                  style={{ color: '#0099CC' }}
                >
                  Leggi l'articolo <ArrowRight size={14} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
