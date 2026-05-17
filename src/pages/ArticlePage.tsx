import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router';
import gsap from 'gsap';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';

/* ------------------------------------------------------------------ */
/*  Mock article database — in production this would come from a CMS  */
/* ------------------------------------------------------------------ */

interface ArticleData {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  content: { type: string; text?: string; src?: string; alt?: string; caption?: string }[];
  relatedProducts: { name: string; price: string; image: string; link: string }[];
}

const ARTICLES: Record<string, ArticleData> = {
  'come-scegliere-sedia-ergonomica': {
    slug: 'come-scegliere-sedia-ergonomica',
    title: 'Come scegliere la sedia ergonomica perfetta per il tuo ufficio',
    category: 'ERGONOMIA',
    date: '15 Gennaio 2026',
    readTime: '8 min',
    coverImage: '/featured-1.jpg',
    excerpt: 'Una guida completa per trovare la sedia ergonomica ideale, tra materiali, regolazioni e budget.',
    content: [
      { type: 'paragraph', text: 'La scelta della sedia da ufficio &egrave; una decisione che influisce direttamente sulla salute, la produttivit&agrave; e il benessere quotidiano. Passare otto ore seduti su una sedia inadeguata pu&ograve; causare mal di schiena, affaticamento visivo, riduzione della concentrazione e, a lungo termine, problemi posturali seri.' },
      { type: 'paragraph', text: 'In questa guida ti mostriamo cosa valutare prima dell\'acquisto, quali caratteristiche sono indispensabili e come bilanciare qualit&agrave; e budget per trovare la sedia ergonomica perfetta per il tuo workspace.' },
      { type: 'heading', text: 'Perch&eacute; l\'ergonomia conta' },
      { type: 'paragraph', text: 'L\'ergonomia non &egrave; un lusso, ma una necessit&agrave;. Uno studio del 2024 dell\'Istituto Superiore di Sanit&agrave; ha evidenziato che il 67% dei lavoratori d\'ufficio in Italia soffre di disturbi muscolo-scheletrici correlati alla postura. Una sedia ergonomica ben regolata pu&ograve; ridurre questi rischi fino all\'80%.' },
      { type: 'image', src: '/news-1.jpg', alt: 'Dettaglio bracciolo regolabile', caption: 'I braccioli 4D sono uno degli elementi chiave di una sedia ergonomica di qualit&agrave;' },
      { type: 'heading', text: 'Le caratteristiche da valutare' },
      { type: 'paragraph', text: '<strong>Altezza seduta regolabile</strong> &mdash; La seduta deve permettere di appoggiare i piedi a terra con le ginocchia a 90&deg;. L\'ideale &egrave; un pistone a gas certificato per almeno 10.000 cicli.' },
      { type: 'paragraph', text: '<strong>Schienale regolabile in altezza e profondit&agrave;</strong> &mdash; Lo schienale deve sostenere la curva lombare naturale. Le sedie premium offrono regolazione a profondit&agrave; variabile e meccanismi sincronizzati che seguono il movimento del corpo.' },
      { type: 'paragraph', text: '<strong>Braccioli multidirezionali</strong> &mdash; I braccioli 4D (regolabili in altezza, profondit&agrave;, larghezza e rotazione) permettono di mantenere le spalle rilassate e le braccia in posizione naturale durante la digitazione.' },
      { type: 'paragraph', text: '<strong>Materiali di qualit&agrave;</strong> &mdash; La rete traspirante (mesh) &egrave; ideale per chi passa molte ore seduto: favorisce la circolazione dell\'aria e previene la sudorazione. La schiuma ad alta densit&agrave; offre comfort duraturo nel tempo.' },
      { type: 'image', src: '/product-aura.jpg', alt: 'Sedia ergonomica AURA Pro', caption: 'La AURA Pro rappresenta il top di gamma per l\'ergonomia made in Italy' },
      { type: 'heading', text: 'Quanto spendere?' },
      { type: 'paragraph', text: 'Il mercato offre opzioni per ogni fascia di prezzo. Con meno di &euro;200 trovi sedie entry-level con regolazioni di base. Tra &euro;200 e &euro;500 si collocano i modelli mid-range, spesso con ottime caratteristiche ergonomiche. Oltre &euro;500 si entra nel mondo delle sedie professionali, con materiali premium, meccanismi avanzati e garanzie estese fino a 10 anni.' },
      { type: 'quote', text: 'Investire in una buona sedia ergonomica non &egrave; un costo, ma un investimento sulla propria salute. Dividendo il prezzo per i giorni lavorativi in un anno, si parla spesso di meno di un caff&egrave; al giorno.' },
      { type: 'heading', text: 'Conclusione' },
      { type: 'paragraph', text: 'La sedia ergonomica perfetta esiste, ma &egrave; diversa per ogni persona. Valuta il tuo fisico, le tue abitudini di lavoro e il tuo budget. Non aver paura di provare pi&ugrave; modelli prima di decidere: il comfort &egrave; soggettivo, ma la qualit&agrave; ergonomica si misura in regolazioni, materiali e certificazioni.' },
    ],
    relatedProducts: [
      { name: 'Sedia Ergonomica AURA Pro', price: '€549,00', image: '/product-aura.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Sedia Ergonomica CLOUD Mesh', price: '€329,00', image: '/featured-1.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Sedia Operativa START', price: '€189,00', image: '/hero-fallback.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Sedia Direzionale PRIME', price: '€789,00', image: '/news-3.jpg', link: 'https://mobiliufficio.it' },
    ],
  },
  'scrivanie-minimaliste-uffici': {
    slug: 'scrivanie-minimaliste-uffici',
    title: 'Scrivanie minimaliste per uffici moderni',
    category: 'DESIGN',
    date: '10 Gennaio 2026',
    readTime: '6 min',
    coverImage: '/featured-2.jpg',
    excerpt: 'Less is more: come scegliere scrivanie minimaliste che uniscono estetica e funzionalit&agrave;.',
    content: [
      { type: 'paragraph', text: 'Il minimalismo nell\'arredo ufficio non &egrave; solo una moda, ma una filosofia di lavoro. Una scrivania pulita, senza ingombri superflui, favorisce la concentrazione e riduce lo stress visivo. Scopriamo insieme come scegliere la scrivania minimalista perfetta per il tuo spazio di lavoro.' },
      { type: 'heading', text: 'Cos\'&egrave; il minimalismo in ufficio' },
      { type: 'paragraph', text: 'Il minimalismo applicato all\'ufficio si traduce in spazi essenziali, linee pulite e materiali di qualit&agrave;. Non significa rinunciare al comfort o alla funzionalit&agrave;, ma piuttosto eliminare il superfluo per concentrarsi su ci&ograve; che conta davvero.' },
      { type: 'image', src: '/featured-2.jpg', alt: 'Scrivania minimalista bianca', caption: 'Una scrivania minimalista trasforma qualsiasi spazio in un ambiente di lavoro sereno' },
      { type: 'heading', text: 'Caratteristiche delle scrivanie minimaliste' },
      { type: 'paragraph', text: '<strong>Linee essenziali</strong> &mdash; Nessun fronzolo, nessun elemento decorativo inutile. La bellezza nasce dalla pulizia delle forme e dalla qualit&agrave; dei materiali.' },
      { type: 'paragraph', text: '<strong>Materiali naturali</strong> &mdash; Legno massello, bamboo, acciaio verniciato a polvere. Materiali che durano nel tempo e migliorano con l\'uso.' },
      { type: 'paragraph', text: '<strong>Gestione dei cavi</strong> &mdash; Un vero minimalista odia i cavi visibili. Le migliori scrivanie integrano sistemi di passacavi e canaline nascoste.' },
      { type: 'quote', text: 'La semplicit&agrave; &egrave; la massima sofisticazione. Una scrivania minimalista non &egrave; vuota: &egrave; intenzionale.' },
      { type: 'heading', text: 'Conclusione' },
      { type: 'paragraph', text: 'Scegliere una scrivania minimalista significa investire in un ambiente di lavoro che promuove la chiarezza mentale. Su mobiliufficio.it trovi una selezione curata delle migliori scrivanie per ogni stile e budget.' },
    ],
    relatedProducts: [
      { name: 'Scrivania NORDIC 140', price: '€289,00', image: '/featured-2.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Scrivania PURE 160', price: '€429,00', image: '/news-2.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Scrivania STANDING DESK', price: '€649,00', image: '/news-4.jpg', link: 'https://mobiliufficio.it' },
    ],
  },
  'arredare-coworking': {
    slug: 'arredare-coworking',
    title: 'Come arredare uno spazio di coworking',
    category: 'GUIDE',
    date: '5 Gennaio 2026',
    readTime: '10 min',
    coverImage: '/featured-3.jpg',
    excerpt: 'Spazi flessibili, comfort e design: la guida completa per arredare un coworking di successo.',
    content: [
      { type: 'paragraph', text: 'Arredare uno spazio di coworking &egrave; una sfida affascinante: bisogna bilanciare estetica, funzionalit&agrave;, comfort acustico e flessibilit&agrave;. Una guida pratica per creare ambienti dove la produttivit&agrave; e la creativit&agrave; flourish.' },
      { type: 'heading', text: 'La filosofia del coworking moderno' },
      { type: 'paragraph', text: 'Il coworking non &egrave; pi&ugrave; una tendenza, ma una realt&agrave; consolidata. In Italia sono oltre 600 gli spazi di coworking attivi, e il numero cresce ogni anno. Gli utenti cercano ambienti che siano professionali ma accoglienti, flessibili ma strutturati.' },
      { type: 'image', src: '/featured-3.jpg', alt: 'Spazio coworking moderno', caption: 'Un coworking ben arredato favorisce la collaborazione spontanea' },
      { type: 'heading', text: 'Zone fondamentali' },
      { type: 'paragraph', text: '<strong>Focus zone</strong> &mdash; Aree silenziose con scrivanie individuali, schermi divisori fonoassorbenti e illuminazione calibrata per il lavoro concentrato.' },
      { type: 'paragraph', text: '<strong>Collaboration zone</strong> &mdash; Tavoli grandi, schermi condivisi, lavagne magnetiche. Spazi progettati per il brainstorming e il lavoro di squadra.' },
      { type: 'paragraph', text: '<strong>Relax zone</strong> &mdash; Divani, poltrone, piante, caff&egrave;. Aree di ricarica dove staccare la spina per pochi minuti e tornare al lavoro con energia rinnovata.' },
      { type: 'quote', text: 'Il segreto di un coworking di successo? Creare ambienti diversi per diverse modalit&agrave; di lavoro. Un solo open space non basta pi&ugrave;.' },
      { type: 'heading', text: 'Conclusione' },
      { type: 'paragraph', text: 'Arredare un coworking richiede competenze specifiche. Su mobiliufficio.it trovi mobili progettati appositamente per spazi di lavoro condivisi, con garanzia commerciale e consulenza dedicata.' },
    ],
    relatedProducts: [
      { name: 'Tavolo Riunioni CUBE', price: '€899,00', image: '/featured-3.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Divano modulare WORK', price: '€1.249,00', image: '/news-2.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Parete fonoassorbente', price: '€349,00', image: '/news-3.jpg', link: 'https://mobiliufficio.it' },
    ],
  },
  'tendenze-arredo-2026': {
    slug: 'tendenze-arredo-2026',
    title: 'Le tendenze arredo ufficio 2026',
    category: 'DESIGN',
    date: '12 Gennaio 2026',
    readTime: '7 min',
    coverImage: '/news-2.jpg',
    excerpt: 'Minimalismo caldo, materiali naturali e tecnologia integrata: cosa aspettarsi quest\'anno.',
    content: [
      { type: 'paragraph', text: 'Il 2026 porta novit&agrave; interessanti nel mondo dell\'arredo per ufficio. Dopo gli anni dello smart working forzato, le aziende italiane stanno reinvestendo negli spazi fisici, cercando un equilibrio tra home comfort e professionalit&agrave;.' },
      { type: 'heading', text: 'Minimalismo caldo' },
      { type: 'paragraph', text: 'Addio minimalismo freddo e asettico. Il 2026 premia linee pulite ma materiali caldi: legno chiaro, tessuti naturali, tonalit&agrave; terra. L\'ufficio deve essere ordinato, s&igrave;, ma anche accogliente.' },
      { type: 'image', src: '/news-2.jpg', alt: 'Coworking con piante', caption: 'Il biophilic design &egrave; una delle tendenze dominanti del 2026' },
      { type: 'heading', text: 'Tecnologia invisibile' },
      { type: 'paragraph', text: 'Prese, cavi, schermi: tutto si nasce. Le scrivanie integrano hub di ricarica wireless, i monitor sono sosteniti da bracci che scompaiono dietro il piano, l\'illuminazione &egrave; smart e regolata automaticamente.' },
      { type: 'quote', text: 'La vera tecnologia &egrave; quella che non vedi, ma che migliora la tua giornata lavorativa.' },
      { type: 'heading', text: 'Conclusione' },
      { type: 'paragraph', text: 'Su mobiliufficio.it trovi le novit&agrave; 2026 in anteprima, con sconti riservati ai primi ordini.' },
    ],
    relatedProducts: [
      { name: 'Lampada smart LUMI', price: '€159,00', image: '/news-2.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Scrivania ERGO 160', price: '€519,00', image: '/featured-2.jpg', link: 'https://mobiliufficio.it' },
    ],
  },
  'postura-corretta-lavoro': {
    slug: 'postura-corretta-lavoro',
    title: 'Postura corretta al lavoro: la guida definitiva',
    category: 'GUIDE',
    date: '8 Gennaio 2026',
    readTime: '9 min',
    coverImage: '/news-4.jpg',
    excerpt: 'Esercizi, consigli e prodotti per mantenere una postura sana durante le lunghe giornate in ufficio.',
    content: [
      { type: 'paragraph', text: 'Passiamo in media 8 ore al giorno seduti. Una cattiva postura pu&ograve; causare mal di schiena, cervicali, affaticamento visivo e persino problemi digestivi. Questa guida ti offre strumenti pratici per prenderti cura della tua schiena.' },
      { type: 'heading', text: 'La postura ideale' },
      { type: 'paragraph', text: 'Schiena dritta ma non rigida, spalle rilassate, piedi appoggiati a terra, schermo all\'altezza degli occhi. Sembra semplice, ma mantenere questa posizione per ore &egrave; difficile senza gli strumenti giusti.' },
      { type: 'image', src: '/news-4.jpg', alt: 'Postura corretta al lavoro', caption: 'La corretta altezza dello schermo &egrave; fondamentale per prevenire il collo rigido' },
      { type: 'heading', text: 'Esercizi da scrivania' },
      { type: 'paragraph', text: '<strong>Rotazione collo</strong> &mdash; 10 rotazioni lente per lato, ogni 2 ore. Scioglie la tensione cervicale.' },
      { type: 'paragraph', text: '<strong>Spalle indietro</strong> &mdash; Porta le spalle indietro, come se volessi far incontrare le scapole. Mantieni 10 secondi, ripeti 5 volte.' },
      { type: 'paragraph', text: '<strong>Piedi a terra</strong> &mdash; Appoggia i piedi per intero, non incrociare le gambe. Usa un poggiapiedi se le gambe non toccano terra.' },
      { type: 'quote', text: 'La migliore postura &egrave; quella che cambia. Alza\'ti ogni 30 minuti, anche solo per 2 minuti.' },
      { type: 'heading', text: 'Conclusione' },
      { type: 'paragraph', text: 'La postura corretta si costruisce con piccole abitudini quotidiane e con l\'arredo giusto. Su mobiliufficio.it trovi sedie ergonomiche, supporti monitor e accessori per il benessere in ufficio.' },
    ],
    relatedProducts: [
      { name: 'Supporto monitor ERGO', price: '€89,00', image: '/news-4.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Sedia AURA Pro', price: '€549,00', image: '/product-aura.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Poggiapiedi COMFORT', price: '€49,00', image: '/hero-fallback.jpg', link: 'https://mobiliufficio.it' },
    ],
  },
  'salone-mobile-2026': {
    slug: 'salone-mobile-2026',
    title: 'Salone del Mobile 2026: le novit&agrave; per l\'ufficio',
    category: 'NOVIT\u00C0',
    date: '20 Gennaio 2026',
    readTime: '6 min',
    coverImage: '/news-3.jpg',
    excerpt: 'Le novit&agrave; dal Salone del Mobile 2026: cosa cambier&agrave; negli uffici italiani.',
    content: [
      { type: 'paragraph', text: 'Il Salone del Mobile 2026 ha aperto i battenti con una novit&agrave; assoluta: un intero padiglione dedicato all\'Office Design. Abbiamo selezionato per voi le tendenze e i prodotti che arriveranno presto su mobiliufficio.it.' },
      { type: 'heading', text: 'Le novit&agrave; in anteprima' },
      { type: 'paragraph', text: '<strong>Sedie auto-regolanti</strong> &mdash; Sensori integrati nella seduta rilevano il peso e la postura, adattando automaticamente la tensione dello schienale.' },
      { type: 'paragraph', text: '<strong>Scrivanie AR</strong> &mdash; Superfici interattive che proiettano informazioni, calendari e appunti direttamente sul piano di lavoro.' },
      { type: 'image', src: '/news-3.jpg', alt: 'Showroom Salone del Mobile', caption: 'Il padiglione Office Design ha registrato oltre 50.000 visitatori in 3 giorni' },
      { type: 'quote', text: 'Il futuro dell\'ufficio &egrave; ibrido, sostenibile e profondamente umano. La tecnologia &egrave; al servizio del benessere, non il contrario.' },
      { type: 'heading', text: 'Conclusione' },
      { type: 'paragraph', text: 'Tutte le novit&agrave; del Salone saranno disponibili in esclusiva su mobiliufficio.it. Iscriviti alla newsletter per essere il primo a scoprirle.' },
    ],
    relatedProducts: [
      { name: 'Sedia SMART Ergo', price: '€1.299,00', image: '/news-3.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Scrivania AR Desk', price: '€2.499,00', image: '/news-2.jpg', link: 'https://mobiliufficio.it' },
    ],
  },
  'coworking-benessere': {
    slug: 'coworking-benessere',
    title: 'Coworking e benessere: l\'ufficio del futuro',
    category: 'DESIGN',
    date: '18 Gennaio 2026',
    readTime: '7 min',
    coverImage: '/news-2.jpg',
    excerpt: 'Spazi flessibili, verde e luce naturale: come cambiano gli ambienti di lavoro.',
    content: [
      { type: 'paragraph', text: 'Il modello tradizionale di ufficio sta crollando sotto i colpi dello smart working, della generazione Z e di una nuova consapevolezza sul benessere lavorativo. I coworking sono il laboratorio dove si sperimenta il futuro.' },
      { type: 'heading', text: 'L\'ufficio come luogo di benessere' },
      { type: 'paragraph', text: 'Non si va pi&ugrave; in ufficio solo per lavorare. Si va per incontrarsi, per scambiare idee, per sentirsi parte di una comunit&agrave;. Gli spazi devono rispondere a questa nuova esigenza con zone relax, aree eventi e persino palestre.' },
      { type: 'image', src: '/news-2.jpg', alt: 'Coworking con piante', caption: 'Il biophilic design riduce lo stress e aumenta la produttivit&agrave;' },
      { type: 'paragraph', text: '<strong>Luce naturale</strong> &mdash; Gli studi dimostrano che la luce naturale aumenta la produttivit&agrave; del 15%. I nuovi coworking privilegiano vetrate, lucernari e posizioni strategiche.' },
      { type: 'paragraph', text: '<strong>Verde ovunque</strong> &mdash; Piante non solo decorative, ma scelte per le loro propriet&agrave; purificanti dell\'aria. Il verde &egrave; diventato un elemento strutturale dell\'arredo.' },
      { type: 'quote', text: 'Il coworking del futuro &egrave; un luogo che scegli di frequentare, non uno a cui sei costretto.' },
      { type: 'heading', text: 'Conclusione' },
      { type: 'paragraph', text: 'Su mobiliufficio.it trovi mobili e accessori per creare il tuo spazio di coworking ideale, che sia in un grande hub o nella tua stanza degli ospiti.' },
    ],
    relatedProducts: [
      { name: 'Poltrona lounge ZEN', price: '€449,00', image: '/news-2.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Tavolo coworking SHARE', price: '€699,00', image: '/featured-3.jpg', link: 'https://mobiliufficio.it' },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Article Page                                                       */
/* ------------------------------------------------------------------ */

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = ARTICLES[slug || ''];
  const coverRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!article) return;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.from(coverRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' })
      .from(contentRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .from(sidebarRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4');
    return () => { tl.kill(); };
  }, [article]);

  if (!article) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: '64px' }}>
          <div className="text-center">
            <h1 className="font-heading font-bold text-4xl" style={{ color: '#000000' }}>404</h1>
            <p className="font-body mt-4" style={{ color: '#6B7280' }}>Articolo non trovato.</p>
            <Link
              to="/"
              className="inline-block mt-6 font-heading font-medium text-sm transition-colors duration-300 hover:text-[#007AA3]"
              style={{ color: '#0099CC' }}
            >
              Torna alla home &rarr;
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />

      {/* Cover Image */}
      <div
        ref={coverRef}
        className="relative w-full overflow-hidden"
        style={{ paddingTop: '64px', maxHeight: '500px' }}
      >
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-[50vh] max-h-[500px] object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-[1200px] mx-auto">
          <span
            className="inline-block font-heading font-semibold text-xs tracking-[0.08em] uppercase px-3 py-1.5 mb-4"
            style={{ backgroundColor: '#0099CC', color: '#FFFFFF', borderRadius: '4px' }}
          >
            {article.category}
          </span>
          <h1
            className="font-heading font-bold text-3xl md:text-5xl leading-tight"
            style={{ color: '#FFFFFF', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
          >
            {article.title}
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <span className="font-heading text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {article.date}
            </span>
            <span className="font-heading text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              &middot;
            </span>
            <span className="font-heading text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {article.readTime} di lettura
            </span>
          </div>
        </div>
      </div>

      {/* Content + Sidebar */}
      <div
        className="max-w-[1200px] mx-auto px-4 md:px-6 py-12 md:py-16"
        style={{ zIndex: 2, position: 'relative' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div ref={contentRef} className="lg:col-span-8">
            {article.content.map((block, i) => {
              if (block.type === 'paragraph') {
                return (
                  <p
                    key={i}
                    className="font-body text-lg leading-relaxed mb-6"
                    style={{ color: 'rgba(0,0,0,0.75)' }}
                    dangerouslySetInnerHTML={{ __html: block.text || '' }}
                  />
                );
              }
              if (block.type === 'heading') {
                return (
                  <h2
                    key={i}
                    className="font-heading font-semibold text-2xl md:text-3xl mt-10 mb-4"
                    style={{ color: '#000000' }}
                    dangerouslySetInnerHTML={{ __html: block.text || '' }}
                  />
                );
              }
              if (block.type === 'image') {
                return (
                  <figure key={i} className="my-8">
                    <img
                      src={block.src}
                      alt={block.alt || ''}
                      className="w-full rounded-lg object-cover"
                      style={{ maxHeight: '400px' }}
                    />
                    <figcaption
                      className="font-body text-sm mt-3 text-center italic"
                      style={{ color: '#9CA3AF' }}
                      dangerouslySetInnerHTML={{ __html: block.caption || '' }}
                    />
                  </figure>
                );
              }
              if (block.type === 'quote') {
                return (
                  <blockquote
                    key={i}
                    className="my-8 py-6 px-8 border-l-4 rounded-r-lg"
                    style={{
                      borderColor: '#0099CC',
                      backgroundColor: 'rgba(0,153,204,0.04)',
                    }}
                  >
                    <p
                      className="font-body text-xl italic leading-relaxed"
                      style={{ color: '#000000' }}
                    >
                      &ldquo;{block.text}&rdquo;
                    </p>
                  </blockquote>
                );
              }
              return null;
            })}

            {/* CTA Acquista */}
            <div
              className="mt-12 p-8 rounded-xl text-center"
              style={{
                backgroundColor: 'rgba(0,153,204,0.06)',
                border: '1px solid rgba(0,153,204,0.15)',
              }}
            >
              <h3
                className="font-heading font-semibold text-xl"
                style={{ color: '#000000' }}
              >
                Trova la tua sedia ergonomica ideale
              </h3>
              <p
                className="font-body text-base mt-3"
                style={{ color: '#6B7280' }}
              >
                Scopri il catalogo completo di sedie ergonomiche su mobiliufficio.it
              </p>
              <a
                href="https://mobiliufficio.it"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 font-heading font-semibold text-sm tracking-[0.02em] px-8 py-3.5 transition-all duration-300 hover:bg-[#007AA3] hover:translate-y-[-1px]"
                style={{
                  backgroundColor: '#0099CC',
                  color: '#FFFFFF',
                  borderRadius: '4px',
                  boxShadow: '0 4px 12px rgba(0,153,204,0.25)',
                }}
              >
                Acquista su mobiliufficio.it &rarr;
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div ref={sidebarRef} className="lg:col-span-4">
            <div
              className="sticky top-24 p-6 rounded-xl"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E5',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              }}
            >
              <h3
                className="font-heading font-semibold text-sm tracking-[0.08em] uppercase mb-6"
                style={{ color: '#0099CC' }}
              >
                PRODOTTI CORRELATI
              </h3>

              <div className="space-y-6">
                {article.relatedProducts.map((product, i) => (
                  <a
                    key={i}
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-4 items-start transition-all duration-300"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h4
                        className="font-heading font-medium text-sm leading-snug transition-colors duration-300 group-hover:text-[#0099CC]"
                        style={{ color: '#000000' }}
                      >
                        {product.name}
                      </h4>
                      <p
                        className="font-heading font-semibold text-sm mt-1"
                        style={{ color: '#008000' }}
                      >
                        {product.price}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Banner CTA */}
              <a
                href="https://mobiliufficio.it"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-8 p-4 rounded-lg text-center transition-all duration-300 hover:bg-[#007AA3]"
                style={{
                  backgroundColor: '#0099CC',
                  color: '#FFFFFF',
                }}
              >
                <span className="font-heading font-semibold text-sm tracking-[0.02em]">
                  Visita mobiliufficio.it
                </span>
              </a>

              {/* Tags */}
              <div className="mt-8 pt-6" style={{ borderTop: '1px solid #E5E5E5' }}>
                <h4
                  className="font-heading font-semibold text-xs tracking-[0.08em] uppercase mb-3"
                  style={{ color: '#9CA3AF' }}
                >
                  TAGS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Sedia ergonomica', 'Ufficio', 'Design', 'Made in Italy', 'Wellness'].map((tag) => (
                    <span
                      key={tag}
                      className="font-heading text-xs px-3 py-1.5 rounded-full transition-colors duration-300 hover:bg-[#0099CC] hover:text-white cursor-pointer"
                      style={{
                        backgroundColor: '#F5F5F5',
                        color: '#6B7280',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div
        className="max-w-[1200px] mx-auto px-4 md:px-6 pb-16"
        style={{ zIndex: 2, position: 'relative' }}
      >
        <div
          className="pt-12"
          style={{ borderTop: '1px solid #E5E5E5' }}
        >
          <span
            className="inline-block font-heading font-semibold text-xs tracking-[0.08em] uppercase mb-8"
            style={{ color: '#0099CC' }}
          >
            ARTICOLI CORRELATI
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Postura corretta al lavoro', category: 'GUIDE', image: '/news-4.jpg', slug: 'postura-corretta-lavoro' },
              { title: 'Le tendenze arredo ufficio 2026', category: 'DESIGN', image: '/news-2.jpg', slug: 'tendenze-arredo-2026' },
              { title: 'Arredare uno spazio di coworking', category: 'GUIDE', image: '/featured-3.jpg', slug: 'arredare-coworking' },
            ].map((rel, i) => (
              <Link
                key={i}
                to={`/articolo/${rel.slug}`}
                className="group block overflow-hidden rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
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
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span
                    className="absolute top-4 left-4 font-heading font-semibold text-xs tracking-[0.08em] uppercase px-3 py-1.5"
                    style={{ backgroundColor: 'rgba(0,153,204,0.9)', color: '#FFFFFF', borderRadius: '4px' }}
                  >
                    {rel.category}
                  </span>
                </div>
                <div className="p-5">
                  <h4
                    className="font-heading font-medium text-base transition-colors duration-300 group-hover:text-[#0099CC]"
                    style={{ color: '#000000' }}
                  >
                    {rel.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
