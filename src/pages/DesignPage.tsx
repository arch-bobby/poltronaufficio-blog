import { useNavigate } from 'react-router';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';

const designArticles = [
  {
    slug: 'linea-sedute-star-operativa',
    title: 'Linea Sedute STAR operativa: un classico Selin, 12 anni di affidabilita',
    excerpt: 'La STAR operativa di Selin e una linea storica dell arredo ufficio: robustezza, design attuale e prezzo competitivo da oltre 12 anni.',
    image: './star-hero.png',
    date: '22 Maggio 2026',
    readTime: '6 min',
  },
];

export default function DesignPage() {
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
              DESIGN
            </div>
          </div>

          <h1
            className="font-heading font-bold text-3xl md:text-5xl leading-tight max-w-3xl"
            style={{ color: '#FFFFFF' }}
          >
            Design
          </h1>
          <p
            className="font-body text-lg mt-4 max-w-2xl"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            Presentazione delle linee complete di arredo e sedute per l'ufficio
          </p>
          <p
            className="font-heading text-sm mt-2"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            Linee d'arredo complete, da scoprire in ogni dettaglio
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {designArticles.map((article) => (
            <button
              key={article.slug}
              onClick={() => navigate(`/articolo/${article.slug}`)}
              className="group text-left rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E5',
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
                  DESIGN
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
                  Scopri la linea completa <ArrowRight size={14} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
