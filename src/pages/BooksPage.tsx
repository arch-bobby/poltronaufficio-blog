import { useState } from 'react';
import { Download, BookOpen, FileText, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router';

interface Book {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  pages: number;
  format: string;
  desc: string;
  category: string;
  downloadUrl: string;
  baseDownloads: number;
}

const categories = ['TUTTI', 'UFFICIO OPERATIVO', 'UFFICIO DIREZIONALE', 'RECEPTION', 'SEDUTE', 'ARCHIVIO'];

const books: Book[] = [

  {
    id: 7, title: 'DERBY operativo', subtitle: 'Catalogo Sedie Operative',
    image: './derby-copertina.jpg', pages: 24, format: 'PDF',
    desc: 'Catalogo completo della collezione Derby: arredo ufficio con design ergonomico e funzionale per postazioni di lavoro moderno.',
    category: 'UFFICIO OPERATIVO', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/DERBY-2023.pdf',
    baseDownloads: 197,
  },
  {
    id: 8, title: 'KLEVER', subtitle: 'Catalogo Ufficio Operativo',
    image: './klever-copertina.jpg', pages: 32, format: 'PDF',
    desc: 'Catalogo completo della collezione KLEVER: soluzioni operative per uffici moderni, con design ergonomico e funzionale per postazioni di lavoro produttive.',
    category: 'UFFICIO OPERATIVO', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/KLEVER.pdf',
    baseDownloads: 62,
  },
  {
    id: 9, title: 'Front Office', subtitle: 'Catalogo Reception',
    image: './front-office-copertina.jpg', pages: 28, format: 'PDF',
    desc: 'Catalogo completo della collezione Front Office: soluzioni per reception, banconi e aree di accoglienza moderne, eleganti e funzionali.',
    category: 'RECEPTION', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/Front-Office-Catalogo.pdf',
    baseDownloads: 40,
  },
  {
    id: 10, title: 'STRATOS', subtitle: 'Catalogo Ufficio Operativo',
    image: './stratos-copertina.jpg', pages: 36, format: 'PDF',
    desc: 'Catalogo completo della collezione STRATOS: soluzioni operative per postazioni di lavoro moderne, con design ergonomico e funzionale per uffici produttivi.',
    category: 'UFFICIO OPERATIVO', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/STRATOS-2023.pdf',
    baseDownloads: 223,
  },
  {
    id: 11, title: 'STRATOS PLUS', subtitle: 'Catalogo Ufficio Direzionale',
    image: './stratos-plus-copertina.jpg', pages: 40, format: 'PDF',
    desc: 'Catalogo completo della collezione STRATOS PLUS: soluzioni direzionali per uffici moderni, con design elegante e funzionale per ambienti professionali.',
    category: 'UFFICIO DIREZIONALE', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/STRATOS-PLUS-2024-web.pdf',
    baseDownloads: 104,
  },
  {
    id: 12, title: 'CUBO', subtitle: 'Catalogo Ufficio Direzionale',
    image: './cubo-copertina.jpg', pages: 30, format: 'PDF',
    desc: 'Catalogo completo della collezione CUBO: soluzioni direzionali per uffici moderni, con design elegante e funzionale per ambienti professionali.',
    category: 'UFFICIO DIREZIONALE', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/CUBO-2022_compressed.pdf',
    baseDownloads: 96,
  },
  {
    id: 13, title: 'UFFICIO SU MISURA', subtitle: 'Catalogo Sedute Eco',
    image: './ufficio-su-misura-copertina.jpg', pages: 32, format: 'PDF',
    desc: 'Catalogo completo Ufficio Su Misura: sedute eco-friendly e soluzioni sostenibili per l\'ufficio moderno, con design ergonomico e materiali riciclati.',
    category: 'SEDUTE', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/OFFICE-2024.pdf',
    baseDownloads: 91,
  },
  {
    id: 14, title: 'UFFICIO PRATICO', subtitle: 'Catalogo Sedute',
    image: './pratico-copertina.jpg', pages: 34, format: 'PDF',
    desc: 'Catalogo completo della collezione Ufficio Pratico: sedute e soluzioni ergonomiche per l\'ufficio funzionale, con design moderno e postazioni di lavoro efficienti.',
    category: 'SEDUTE', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/PRATICO-2024.pdf',
    baseDownloads: 69,
  },
  {
    id: 15, title: 'FUNNY PLUS', subtitle: 'Catalogo Ufficio Direzionale',
    image: './funny-plus-copertina.jpg', pages: 38, format: 'PDF',
    desc: 'Catalogo completo della collezione Funny Plus: soluzioni direzionali eleganti e funzionali per uffici moderni, con design ergonomico e materiali di qualita.',
    category: 'UFFICIO DIREZIONALE', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/FUNNYPLUS_2019_CAT_LR.pdf',
    baseDownloads: 222,
  },
  {
    id: 16, title: 'FUNNY', subtitle: 'Catalogo Ufficio Operativo',
    image: './funny-copertina.jpg', pages: 36, format: 'PDF',
    desc: 'Catalogo completo della collezione Funny: soluzioni operative per uffici moderni, con design ergonomico e funzionale per postazioni di lavoro produttive.',
    category: 'UFFICIO OPERATIVO', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/FUNNY_2019_CAT_LR.pdf',
    baseDownloads: 60,
  },
  {
    id: 17, title: 'YOGA', subtitle: 'Catalogo Ufficio Direzionale',
    image: './yoga-copertina.jpg', pages: 30, format: 'PDF',
    desc: 'Catalogo completo della collezione Yoga: soluzioni direzionali per uffici moderni, con design elegante e funzionale per ambienti professionali.',
    category: 'UFFICIO DIREZIONALE', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/YOGA_2023_CAT_LD.pdf',
    baseDownloads: 207,
  },
  {
    id: 18, title: 'JERA', subtitle: 'Catalogo Ufficio Direzionale',
    image: './jera-copertina.jpg', pages: 42, format: 'PDF',
    desc: 'Catalogo completo della collezione Jera: soluzioni direzionali eleganti per uffici moderni, con design ergonomico e materiali di qualita.',
    category: 'UFFICIO DIREZIONALE', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/catalogo-Jera-las-2026.pdf',
    baseDownloads: 284,
  },
  {
    id: 19, title: 'ABSTRACT 2026', subtitle: 'Catalogo Sedute',
    image: './abstract-copertina.jpg', pages: 44, format: 'PDF',
    desc: 'Catalogo completo della collezione Abstract 2026: sedute ergonomiche e innovative per l\'ufficio moderno, con design contemporaneo e materiali sostenibili.',
    category: 'SEDUTE', downloadUrl: './CATALOGO_ABSTRACT_2025.pdf',
    baseDownloads: 262,
  },
  {
    id: 20, title: 'MONOLITH', subtitle: 'Catalogo Ufficio Direzionale',
    image: './monolith-copertina.jpg', pages: 46, format: 'PDF',
    desc: 'Catalogo completo della collezione Monolith: soluzioni direzionali monumentali per uffici moderni, con design elegante e materiali premium.',
    category: 'UFFICIO DIREZIONALE', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/CATALOGO_Catalogue_MONOLITH.pdf',
    baseDownloads: 173,
  },
  {
    id: 21, title: 'COLOMBINI SCRIVANIE', subtitle: 'Scrivanie e Tavoli 2025',
    image: './colombini-scrivanie-copertina.jpg', pages: 144, format: 'PDF',
    desc: 'Catalogo completo scrivanie e tavoli C_Office 2025: soluzioni per ufficio operativo e direzionale, con design moderno e funzionale.',
    category: 'UFFICIO OPERATIVO', downloadUrl: './C_ColombiniOffice-Scrivanie.pdf',
    baseDownloads: 56,
  },
  {
    id: 22, title: 'COLOMBINI SCRIVANIE', subtitle: 'Scrivanie e Tavoli 2025',
    image: './colombini-scrivanie-copertina.jpg', pages: 144, format: 'PDF',
    desc: 'Catalogo completo scrivanie e tavoli C_Office 2025: soluzioni per ufficio operativo e direzionale, con design moderno e funzionale.',
    category: 'UFFICIO DIREZIONALE', downloadUrl: './C_ColombiniOffice-Scrivanie.pdf',
    baseDownloads: 185,
  },
  {
    id: 23, title: 'COLOMBINI OFFICE', subtitle: 'Armadi e Contenitori 2026',
    image: './colombini-office-copertina.jpg', pages: 156, format: 'PDF',
    desc: 'Catalogo completo armadi e contenitori C_Office 2026: soluzioni di archiviazione per l ufficio moderno, con design funzionale e organizzato.',
    category: 'ARCHIVIO', downloadUrl: './C_ColombiniOffice-Armadi.pdf',
    baseDownloads: 142,
  },
  {
    id: 24, title: 'KAMOS PURE', subtitle: 'Catalogo Ufficio Operativo',
    image: './kamos-copertina.jpg', pages: 48, format: 'PDF',
    desc: 'Catalogo completo della collezione Kamos Pure: soluzioni operative per uffici moderni, con design essenziale e funzionale per postazioni di lavoro produttive.',
    category: 'UFFICIO OPERATIVO', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/catalogo_KAMOS%20PLUS-PURE.pdf',
    baseDownloads: 42,
  },
  {
    id: 26, title: 'OXI operativo', subtitle: 'Catalogo Ufficio Operativo',
    image: './oxi-copertina.jpg', pages: 36, format: 'PDF',
    desc: 'Catalogo completo della collezione OXI operativo: soluzioni per uffici moderni, con design ergonomico e funzionale per postazioni di lavoro.',
    category: 'UFFICIO OPERATIVO', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/Catalogo_Las_OXI_2026.pdf',
    baseDownloads: 41,
  },
  {
    id: 25, title: 'KAMOS PLUS', subtitle: 'Catalogo Ufficio Direzionale',
    image: './kamos-copertina.jpg', pages: 48, format: 'PDF',
    desc: 'Catalogo completo della collezione Kamos Plus: soluzioni direzionali per uffici moderni, con design elegante e funzionale per ambienti professionali.',
    category: 'UFFICIO DIREZIONALE', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/catalogo_KAMOS%20PLUS-PURE.pdf',
    baseDownloads: 57,
  },
  {
    id: 27, title: 'EIDOS PRO operativo', subtitle: 'Catalogo Ufficio Operativo',
    image: './eidos-pro-copertina.jpg', pages: 42, format: 'PDF',
    desc: 'Catalogo completo della collezione EIDOS PRO: soluzioni operative per uffici moderni, con design ergonomico e funzionale per postazioni di lavoro produttive.',
    category: 'UFFICIO OPERATIVO', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/DERBY-2023.pdf',
    baseDownloads: 89,
  },
  {
    id: 28, title: 'VISTA ESSENCE operativo', subtitle: 'Catalogo Ufficio Operativo',
    image: './vista-essence-copertina.jpg', pages: 40, format: 'PDF',
    desc: 'Catalogo completo della collezione VISTA ESSENCE: soluzioni operative per uffici moderni, con design ergonomico e funzionale per postazioni di lavoro.',
    category: 'UFFICIO OPERATIVO', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/catalogo_VISTA%20ESSENCE.pdf',
    baseDownloads: 93,
  },
  {
    id: 29, title: 'HYPE direzionale', subtitle: 'Catalogo Ufficio Direzionale',
    image: './hype-copertina.jpg', pages: 44, format: 'PDF',
    desc: 'Catalogo completo della collezione HYPE: soluzioni direzionali per uffici moderni, con design elegante e funzionale per ambienti professionali.',
    category: 'UFFICIO DIREZIONALE', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/HYPE_2021_CAT_LD.pdf',
    baseDownloads: 163,
  },
  {
    id: 30, title: 'BOLD 58 direzionale', subtitle: 'Catalogo Ufficio Direzionale',
    image: './bold58-copertina.jpg', pages: 38, format: 'PDF',
    desc: 'Catalogo completo della collezione BOLD 58: soluzioni direzionali per uffici moderni, con design elegante e funzionale per ambienti professionali.',
    category: 'UFFICIO DIREZIONALE', downloadUrl: './BOLD58_CAT_2022_LD.pdf',
    baseDownloads: 188,
  },
  {
    id: 32, title: 'KONO direzionale', subtitle: 'Catalogo Ufficio Direzionale',
    image: './kono-copertina.jpg', pages: 32, format: 'PDF',
    desc: 'Catalogo completo della collezione KONO: soluzioni direzionali per uffici moderni, con design elegante e funzionale per ambienti professionali.',
    category: 'UFFICIO DIREZIONALE', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/KONO_2016_CAT_LR.pdf',
    baseDownloads: 285,
  },
  {
    id: 34, title: 'HORO direzionale (PREVIEW)', subtitle: 'Anteprima Catalogo 2026',
    image: './horo-preview-copertina.jpg', pages: 28, format: 'PDF',
    desc: 'Anteprima della collezione HORO: la nuova linea direzionale 2026. Design innovativo, eleganza e funzionalita per gli ambienti professionali del futuro.',
    category: 'UFFICIO DIREZIONALE', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/HORO_2026_brochure.pdf',
    baseDownloads: 188,
  },
  {
    id: 31, title: 'YES operativo', subtitle: 'Catalogo Ufficio Operativo',
    image: './yes-copertina.jpg', pages: 36, format: 'PDF',
    desc: 'Catalogo completo della collezione YES: soluzioni operative per uffici moderni, con design ergonomico e funzionale per postazioni di lavoro.',
    category: 'UFFICIO OPERATIVO', downloadUrl: 'https://www.poltronaufficio.it/cataloghi/FUNNY-YES_2025_CAT_MD.pdf',
    baseDownloads: 93,
  },
];

export default function BooksPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('TUTTI');

  const [downloads, setDownloads] = useState<Record<number, number>>(() => {
    const saved = localStorage.getItem('pu_downloads');
    return saved ? JSON.parse(saved) : {};
  });

  function incrementDownload(bookId: number) {
    const newDownloads = { ...downloads, [bookId]: (downloads[bookId] || 0) + 1 };
    setDownloads(newDownloads);
    localStorage.setItem('pu_downloads', JSON.stringify(newDownloads));
  }

  const sortedBooks = [...books].sort((a, b) => a.title.localeCompare(b.title));

  const filteredBooks = activeCategory === 'TUTTI'
    ? sortedBooks
    : sortedBooks.filter((b) => b.category === activeCategory);

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: '64px' }}>
      {/* Hero */}
      <div className="py-12 px-6 text-center" style={{ backgroundColor: '#F0F9FF' }}>
        <span className="inline-block font-heading font-semibold text-xs tracking-[0.08em] uppercase mb-3" style={{ color: '#0099CC' }}>
          RISORSE GRATUITE
        </span>
        <h1 className="font-heading font-bold text-3xl md:text-4xl" style={{ color: '#000000' }}>
          Download Cataloghi Gratuiti
        </h1>
        <p className="font-body text-base mt-3 max-w-[600px] mx-auto" style={{ color: '#6B7280' }}>
          Scarica i nostri cataloghi e guide complete sull&apos;arredo per ufficio. Risorse gratuite in PDF.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-[64px] z-40 bg-white border-b" style={{ borderColor: '#E5E5E5' }}>
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="font-heading font-semibold text-xs tracking-[0.08em] uppercase px-4 py-2 rounded-full transition-all duration-300 shrink-0"
              style={{
                backgroundColor: activeCategory === cat ? '#0099CC' : '#F5F5F5',
                color: activeCategory === cat ? '#FFFFFF' : '#6B7280',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <p className="font-heading text-sm mb-6" style={{ color: '#9CA3AF' }}>
          {filteredBooks.length} {filteredBooks.length === 1 ? 'CATALOGO' : 'CATALOGHI'} {activeCategory !== 'TUTTI' ? `in "${activeCategory}"` : ''}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E5',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
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
              {/* Cover */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '2/3', maxHeight: '280px' }}>
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div
                  className="absolute top-3 right-3 font-heading font-semibold text-[10px] tracking-[0.08em] uppercase px-2 py-1 rounded"
                  style={{ backgroundColor: 'rgba(0,128,0,0.9)', color: '#FFFFFF' }}
                >
                  GRATIS
                </div>
                <div
                  className="absolute bottom-3 left-3 font-heading font-semibold text-[10px] tracking-[0.08em] uppercase px-2 py-1 rounded"
                  style={{ backgroundColor: 'rgba(0,153,204,0.9)', color: '#FFFFFF' }}
                >
                  {book.category}
                </div>
              </div>

              {/* Download Counter */}
              <div
                className="flex items-center justify-center gap-1.5 py-1.5"
                style={{ backgroundColor: '#FAFAFA', borderBottom: '1px solid #E5E5E5' }}
              >
                <TrendingDown size={12} style={{ color: '#008000' }} />
                <span className="font-heading font-semibold text-xs" style={{ color: '#008000' }}>
                  {book.baseDownloads + (downloads[book.id] || 0)} DOWNLOAD
                </span>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-heading font-semibold text-base leading-snug" style={{ color: '#000000' }}>
                  {book.title}
                </h3>
                <p className="font-heading text-xs mt-1" style={{ color: '#0099CC' }}>
                  {book.subtitle}
                </p>
                <p className="font-body text-sm mt-2 leading-relaxed" style={{ color: '#6B7280' }}>
                  {book.desc}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 mt-3 pt-3" style={{ borderTop: '1px solid #F0F0F0' }}>
                  <div className="flex items-center gap-1">
                    <FileText size={12} style={{ color: '#9CA3AF' }} />
                    <span className="font-heading text-[10px]" style={{ color: '#9CA3AF' }}>
                      {book.pages} pag
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen size={12} style={{ color: '#9CA3AF' }} />
                    <span className="font-heading text-[10px]" style={{ color: '#9CA3AF' }}>
                      {book.format}
                    </span>
                  </div>
                </div>

                {/* Download */}
                <a
                  href={book.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => incrementDownload(book.id)}
                  className="mt-4 flex items-center justify-center gap-2 font-heading font-semibold text-sm px-6 py-3 rounded-lg transition-all duration-300 hover:bg-[#007AA3] hover:translate-y-[-1px]"
                  style={{ backgroundColor: '#0099CC', color: '#FFFFFF' }}
                >
                  <Download size={16} />
                  Scarica Gratis
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 text-center" style={{ backgroundColor: '#F9FAFB', borderTop: '1px solid #E5E5E5' }}>
        <p className="font-body text-sm" style={{ color: '#9CA3AF' }}>
          I cataloghi sono gratuiti. I file sono in formato PDF e compatibili con tutti i dispositivi.
        </p>
        <a
          href="https://mobiliufficio.it"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 font-heading text-sm transition-colors duration-300 hover:text-[#007AA3]"
          style={{ color: '#0099CC' }}
        >
          Scopri i prodotti su mobiliufficio.it &rarr;
        </a>
      </footer>
    </div>
  );
}
