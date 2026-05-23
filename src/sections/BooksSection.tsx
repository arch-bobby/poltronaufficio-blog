import { useMemo } from 'react';
import { Download, BookOpen, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const ALL_BOOKS = [
  {
    id: 7,
    title: 'DERBY operativo',
    subtitle: 'Catalogo Sedie Operative',
    image: './derby-copertina.jpg',
    pages: 24,
    format: 'PDF',
    desc: 'Catalogo completo della collezione Derby: arredo ufficio con design ergonomico e funzionale per postazioni di lavoro moderno.',
    downloadUrl: './catalogo-derby-2023.pdf',
  },
  {
    id: 8,
    title: 'KLEVER',
    subtitle: 'Catalogo Ufficio Operativo',
    image: './klever-copertina.jpg',
    pages: 32,
    format: 'PDF',
    desc: 'Catalogo completo della collezione KLEVER: soluzioni operative per uffici moderni, con design ergonomico e funzionale.',
    downloadUrl: './catalogo-klever.pdf',
  },
  {
    id: 9,
    title: 'Front Office',
    subtitle: 'Catalogo Reception',
    image: './front-office-copertina.jpg',
    pages: 28,
    format: 'PDF',
    desc: 'Catalogo completo della collezione Front Office: soluzioni per reception, banconi e aree di accoglienza moderne.',
    downloadUrl: './catalogo-front-office.pdf',
  },
  {
    id: 10,
    title: 'STRATOS',
    subtitle: 'Catalogo Ufficio Operativo',
    image: './stratos-copertina.jpg',
    pages: 36,
    format: 'PDF',
    desc: 'Catalogo completo della collezione STRATOS: soluzioni operative per postazioni di lavoro moderne.',
    downloadUrl: './catalogo-stratos-2023.pdf',
  },
  {
    id: 11,
    title: 'STRATOS PLUS',
    subtitle: 'Catalogo Ufficio Direzionale',
    image: './stratos-plus-copertina.jpg',
    pages: 40,
    format: 'PDF',
    desc: 'Catalogo completo della collezione STRATOS PLUS: soluzioni direzionali per uffici moderni.',
    downloadUrl: './catalogo-stratos-plus.pdf',
  },
  {
    id: 12,
    title: 'CUBO',
    subtitle: 'Catalogo Ufficio Direzionale',
    image: './cubo-copertina.jpg',
    pages: 30,
    format: 'PDF',
    desc: 'Catalogo completo della collezione CUBO: soluzioni direzionali per uffici moderni.',
    downloadUrl: './catalogo-cubo.pdf',
  },
  {
    id: 13,
    title: 'UFFICIO SU MISURA',
    subtitle: 'Catalogo Sedute Eco',
    image: './ufficio-su-misura-copertina.jpg',
    pages: 32,
    format: 'PDF',
    desc: 'Catalogo completo Ufficio Su Misura: sedute eco-friendly e soluzioni sostenibili.',
    downloadUrl: './catalogo-ufficio-su-misura.pdf',
  },
];

function getRandomBooks(count: number) {
  const shuffled = [...ALL_BOOKS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function BooksSection() {
  const books = useMemo(() => getRandomBooks(3), []);

  return (
    <section
      id="libri"
      className="relative"
      style={{
        zIndex: 2,
        backgroundColor: '#F0F9FF',
        padding: '3rem 4vw',
        borderTop: '1px solid #E5E5E5',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span
            className="inline-block font-heading font-semibold text-xs tracking-[0.08em] uppercase mb-3"
            style={{ color: '#0099CC' }}
          >
            RISORSE GRATUITE
          </span>
          <h2
            className="font-heading font-bold text-3xl md:text-4xl"
            style={{ color: '#000000' }}
          >
            Download Cataloghi Gratuiti
          </h2>
          <p
            className="font-body text-base mt-3 max-w-[600px] mx-auto"
            style={{ color: '#6B7280' }}
          >
            Scarica i nostri cataloghi e guide complete sull&apos;arredo per ufficio. Risorse gratuite con consigli pratici e soluzioni professionali.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="group flex flex-col"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E5E5E5',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Book Cover */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '2/3', maxHeight: '320px' }}>
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
                />
                <div
                  className="absolute top-3 right-3 font-heading font-semibold text-[10px] tracking-[0.08em] uppercase px-2 py-1 rounded"
                  style={{ backgroundColor: 'rgba(0,128,0,0.9)', color: '#FFFFFF' }}
                >
                  GRATIS
                </div>
              </div>

              {/* Book Info */}
              <div className="p-5 flex flex-col flex-1">
                <h3
                  className="font-heading font-semibold text-lg leading-snug"
                  style={{ color: '#000000' }}
                >
                  {book.title}
                </h3>
                <p
                  className="font-heading text-sm mt-1"
                  style={{ color: '#0099CC' }}
                >
                  {book.subtitle}
                </p>
                <p
                  className="font-body text-sm mt-3 leading-relaxed"
                  style={{ color: '#6B7280' }}
                >
                  {book.desc}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 mt-4 pt-4" style={{ borderTop: '1px solid #F0F0F0' }}>
                  <div className="flex items-center gap-1">
                    <FileText size={14} style={{ color: '#9CA3AF' }} />
                    <span className="font-heading text-xs" style={{ color: '#9CA3AF' }}>
                      {book.pages} pagine
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen size={14} style={{ color: '#9CA3AF' }} />
                    <span className="font-heading text-xs" style={{ color: '#9CA3AF' }}>
                      {book.format}
                    </span>
                  </div>
                </div>

                {/* Download Button */}
                <a
                  href={book.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 font-heading font-semibold text-sm tracking-[0.02em] px-6 py-3 rounded-lg transition-all duration-300 hover:bg-[#007AA3] hover:translate-y-[-1px]"
                  style={{
                    backgroundColor: '#0099CC',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 12px rgba(0,153,204,0.25)',
                  }}
                >
                  <Download size={16} />
                  Scarica Gratis
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to full books page */}
        <div className="text-center mt-8">
          <Link
            to="/libri"
            className="inline-flex items-center gap-2 font-heading font-semibold text-sm tracking-[0.02em] px-8 py-3 rounded-lg transition-all duration-300 hover:bg-[#007AA3] hover:translate-y-[-1px]"
            style={{
              backgroundColor: '#0099CC',
              color: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(0,153,204,0.25)',
            }}
          >
            Vedi tutti i cataloghi
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Note */}
        <p
          className="text-center font-body text-sm mt-6"
          style={{ color: '#9CA3AF' }}
        >
          I download sono gratuiti e non richiedono registrazione. I file sono in formato PDF e compatibili con tutti i dispositivi.
        </p>
      </div>
    </section>
  );
}
