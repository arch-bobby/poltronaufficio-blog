import { useNavigate } from 'react-router';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';

const guideArticles = [
  {
    slug: 'scrivanie-minimaliste-uffici',
    title: 'Scrivanie minimaliste per uffici moderni',
    excerpt: 'Less is more: come scegliere scrivanie minimaliste che uniscono estetica e funzionalita.',
    image: './featured-2.jpg',
    date: '10 Gennaio 2026',
    readTime: '6 min',
  },
  {
    slug: 'come-scegliere-sedia-ergonomica',
    title: 'Come scegliere la sedia ergonomica perfetta per il tuo ufficio',
    excerpt: 'Una guida completa per trovare la sedia ergonomica ideale, tra materiali, regolazioni e budget.',
    image: './featured-1.jpg',
    date: '15 Gennaio 2026',
    readTime: '6 min',
  },
  {
    slug: 'arredare-coworking',
    title: 'Come arredare uno spazio di coworking',
    excerpt: 'Dall\'acustica all\'illuminazione: una guida completa per creare ambienti di lavoro condivisi produttivi e confortevoli.',
    image: './featured-3.jpg',
    date: '5 Gennaio 2026',
    readTime: '8 min',
  },
  {
    slug: 'postura-corretta-lavoro',
    title: 'Postura corretta al lavoro: la guida definitiva',
    excerpt: 'Esercizi, consigli e prodotti per mantenere una postura sana durante le lunghe giornate in ufficio.',
    image: './news-4.jpg',
    date: '12 Gennaio 2026',
    readTime: '7 min',
  },
];

export default function GuidesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Header */}
      <div
        className="py-12 px-6"
        style={{ background: 'linear-gradient(135deg, #0099CC 0%, #007AA3 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 font-heading font-medium text-sm mb-6 transition-all"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            <ArrowLeft size={16} /> Torna alla Home
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div
              className="font-heading font-semibold text-xs tracking-[0.1em] uppercase px-3 py-1.5 rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF' }}
            >
              GUIDE
            </div>
          </div>

          <h1 className="font-heading font-bold text-3xl md:text-5xl" style={{ color: '#FFFFFF' }}>
            Guide
          </h1>
          <p className="font-body text-lg mt-4 max-w-2xl" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Guide pratiche e consigli per arredare il tuo ufficio in modo funzionale ed ergonomico
          </p>
          <p className="font-heading text-sm mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {guideArticles.length} {guideArticles.length === 1 ? 'articolo' : 'articoli'}
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guideArticles.map((article) => (
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
                  style={{ backgroundColor: '#0099CC', color: '#FFFFFF' }}
                >
                  GUIDE
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 font-heading text-xs" style={{ color: '#6B7280' }}>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {article.readTime} di lettura
                  </span>
                </div>

                <h2 className="font-heading font-bold text-lg leading-snug mt-3 group-hover:text-[#0099CC] transition-colors" style={{ color: '#000000' }}>
                  {article.title}
                </h2>

                <p className="font-body text-sm mt-3 leading-relaxed" style={{ color: '#6B7280' }}>
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-1 mt-4 font-heading font-semibold text-sm group-hover:gap-2 transition-all" style={{ color: '#0099CC' }}>
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
