import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight, Play, FileText } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  subtitle: string;
  price: string;
  oldPrice: string;
  images: string[];
  videoUrl: string;
  videoTitle: string;
  specs: string[];
  description: string;
  link: string;
  shipping: string;
  category: string;
  articleSlug: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'KE123N Key Line',
    subtitle: 'Poltrona operativa a rete',
    price: '441,64 €',
    oldPrice: '634,40 €',
    images: ['./keyline-1.jpg', './keyline-2.jpg', './keyline-3.jpg', './keyline-4.jpg'],
    videoUrl: 'https://www.youtube.com/embed/fh7vCf0dPFE',
    videoTitle: 'Kastel - Key Line: la poltrona operativa come la vuoi tu',
    specs: [
      'Struttura in poliammide rinforzata fibra vetro',
      'Sedile e schienale in rete portante poliestere termoretraibile',
      'Meccanismo girevole o oscillante con blocco',
      'Basamento in polipropilene con ruote piroettanti',
      'Altezza seduta regolabile: 48/60 cm',
    ],
    description: 'Poltrona girevole monoscocca in rete, parte della collezione Sedute operative Kastel. Struttura in poliammide rinforzato fibra vetro con rete portante in poliestere termoretraibile. Design agile e altamente personalizzabile, con rivestimenti e basi per ogni esigenza.',
    link: 'https://mobiliufficio.it/ke123n-poltrona-key-line-operativa-a-rete.html',
    shipping: 'Trasporto GRATIS',
    category: 'PRODOTTO DELLA SETTIMANA',
    articleSlug: 'ke123n-key-line-poltrona-operativa',
  },
  {
    id: 2,
    name: 'AA08 Poltrona Dattilo ARISTON',
    subtitle: 'Poltrona operativa schienale alto',
    price: '80,52 €',
    oldPrice: '128,83 €',
    images: ['./ariston-1.jpg', './ariston-2.jpg'],
    videoUrl: '',
    videoTitle: '',
    specs: [
      'Sedile in multistrato pioppo e faggio 12 mm',
      'Schienale alto in polipropilene con imbottitura',
      'Meccanismo Contatto Permanente',
      'Braccioli fissi in polipropilene',
      'Basamento 5 razze in nylon',
      'Dimensioni: L.63 x P.60 x H.99/113',
    ],
    description: 'L AA08 Poltrona Dattilo Ariston e la piu venduta su mobiliufficio.it. Poltrona operativa con schienale alto, braccioli, alzata a gas e seduta con anima in legno. Comfort, qualita e convenienza in un unico prodotto.',
    link: 'https://mobiliufficio.it/aa-08-poltrona-dattilo-ariston.html',
    shipping: 'Trasporto GRATIS',
    category: 'BEST SELLER',
    articleSlug: 'poltrona-dattilo-ariston-aa08',
  },
  {
    id: 3,
    name: 'BK234 Panca GIG',
    subtitle: 'Panca attesa 2/3/4/5 posti',
    price: '146,40 €',
    oldPrice: '',
    images: ['./panca-gig-1.jpg', './panca-gig-2.jpg'],
    videoUrl: '',
    videoTitle: '',
    specs: [
      'Struttura in trave tubo quadro acciaio 80x40 mm',
      'Piedi in acciaio verniciato nero con piedini nylon',
      'Seduta e schienale in polipropilene colorato',
      'Disponibile in 2/3/4/5 posti',
      '6 colori disponibili',
      'Altezza seduta 44 cm',
    ],
    description: 'La BK234 Panca GIG e la panca da attesa piu venduta su mobiliufficio.it. Simbolo di robustezza e durabilita nel tempo, con struttura in acciaio e seduta in polipropilene.',
    link: 'https://mobiliufficio.it/bk234-panca-attesa-gig-2-3-4-5-posti-su-trave-in-metallo.html',
    shipping: 'Trasporto GRATIS',
    category: 'BEST SELLER',
    articleSlug: 'panca-gig-bk234-best-seller',
  },
  {
    id: 4,
    name: 'Linea Sedute STAR operativa',
    subtitle: 'Sedia impilabile e poltrona operativa',
    price: '68,00 €',
    oldPrice: '105,00 €',
    images: ['./star-1.png', './star-2.png', './star-5.png', './star-3.png', './star-4.png'],
    videoUrl: '',
    videoTitle: '',
    specs: [
      'Sedia fissa impilabile con schienale perforato in polipropilene',
      'Poltrona operativa girevole con schienale in rete traspirante',
      'Seduta imbottita disponibile in vari colori',
      'Struttura tubolare in acciaio verniciato',
      'Versioni disponibili: base, con braccioli, con tavoletta, operativa, operativa con poggiatesta',
      'Produzione Selin - 12 anni di storia e affidabilità',
    ],
    description: 'La linea STAR operativa di Selin è un vero e proprio classico dell\'arredo ufficio. In produzione da oltre 12 anni, unisce robustezza, design sempre attuale e un prezzo competitivo. Disponibile come sedia impilabile fissa e come poltrona operativa girevole con schienale in rete.',
    link: 'https://mobiliufficio.it/linee-arredo/selin.html?linea_sedute=110',
    shipping: 'Trasporto GRATIS',
    category: 'DESIGN',
    articleSlug: 'linea-sedute-star-operativa',
  },
];

function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % product.images.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + product.images.length) % product.images.length);

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E5E5',
      }}
    >
      {/* Image Carousel */}
      <div className="relative" style={{ aspectRatio: '4/3' }}>
        {product.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${product.name} - vista ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: i === currentSlide ? 1 : 0 }}
          />
        ))}

        {/* Category Badge */}
        <div
          className="absolute top-4 left-4 font-heading font-semibold text-[10px] tracking-[0.08em] uppercase px-3 py-1.5 rounded"
          style={{ backgroundColor: 'rgba(0,153,204,0.9)', color: '#FFFFFF' }}
        >
          {product.category}
        </div>

        {/* Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-3 right-3 flex justify-between pointer-events-none">
          <button
            onClick={prevSlide}
            className="pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{ backgroundColor: 'rgba(255,255,255,0.9)', border: '1px solid #E5E5E5' }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextSlide}
            className="pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{ backgroundColor: 'rgba(255,255,255,0.9)', border: '1px solid #E5E5E5' }}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {product.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                backgroundColor: i === currentSlide ? '#0099CC' : 'rgba(255,255,255,0.7)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="font-heading font-bold text-xl" style={{ color: '#000000' }}>
          {product.name}
        </h2>
        <p className="font-body text-sm mt-1" style={{ color: '#6B7280' }}>
          {product.subtitle}
        </p>

        <p className="font-body text-sm mt-4 leading-relaxed" style={{ color: 'rgba(0,0,0,0.65)' }}>
          {product.description}
        </p>

        {/* Price */}
        <div className="mt-4 flex items-center gap-3">
          <span className="font-heading font-bold text-2xl" style={{ color: '#0099CC' }}>
            {product.price}
          </span>
          <span className="font-heading text-sm line-through" style={{ color: '#6B7280' }}>
            {product.oldPrice}
          </span>
        </div>
        <p className="font-body text-xs mt-1" style={{ color: '#008000' }}>
          {product.shipping}
        </p>

        {/* Video Button */}
        <button
          onClick={() => setShowVideo(!showVideo)}
          className="mt-4 flex items-center gap-2 font-heading font-medium text-sm transition-all hover:text-[#0099CC]"
          style={{ color: '#6B7280' }}
        >
          <Play size={14} /> {showVideo ? 'Nascondi video' : 'Guarda il video'}
        </button>

        {showVideo && (
          <div className="mt-3 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <iframe
              width="100%" height="100%"
              src={product.videoUrl}
              title={product.videoTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}

        {/* Technical Specs */}
        <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: '#F8F8F8' }}>
          <h4 className="font-heading font-semibold text-xs tracking-[0.08em] uppercase mb-3" style={{ color: '#6B7280' }}>
            Caratteristiche tecniche
          </h4>
          <ul className="space-y-2">
            {product.specs.map((spec, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#0099CC' }} />
                <span className="font-body text-xs" style={{ color: '#6B7280' }}>{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Articolo */}
        <button
          onClick={() => navigate(`/articolo/${product.articleSlug}`)}
          className="mt-6 flex items-center justify-center gap-2 w-full font-heading font-semibold text-sm px-6 py-3 rounded-lg transition-all hover:bg-[#0099CC]"
          style={{ backgroundColor: '#0099CC', color: '#FFFFFF' }}
        >
          <FileText size={14} /> Leggi l'articolo completo
        </button>

        {/* CTA Acquisto */}
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-2 w-full font-heading font-semibold text-sm px-6 py-3 rounded-lg transition-all hover:bg-[#007700]"
          style={{ backgroundColor: '#008000', color: '#FFFFFF' }}
        >
          <ExternalLink size={14} /> Vedi su mobiliufficio.it
        </a>
      </div>
    </div>
  );
}

export default function ProdottiPage() {
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

          <h1 className="font-heading font-bold text-3xl md:text-5xl" style={{ color: '#FFFFFF' }}>
            Prodotti
          </h1>
          <p className="font-body text-lg mt-4 max-w-2xl" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Scopri tutti i prodotti selezionati: Prodotto della Settimana e novita' dall'arredo ufficio
          </p>
          <p className="font-heading text-sm mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {products.length} {products.length === 1 ? 'prodotto' : 'prodotti'}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
