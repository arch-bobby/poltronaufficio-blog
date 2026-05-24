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
  tags: string[];
}

const ARTICLES: Record<string, ArticleData> = {
  'come-scegliere-sedia-ergonomica': {
    slug: 'come-scegliere-sedia-ergonomica',
    title: 'Come scegliere la sedia ergonomica perfetta per il tuo ufficio',
    category: 'ERGONOMIA',
    date: '15 Gennaio 2026',
    readTime: '8 min',
    coverImage:  './featured-1.jpg',
    excerpt: 'Una guida completa per trovare la sedia ergonomica ideale, tra materiali, regolazioni e budget.',
    content: [
      { type: 'paragraph', text: 'La scelta della sedia da ufficio &egrave; una decisione che influisce direttamente sulla salute, la produttivit&agrave; e il benessere quotidiano. Passare otto ore seduti su una sedia inadeguata pu&ograve; causare mal di schiena, affaticamento visivo, riduzione della concentrazione e, a lungo termine, problemi posturali seri.' },
      { type: 'paragraph', text: 'In questa guida ti mostriamo cosa valutare prima dell\'acquisto, quali caratteristiche sono indispensabili e come bilanciare qualit&agrave; e budget per trovare la sedia ergonomica perfetta per il tuo workspace.' },
      { type: 'heading', text: 'Perch&eacute; l\'ergonomia conta' },
      { type: 'paragraph', text: 'L\'ergonomia non &egrave; un lusso, ma una necessit&agrave;. Uno studio del 2024 dell\'Istituto Superiore di Sanit&agrave; ha evidenziato che il 67% dei lavoratori d\'ufficio in Italia soffre di disturbi muscolo-scheletrici correlati alla postura. Una sedia ergonomica ben regolata pu&ograve; ridurre questi rischi fino all\'80%.' },
      { type: 'image', src:  './news-1.jpg', alt: 'Dettaglio bracciolo regolabile', caption: 'I braccioli 4D sono uno degli elementi chiave di una sedia ergonomica di qualit&agrave;' },
      { type: 'heading', text: 'Le caratteristiche da valutare' },
      { type: 'paragraph', text: '<strong>Altezza seduta regolabile</strong> &mdash; La seduta deve permettere di appoggiare i piedi a terra con le ginocchia a 90&deg;. L\'ideale &egrave; un pistone a gas certificato per almeno 10.000 cicli.' },
      { type: 'paragraph', text: '<strong>Schienale regolabile in altezza e profondit&agrave;</strong> &mdash; Lo schienale deve sostenere la curva lombare naturale. Le sedie premium offrono regolazione a profondit&agrave; variabile e meccanismi sincronizzati che seguono il movimento del corpo.' },
      { type: 'paragraph', text: '<strong>Braccioli multidirezionali</strong> &mdash; I braccioli 4D (regolabili in altezza, profondit&agrave;, larghezza e rotazione) permettono di mantenere le spalle rilassate e le braccia in posizione naturale durante la digitazione.' },
      { type: 'paragraph', text: '<strong>Materiali di qualit&agrave;</strong> &mdash; La rete traspirante (mesh) &egrave; ideale per chi passa molte ore seduto: favorisce la circolazione dell\'aria e previene la sudorazione. La schiuma ad alta densit&agrave; offre comfort duraturo nel tempo.' },
      { type: 'image', src:  './product-aura.jpg', alt: 'Sedia ergonomica AURA Pro', caption: 'La AURA Pro rappresenta il top di gamma per l\'ergonomia made in Italy' },
      { type: 'heading', text: 'Quanto spendere?' },
      { type: 'paragraph', text: 'Il mercato offre opzioni per ogni fascia di prezzo. Con meno di &euro;200 trovi sedie entry-level con regolazioni di base. Tra &euro;200 e &euro;500 si collocano i modelli mid-range, spesso con ottime caratteristiche ergonomiche. Oltre &euro;500 si entra nel mondo delle sedie professionali, con materiali premium, meccanismi avanzati e garanzie estese fino a 10 anni.' },
      { type: 'quote', text: 'Investire in una buona sedia ergonomica non &egrave; un costo, ma un investimento sulla propria salute. Dividendo il prezzo per i giorni lavorativi in un anno, si parla spesso di meno di un caff&egrave; al giorno.' },
      { type: 'heading', text: 'Conclusione' },
      { type: 'paragraph', text: 'La sedia ergonomica perfetta esiste, ma &egrave; diversa per ogni persona. Valuta il tuo fisico, le tue abitudini di lavoro e il tuo budget. Non aver paura di provare pi&ugrave; modelli prima di decidere: il comfort &egrave; soggettivo, ma la qualit&agrave; ergonomica si misura in regolazioni, materiali e certificazioni.' },
    ],
    relatedProducts: [
      { name: 'Sedia Ergonomica AURA Pro', price: '€549,00', image:  './product-aura.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Sedia Ergonomica CLOUD Mesh', price: '€329,00', image:  './featured-1.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Sedia Operativa START', price: '€189,00', image:  './hero-fallback.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Sedia Direzionale PRIME', price: '€789,00', image:  './news-3.jpg', link: 'https://mobiliufficio.it' },
    ],
    tags: ['Sedia ergonomica', 'Ufficio', 'Design', 'Made in Italy', 'Wellness'],
  },
  'scrivanie-minimaliste-uffici': {
    slug: 'scrivanie-minimaliste-uffici',
    title: 'Scrivanie minimaliste per uffici moderni',
    category: 'GUIDE',
    date: '10 Gennaio 2026',
    readTime: '6 min',
    coverImage:  './featured-2.jpg',
    excerpt: 'Less is more: come scegliere scrivanie minimaliste che uniscono estetica e funzionalit&agrave;.',
    content: [
      { type: 'paragraph', text: 'Il minimalismo nell\'arredo ufficio non &egrave; solo una moda, ma una filosofia di lavoro. Una scrivania pulita, senza ingombri superflui, favorisce la concentrazione e riduce lo stress visivo. Scopriamo insieme come scegliere la scrivania minimalista perfetta per il tuo spazio di lavoro.' },
      { type: 'heading', text: 'Cos\'&egrave; il minimalismo in ufficio' },
      { type: 'paragraph', text: 'Il minimalismo applicato all\'ufficio si traduce in spazi essenziali, linee pulite e materiali di qualit&agrave;. Non significa rinunciare al comfort o alla funzionalit&agrave;, ma piuttosto eliminare il superfluo per concentrarsi su ci&ograve; che conta davvero.' },
      { type: 'image', src:  './featured-2.jpg', alt: 'Scrivania minimalista bianca', caption: 'Una scrivania minimalista trasforma qualsiasi spazio in un ambiente di lavoro sereno' },
      { type: 'heading', text: 'Caratteristiche delle scrivanie minimaliste' },
      { type: 'paragraph', text: '<strong>Linee essenziali</strong> &mdash; Nessun fronzolo, nessun elemento decorativo inutile. La bellezza nasce dalla pulizia delle forme e dalla qualit&agrave; dei materiali.' },
      { type: 'paragraph', text: '<strong>Materiali naturali</strong> &mdash; Legno massello, bamboo, acciaio verniciato a polvere. Materiali che durano nel tempo e migliorano con l\'uso.' },
      { type: 'paragraph', text: '<strong>Gestione dei cavi</strong> &mdash; Un vero minimalista odia i cavi visibili. Le migliori scrivanie integrano sistemi di passacavi e canaline nascoste.' },
      { type: 'quote', text: 'La semplicit&agrave; &egrave; la massima sofisticazione. Una scrivania minimalista non &egrave; vuota: &egrave; intenzionale.' },
      { type: 'heading', text: 'Conclusione' },
      { type: 'paragraph', text: 'Scegliere una scrivania minimalista significa investire in un ambiente di lavoro che promuove la chiarezza mentale. Su mobiliufficio.it trovi una selezione curata delle migliori scrivanie per ogni stile e budget.' },
    ],
    relatedProducts: [
      { name: 'Scrivania NORDIC 140', price: '€289,00', image:  './featured-2.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Scrivania PURE 160', price: '€429,00', image:  './news-2.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Scrivania STANDING DESK', price: '€649,00', image:  './news-4.jpg', link: 'https://mobiliufficio.it' },
    ],
    tags: ['Scrivania', 'Minimalismo', 'Design', 'Ufficio moderno'],
  },
  'arredare-coworking': {
    slug: 'arredare-coworking',
    title: 'Come arredare uno spazio di coworking',
    category: 'GUIDE',
    date: '5 Gennaio 2026',
    readTime: '10 min',
    coverImage:  './featured-3.jpg',
    excerpt: 'Spazi flessibili, comfort e design: la guida completa per arredare un coworking di successo.',
    content: [
      { type: 'paragraph', text: 'Arredare uno spazio di coworking &egrave; una sfida affascinante: bisogna bilanciare estetica, funzionalit&agrave;, comfort acustico e flessibilit&agrave;. Una guida pratica per creare ambienti dove la produttivit&agrave; e la creativit&agrave; flourish.' },
      { type: 'heading', text: 'La filosofia del coworking moderno' },
      { type: 'paragraph', text: 'Il coworking non &egrave; pi&ugrave; una tendenza, ma una realt&agrave; consolidata. In Italia sono oltre 600 gli spazi di coworking attivi, e il numero cresce ogni anno. Gli utenti cercano ambienti che siano professionali ma accoglienti, flessibili ma strutturati.' },
      { type: 'image', src:  './featured-3.jpg', alt: 'Spazio coworking moderno', caption: 'Un coworking ben arredato favorisce la collaborazione spontanea' },
      { type: 'heading', text: 'Zone fondamentali' },
      { type: 'paragraph', text: '<strong>Focus zone</strong> &mdash; Aree silenziose con scrivanie individuali, schermi divisori fonoassorbenti e illuminazione calibrata per il lavoro concentrato.' },
      { type: 'paragraph', text: '<strong>Collaboration zone</strong> &mdash; Tavoli grandi, schermi condivisi, lavagne magnetiche. Spazi progettati per il brainstorming e il lavoro di squadra.' },
      { type: 'paragraph', text: '<strong>Relax zone</strong> &mdash; Divani, poltrone, piante, caff&egrave;. Aree di ricarica dove staccare la spina per pochi minuti e tornare al lavoro con energia rinnovata.' },
      { type: 'quote', text: 'Il segreto di un coworking di successo? Creare ambienti diversi per diverse modalit&agrave; di lavoro. Un solo open space non basta pi&ugrave;.' },
      { type: 'heading', text: 'Conclusione' },
      { type: 'paragraph', text: 'Arredare un coworking richiede competenze specifiche. Su mobiliufficio.it trovi mobili progettati appositamente per spazi di lavoro condivisi, con garanzia commerciale e consulenza dedicata.' },
    ],
    relatedProducts: [
      { name: 'Tavolo Riunioni CUBE', price: '€899,00', image:  './featured-3.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Divano modulare WORK', price: '€1.249,00', image:  './news-2.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Parete fonoassorbente', price: '€349,00', image:  './news-3.jpg', link: 'https://mobiliufficio.it' },
    ],
    tags: ['Coworking', 'Arredo ufficio', 'Benessere', 'Biophilic design'],
  },
  'tendenze-arredo-2026': {
    slug: 'tendenze-arredo-2026',
    title: 'Le tendenze arredo ufficio 2026',
    category: 'DESIGN',
    date: '12 Gennaio 2026',
    readTime: '7 min',
    coverImage:  './news-2.jpg',
    excerpt: 'Minimalismo caldo, materiali naturali e tecnologia integrata: cosa aspettarsi quest\'anno.',
    content: [
      { type: 'paragraph', text: 'Il 2026 porta novit&agrave; interessanti nel mondo dell\'arredo per ufficio. Dopo gli anni dello smart working forzato, le aziende italiane stanno reinvestendo negli spazi fisici, cercando un equilibrio tra home comfort e professionalit&agrave;.' },
      { type: 'heading', text: 'Minimalismo caldo' },
      { type: 'paragraph', text: 'Addio minimalismo freddo e asettico. Il 2026 premia linee pulite ma materiali caldi: legno chiaro, tessuti naturali, tonalit&agrave; terra. L\'ufficio deve essere ordinato, s&igrave;, ma anche accogliente.' },
      { type: 'image', src:  './news-2.jpg', alt: 'Coworking con piante', caption: 'Il biophilic design &egrave; una delle tendenze dominanti del 2026' },
      { type: 'heading', text: 'Tecnologia invisibile' },
      { type: 'paragraph', text: 'Prese, cavi, schermi: tutto si nasce. Le scrivanie integrano hub di ricarica wireless, i monitor sono sosteniti da bracci che scompaiono dietro il piano, l\'illuminazione &egrave; smart e regolata automaticamente.' },
      { type: 'quote', text: 'La vera tecnologia &egrave; quella che non vedi, ma che migliora la tua giornata lavorativa.' },
      { type: 'heading', text: 'Conclusione' },
      { type: 'paragraph', text: 'Su mobiliufficio.it trovi le novit&agrave; 2026 in anteprima, con sconti riservati ai primi ordini.' },
    ],
    relatedProducts: [
      { name: 'Lampada smart LUMI', price: '€159,00', image:  './news-2.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Scrivania ERGO 160', price: '€519,00', image:  './featured-2.jpg', link: 'https://mobiliufficio.it' },
    ],
    tags: ['Tendenze 2026', 'Design', 'Tecnologia', 'Arredo ufficio'],
  },
  'postura-corretta-lavoro': {
    slug: 'postura-corretta-lavoro',
    title: 'Postura corretta al lavoro: la guida definitiva',
    category: 'GUIDE',
    date: '8 Gennaio 2026',
    readTime: '9 min',
    coverImage:  './news-4.jpg',
    excerpt: 'Esercizi, consigli e prodotti per mantenere una postura sana durante le lunghe giornate in ufficio.',
    content: [
      { type: 'paragraph', text: 'Passiamo in media 8 ore al giorno seduti. Una cattiva postura pu&ograve; causare mal di schiena, cervicali, affaticamento visivo e persino problemi digestivi. Questa guida ti offre strumenti pratici per prenderti cura della tua schiena.' },
      { type: 'heading', text: 'La postura ideale' },
      { type: 'paragraph', text: 'Schiena dritta ma non rigida, spalle rilassate, piedi appoggiati a terra, schermo all\'altezza degli occhi. Sembra semplice, ma mantenere questa posizione per ore &egrave; difficile senza gli strumenti giusti.' },
      { type: 'image', src:  './news-4.jpg', alt: 'Postura corretta al lavoro', caption: 'La corretta altezza dello schermo &egrave; fondamentale per prevenire il collo rigido' },
      { type: 'heading', text: 'Esercizi da scrivania' },
      { type: 'paragraph', text: '<strong>Rotazione collo</strong> &mdash; 10 rotazioni lente per lato, ogni 2 ore. Scioglie la tensione cervicale.' },
      { type: 'paragraph', text: '<strong>Spalle indietro</strong> &mdash; Porta le spalle indietro, come se volessi far incontrare le scapole. Mantieni 10 secondi, ripeti 5 volte.' },
      { type: 'paragraph', text: '<strong>Piedi a terra</strong> &mdash; Appoggia i piedi per intero, non incrociare le gambe. Usa un poggiapiedi se le gambe non toccano terra.' },
      { type: 'quote', text: 'La migliore postura &egrave; quella che cambia. Alza\'ti ogni 30 minuti, anche solo per 2 minuti.' },
      { type: 'heading', text: 'Conclusione' },
      { type: 'paragraph', text: 'La postura corretta si costruisce con piccole abitudini quotidiane e con l\'arredo giusto. Su mobiliufficio.it trovi sedie ergonomiche, supporti monitor e accessori per il benessere in ufficio.' },
    ],
    relatedProducts: [
      { name: 'Supporto monitor ERGO', price: '€89,00', image:  './news-4.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Sedia AURA Pro', price: '€549,00', image:  './product-aura.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Poggiapiedi COMFORT', price: '€49,00', image:  './hero-fallback.jpg', link: 'https://mobiliufficio.it' },
    ],
    tags: ['Postura', 'Ergonomia', 'Wellness', 'Guida pratica'],
  },
  'salone-mobile-2026': {
    slug: 'salone-mobile-2026',
    title: 'Salone del Mobile 2026: le novit&agrave; per l\'ufficio',
    category: "NOVITA'",
    date: '20 Gennaio 2026',
    readTime: '6 min',
    coverImage:  './news-3.jpg',
    excerpt: 'Le novit&agrave; dal Salone del Mobile 2026: cosa cambier&agrave; negli uffici italiani.',
    content: [
      { type: 'paragraph', text: 'Il Salone del Mobile 2026 ha aperto i battenti con una novit&agrave; assoluta: un intero padiglione dedicato all\'Office Design. Abbiamo selezionato per voi le tendenze e i prodotti che arriveranno presto su mobiliufficio.it.' },
      { type: 'heading', text: 'Le novit&agrave; in anteprima' },
      { type: 'paragraph', text: '<strong>Sedie auto-regolanti</strong> &mdash; Sensori integrati nella seduta rilevano il peso e la postura, adattando automaticamente la tensione dello schienale.' },
      { type: 'paragraph', text: '<strong>Scrivanie AR</strong> &mdash; Superfici interattive che proiettano informazioni, calendari e appunti direttamente sul piano di lavoro.' },
      { type: 'image', src:  './news-3.jpg', alt: 'Showroom Salone del Mobile', caption: 'Il padiglione Office Design ha registrato oltre 50.000 visitatori in 3 giorni' },
      { type: 'quote', text: 'Il futuro dell\'ufficio &egrave; ibrido, sostenibile e profondamente umano. La tecnologia &egrave; al servizio del benessere, non il contrario.' },
      { type: 'heading', text: 'Conclusione' },
      { type: 'paragraph', text: 'Tutte le novit&agrave; del Salone saranno disponibili in esclusiva su mobiliufficio.it. Iscriviti alla newsletter per essere il primo a scoprirle.' },
    ],
    relatedProducts: [
      { name: 'Sedia SMART Ergo', price: '€1.299,00', image:  './news-3.jpg', link: 'https://mobiliufficio.it' },
      { name: 'Scrivania AR Desk', price: '€2.499,00', image:  './news-2.jpg', link: 'https://mobiliufficio.it' },
    ],
    tags: ['Salone del Mobile', 'Novit\u00E0 2026', 'Design', 'Arredo ufficio'],
  },
  'kitchen-2026-linea-office': {
    slug: 'kitchen-2026-linea-office',
    title: 'Kitchen 2026: la nuova linea Office-Kitchen per aree break e spazi conviviali',
    category: "NOVITA'",
    date: '20 Maggio 2026',
    readTime: '6 min',
    coverImage:  './kitchen-2026.jpg',
    excerpt: 'Scopri Office-Kitchen, la nuova collezione LAS pensata per aree break, cucine ufficio e spazi conviviali: design contemporaneo, funzionalit\u00E0 ed essenzialit\u00E0.',
    content: [
      { type: 'paragraph', text: "Il mondo dell'arredo ufficio evolve costantemente, e la nuova linea <strong>Kitchen 2026</strong> rappresenta una delle novita' piu' interessanti dell'anno. Pensata per aree break e spazi conviviali, Office-Kitchen unisce design contemporaneo, funzionalita' ed essenzialita' in una soluzione versatile e intelligente, ideale per uffici moderni e ambienti condivisi." },
      { type: 'heading', text: 'Cos\'\u00E8 Office-Kitchen' },
      { type: 'paragraph', text: 'Office-Kitchen \u00E8 la nuova collezione di <strong>armadi e contenitori</strong> pensata da LAS per trasformare le aree break in spazi eleganti e funzionali. Le linee pulite e le finiture curate rendono ogni elemento un pezzo d\'arredo capace di integrarsi perfettamente in qualsiasi contesto, offrendo praticit\u00E0 e comfort nei momenti di pausa e socialit\u00E0.' },
      { type: 'image', src:  './kitchen-2026.jpg', alt: 'Linea Office-Kitchen 2026', caption: 'La linea Office-Kitchen trasforma le aree break in spazi conviviali eleganti e funzionali' },
      { type: 'heading', text: 'Design contemporaneo e versatilit\u00E0' },
      { type: 'paragraph', text: 'La caratteristica distintiva della collezione Kitchen 2026 \u00E8 la sua <strong>versatilit\u00E0</strong>. I moduli possono essere combinati tra loro per creare configurazioni personalizzate, adattandosi a spazi di ogni dimensione: dalla piccola cucina aziendale alla grande area break open space.' },
      { type: 'paragraph', text: '<strong>Armadi multifunzione</strong> &mdash; Spazi interni ottimizzati per riporre stoviglie, elettrodomestici e accessori in modo ordinato e accessibile.' },
      { type: 'paragraph', text: '<strong>Contenitori modulari</strong> &mdash; Sistemi di archiviazione flessibili che si adattano alle esigenze specifiche di ogni ambiente.' },
      { type: 'paragraph', text: '<strong>Linee pulite</strong> &mdash; Design minimalista che si integra armoniosamente con qualsiasi stile d\'arredo esistente.' },
      { type: 'image', src:  './kitchen-las-02.jpg', alt: 'Office-Kitchen dettaglio', caption: 'Dettaglio della linea Office-Kitchen: linee pulite e finiture curate per ogni ambiente' },
      { type: 'heading', text: 'Gamma colori e finiture' },
      { type: 'paragraph', text: 'La collezione Kitchen 2026 offre una gamma di finiture accuratamente selezionate per soddisfare ogni gusto stilistico. Dai toni neutri alle nuances pi\u00F9 audaci, ogni finitura \u00E8 pensata per durare nel tempo e mantenere il proprio aspetto impeccabile anche con un uso intensivo.' },
      { type: 'paragraph', text: 'I colori disponibili includono tonalit\u00E0 calde come il <strong>Cappuccino</strong> e il <strong>Red Curry</strong>, finiture naturali come il <strong>Rovere Sabbia</strong>, e classiche come il <strong>Bianco</strong> e il <strong>Top scuro Esterel</strong>. Una palette che permette di creare combinazioni uniche e personalizzate.' },
      { type: 'image', src:  './kitchen-las-03.jpg', alt: 'Office-Kitchen composizione', caption: 'Composizione completa Office-Kitchen: versatilit\u00E0 e design per aree break moderne' },
      { type: 'quote', text: 'Office-Kitchen \u00E8 pi\u00F9 di una semplice cucina per l\'ufficio: \u00E8 uno spazio dove le persone si incontrano, condividono idee e ricaricano le energie durante la giornata lavorativa.' },
      { type: 'heading', text: 'Perch\u00E9 scegliere Kitchen 2026' },
      { type: 'paragraph', text: 'Scegliere la linea Kitchen 2026 significa investire in <strong>qualit\u00E0, design e funzionalit\u00E0</strong>. I materiali selezionati garantiscono resistenza e durabilit\u00E0 nel tempo, mentre le soluzioni modulari permettono di adattare la configurazione alle esigenze in evoluzione dello spazio.' },
      { type: 'paragraph', text: 'La collezione \u00E8 progettata per facilitare la manutenzione quotidiana: superfici lisce, materiali resistenti ai graffi e alle macchie, e una costruzione robusta che garantisce stabilit\u00E0 e sicurezza.' },
      { type: 'image', src:  './kitchen-las-04.jpg', alt: 'Office-Kitchen in ambiente ufficio', caption: 'Office-Kitchen integrata in un ambiente di lavoro moderno' },
      { type: 'heading', text: 'Dove trovare Kitchen 2026' },
      { type: 'paragraph', text: 'La linea completa Kitchen 2026 \u00E8 disponibile in esclusiva su <strong>mobiliufficio.it</strong>. Sul sito trovi tutti i modelli, le configurazioni possibili, le schede tecniche dettagliate e la consulenza dei nostri esperti per progettare la tua area break ideale.' },
    ],
    relatedProducts: [
      { name: '175.K01 proposta OFFICE KITCHEN cucina monoblocco', price: '3.167,12 €', image:  './product-kitchen-cucina.jpg', link: 'https://mobiliufficio.it/175-k01-proposta-kitchen-01-cucina-monoblocco.html' },
      { name: '175.192 cestino KITCHEN per la raccolta differenziata', price: '441,64 €', image:  './product-kitchen-cestino.jpg', link: 'https://mobiliufficio.it/175-192-cestino-kitchen-per-la-raccolta-differenziata.html' },
      { name: 'Vedi tutti i prodotti KITCHEN', price: 'Scopri di più', image:  './kitchen-2026.jpg', link: 'https://mobiliufficio.it/mobili-ufficio/kitchen-cucina.html' },
    ],
    tags: ['office kitchen', 'cucine da ufficio', 'office break'],
  },
  '20-anni-kicca-kastel': {
    slug: '20-anni-kicca-kastel',
    title: 'I 20 anni di Kicca: due decadi di design senza tempo',
    category: 'NOVITA',
    date: '21 Maggio 2026',
    readTime: '7 min',
    coverImage:  './kicca-20-anni-hero.jpg',
    excerpt: 'Kicca compie 20 anni. Venti anni di storia, evoluzione e design senza tempo per la sedia iconica di Kastel.',
    content: [
      { type: 'paragraph', text: 'Mi chiamo Kicca e da vent\'anni accompagno le persone in ogni momento della loro giornata. Sono nata con un\'idea chiara: unire <strong>comfort, design e funzionalit\u00E0</strong> in un\'unica forma, e da allora non ho mai smesso di evolvermi.' },
      { type: 'image', src:  './kicca-20-anni-hero.jpg', alt: 'Kicca 20 anni - Kastel', caption: 'Kicca compie 20 anni: venti anni di design senza tempo' },
      { type: 'heading', text: 'Una storia di versatilit\u00E0 e stile' },
      { type: 'paragraph', text: 'Ho arredato uffici e sale riunioni, ho accolto studenti nelle aule universitarie, ho reso pi\u00F9 confortevoli gli spazi di attesa e di incontro. Ovunque sia stata, ho lasciato il segno con la mia versatilit\u00E0, la mia resistenza e il mio stile senza tempo.' },
      { type: 'paragraph', text: 'In questi vent\'anni ho cambiato colori, materiali, configurazioni, adattandomi ai nuovi trend e alle esigenze di chi mi sceglie. Eppure, il mio spirito \u00E8 rimasto lo stesso: <strong>praticit\u00E0 ed eleganza in perfetto equilibrio</strong>.' },
      { type: 'heading', text: '2005: Nasce Kicca' },
      { type: 'paragraph', text: 'Con <strong>6 colori scocca e 8 versioni di telaio</strong>. La sedia scelta da designer, architetti e aziende che cercavano qualcosa di pi\u00F9 di una semplice sedia: cercavano un\'icona, un elemento distintivo.' },
      { type: 'image', src:  './kicca-1.png', alt: 'Kicca originale 2005', caption: 'Kicca originale: 6 colori scocca e 8 versioni telaio' },
      { type: 'heading', text: '2015: Lancio Kicca One' },
      { type: 'paragraph', text: 'La sedia <strong>monoblocco in 6 colori</strong>. Nel frattempo, Kicca si arricchisce e presenta 8 nuovi colori scocca e 13 versioni telaio.' },
      { type: 'image', src:  './kicca-2.png', alt: 'Kicca One 2015', caption: 'Kicca One: la sedia monoblocco in 6 colori' },
      { type: 'heading', text: '2017: Evoluzione Kicca One' },
      { type: 'paragraph', text: 'Visto il successo ottenuto, Kicca One evolve e presenta <strong>3 nuovi colori</strong> adatti ad ogni stile di vita.' },
      { type: 'heading', text: '2020: Kicca inarrestabile' },
      { type: 'paragraph', text: 'Mentre celebra i primi 15 anni di vita, Kicca guarda al futuro con la stessa ambizione del primo giorno. Kicca \u00E8 presente con <strong>9 colori scocca e 15 versioni telaio</strong>.' },
      { type: 'image', src:  './kicca-3.png', alt: 'Kicca 2020', caption: 'Kicca 2020: 9 colori scocca e 15 versioni telaio' },
      { type: 'heading', text: '2022: Kicca Plus e Kicca One 2nd life' },
      { type: 'paragraph', text: 'Entra in scena <strong>Kicca Plus</strong>: la scocca diventa interamente imbottita. Contemporaneamente viene presentata <strong>Kicca One 2nd life</strong>, strizzando l\'occhio all\'ambiente: la sedia monoblocco in <strong>polipropilene riciclato</strong>.' },
      { type: 'image', src:  './kicca-4.png', alt: 'Kicca Plus 2022', caption: 'Kicca Plus: scocca interamente imbottita per il massimo comfort' },
      { type: 'heading', text: '2025: 20\u00B0 compleanno di Kicca' },
      { type: 'paragraph', text: 'Per festeggiare i 20 anni, Kicca aggiunge <strong>4 nuovi colori in plastica riciclata</strong>, <strong>6 nuove varianti di colore telaio</strong>, disponibili anche per Kicca Plus, e <strong>2 nuovi colori per Kicca One</strong>.' },
      { type: 'paragraph', text: 'Oggi Kicca spegne 20 candeline e vuole dire grazie a chi l\'ha progettata, a chi l\'ha scelta, a chi si \u00E8 seduto su di lei e ha condiviso un pezzo della propria storia. I primi vent\'anni sono solo l\'inizio.' },
      { type: 'quote', text: 'Mi chiamo Kicca e il mio viaggio continua. E ora: tutti seduti, che si festeggia!' },
      { type: 'heading', text: 'Scopri Kicca su mobiliufficio.it' },
      { type: 'paragraph', text: 'La linea completa Kicca \u00E8 disponibile su <strong>mobiliufficio.it</strong>. Scopri tutte le varianti, i colori e le configurazioni di questa icona del design made in Italy.' },
    ],
    relatedProducts: [
      { name: 'KC10 sedia KICCA ONE', price: '106,43 €', image:  './product-kc10.jpg', link: 'https://mobiliufficio.it/kc10-sedia-kicca-one-normativa-europea-en-16139-livello-1.html' },
      { name: 'KL1 sedia KLIA in polipropilene', price: '103,88 €', image:  './product-kl1.jpg', link: 'https://mobiliufficio.it/kl1-sedia-klia-in-polipropilene.html' },
      { name: 'KA1 sedia KALEA con telaio 4 piedi', price: '131,76 €', image:  './product-ka1.jpg', link: 'https://mobiliufficio.it/ka1-sedia-kalea-con-telaio-4-piedi.html' },
      { name: 'KR1X sedia KRIZIA in policarbonato', price: '180,56 €', image:  './product-kr1.jpg', link: 'https://mobiliufficio.it/kr1x-sedia-krizia-in-policarbonato.html' },
      { name: 'KFT213 poltrona KONFORT operativa', price: '239,12 €', image:  './product-kft213.jpg', link: 'https://mobiliufficio.it/kft213-poltrona-konfort-senza-braccioli.html' },
      { name: 'Scopri tutta la linea KASTEL', price: 'Vedi tutti', image:  './logo-kastel.jpg', link: 'https://mobiliufficio.it/linee-arredo/kastel-confort-design.html' },
    ],
    tags: ['Kicca', 'Kastel', 'Sedia', '20 anni', 'Design', 'Anniversario'],
  },
  'poltrona-dattilo-ariston-aa08': {
    slug: 'poltrona-dattilo-ariston-aa08',
    title: 'AA08 Poltrona Dattilo Ariston: la piu venduta perche funziona davvero',
    category: 'PRODOTTI',
    date: '22 Maggio 2026',
    readTime: '5 min',
    coverImage:  './ariston-1.jpg',
    excerpt: 'Scopri perche l AA08 Poltrona Ariston e l articolo piu venduto su mobiliufficio.it: comfort, versatilita e qualita a un prezzo imbattibile.',
    content: [
      { type: 'paragraph', text: 'Ci sono prodotti che non hanno bisogno di presentazioni: l\'<strong>AA08 Poltrona Dattilo Ariston</strong> e uno di questi. E l\'articolo piu venduto su mobiliufficio.it e il motivo e semplice: funziona. Qualita, comfort e versatilita a un prezzo che pochi possono eguagliare.' },
      { type: 'image', src:  './ariston-1.jpg', alt: 'AA08 Poltrona Dattilo Ariston', caption: 'L AA08 Poltrona Ariston: il best seller di mobiliufficio.it' },
      { type: 'image', src:  './ariston-2.jpg', alt: 'AA08 Poltrona Ariston dettaglio', caption: 'Dettaglio della AA08 Poltrona Ariston: schienale alto e braccioli ergonomici' },
      { type: 'heading', text: 'Design funzionale ed ergonomico' },
      { type: 'paragraph', text: 'L AA08 Ariston e una <strong>poltrona operativa con schienale alto e braccioli</strong>, pensata per chi trasc ore seduto al lavoro. Lo schienale alto in polipropilene con imbottitura in poliuretano espanso offre un sostegno completo alla schiena, riducendo l affaticamento durante le lunghe giornate in ufficio.' },
      { type: 'paragraph', text: 'Il <strong>meccanismo a Contatto Permanente</strong> consente la regolazione manuale in piu posizioni dello schienale sia in profondita che in altezza. Inoltre, l altezza del sedile e regolabile tramite pompa a gas, adattandosi a ogni esigenza e statura.' },
      { type: 'heading', text: 'Materiali di qualita per una lunga durata' },
      { type: 'paragraph', text: 'La seduta e realizzata in <strong>multistrato di pioppo e faggio da 12 mm</strong>, un materiale robusto e flessibile che garantisce resistenza nel tempo. Lo schienale in polipropilene e facile da pulire e mantiene il suo aspetto anche dopo anni di utilizzo intenso.' },
      { type: 'paragraph', text: 'I <strong>braccioli fissi in polipropilene</strong> offrono un comodo appoggio per le braccia, riducendo lo stress su spalle e collo. Il <strong>basamento a cinque razze in nylon</strong> garantisce stabilita e sicurezza su qualsiasi superficie.' },
      { type: 'heading', text: 'Personalizzazione e versatilita' },
      { type: 'paragraph', text: 'Uno dei punti di forza dell AA08 Ariston e la sua <strong>versatilita cromatica</strong>. Il rivestimento in tessuto e disponibile in molteplici colori, permettendo di abbinare la poltrona a qualsiasi arredo ufficio. Dalle tonalita neutre come il nero e il grigio, ai colori piu vivaci per chi vuole dare un tocco di personalita al proprio spazio di lavoro.' },
      { type: 'quote', text: 'Non e solo una poltrona: e un investimento nel comfort e nella produttivita quotidiana.' },
      { type: 'heading', text: 'Le specifiche tecniche' },
      { type: 'paragraph', text: '<strong>Dimensioni:</strong> L. 63 x P. 60 x H. sedile 42/56 x H. schienale 99/113 cm<br/><strong>Sedile:</strong> multistrato pioppo e faggio 12 mm<br/><strong>Schienale:</strong> polipropilene con imbottitura poliuretano espanso<br/><strong>Meccanismo:</strong> Contatto Permanente, regolazione schienale profondita/altezza, alzata a gas<br/><strong>Braccioli:</strong> fissi in polipropilene<br/><strong>Basamento:</strong> cinque razze in nylon<br/><strong>Colori:</strong> molteplici colori tessuto disponibili' },
      { type: 'heading', text: 'Perche e la piu venduta' },
      { type: 'paragraph', text: 'L AA08 Ariston e la poltrona piu venduta su mobiliufficio.it perche risponde a un\'esigenza reale: offrire un prodotto <strong>affidabile, ergonomico ed economico</strong>. A soli <strong>80,52 euro</strong> (IVA inclusa e trasporto gratis), rappresenta un rapporto qualita-prezzo difficile da battere. Consegna in 24/35 giorni lavorativi e disponibilita immediata la rendono la scelta ideale per arredamenti rapidi e senza compromessi.' },
      { type: 'paragraph', text: 'Scopri subito l AA08 Poltrona Dattilo Ariston su <strong>mobiliufficio.it</strong> e capisci perche migliaia di clienti l hanno scelta.' },
    ],
    relatedProducts: [
      { name: 'AA08 Poltrona Dattilo ARISTON', price: '80,52 €', image:  './ariston-1.jpg', link: 'https://mobiliufficio.it/aa-08-poltrona-dattilo-ariston.html' },
      { name: 'Scopri altri prodotti su mobiliufficio.it', price: 'Vedi tutti', image:  './ariston-2.jpg', link: 'https://mobiliufficio.it' },
    ],
    tags: ['Ariston', 'Poltrona operativa', 'Best seller', 'Ufficio', 'Ergonimica'],
  },
  'panca-gig-bk234-best-seller': {
    slug: 'panca-gig-bk234-best-seller',
    title: 'BK234 Panca GIG: la panca da attesa piu venduta, simbolo di robustezza',
    category: 'PRODOTTI',
    date: '22 Maggio 2026',
    readTime: '5 min',
    coverImage:  './panca-gig-1.jpg',
    excerpt: 'Scopri perche la BK234 Panca GIG e la panca da attesa piu venduta su mobiliufficio.it: robustezza, durabilita e versatilita per ogni ambiente.',
    content: [
      { type: 'paragraph', text: 'Quando si parla di <strong>arredo per sale d attesa, studi medici, uffici pubblici e privati</strong>, esiste un nome che ritorna costantemente: la <strong>BK234 Panca GIG</strong>. E la panca da attesa piu venduta su mobiliufficio.it, e il motivo e semplice: e stata progettata per durare nel tempo, resistere a un uso intensivo e mantenere il suo aspetto impeccabile anno dopo anno.' },
      { type: 'image', src:  './panca-gig-1.jpg', alt: 'BK234 Panca GIG 4 posti', caption: 'La BK234 Panca GIG: la panca da attesa piu venduta di mobiliufficio.it' },
      { type: 'heading', text: 'Una struttura pensata per la durata' },
      { type: 'paragraph', text: 'Il segreto della robustezza della Panca GIG risiede nella sua <strong>struttura in trave di tubo quadro d acciaio mm 80 x 40</strong>. Questo telaio in metallo garantisce stabilita e resistenza anche con carichi elevati e utilizzo continuo. I <strong>piedi in acciaio verniciato nero</strong> con piedini in nylon completano una base solida e sicura su qualsiasi tipo di pavimento.' },
      { type: 'paragraph', text: 'Seduta e schienale sono realizzati in <strong>polipropilene colorato</strong>, un materiale pratico, facile da pulire e resistente all usura. Disponibile anche in versione <strong>polipropilene ignifugo</strong> (solo blu o nero) per ambienti che richiedono certificazioni di sicurezza aggiuntive.' },
      { type: 'image', src:  './panca-gig-2.jpg', alt: 'BK234 Panca GIG dettaglio', caption: 'Dettaglio della struttura in acciaio e seduta in polipropilene della Panca GIG' },
      { type: 'heading', text: 'Versatilita per ogni esigenza' },
      { type: 'paragraph', text: 'La Panca GIG si adatta a ogni spazio grazie alle sue <strong>quattro configurazioni disponibili</strong>: 2, 3, 4 o 5 posti. Che si tratti di una piccola sala d attesa o di un grande ambiente pubblico, c e sempre la soluzione giusta.' },
      { type: 'paragraph', text: '<strong>BK02 - 2 posti:</strong> L. 100 x P. 57 x H. schienale 78 x H. seduta 44 cm<br/><strong>BK03 - 3 posti:</strong> L. 150 x P. 57 x H. schienale 78 x H. seduta 44 cm<br/><strong>BK04 - 4 posti:</strong> L. 200 x P. 57 x H. schienale 78 x H. seduta 44 cm<br/><strong>BK05 - 5 posti:</strong> L. 250 x P. 57 x H. schienale 78 x H. seduta 44 cm' },
      { type: 'heading', text: 'Colori per ogni ambiente' },
      { type: 'paragraph', text: 'La Panca GIG e disponibile in <strong>sei colori</strong> per seduta e schienale: Bianco, Nero, Grigio, Blu, Rosso e Arancione. Questa gamma cromatica permette di abbinare la panca a qualsiasi arredo esistente, dalle sale d attesa istituzionali agli spazi piu moderni e colorati.' },
      { type: 'quote', text: 'La BK234 Panca GIG non e solo una panca: e una scelta di affidabilita, pensata per chi cerca qualita che dura nel tempo.' },
      { type: 'heading', text: 'Perche e la piu venduta' },
      { type: 'paragraph', text: 'A partire da <strong>soli 146,40 euro</strong> (IVA inclusa e trasporto gratis per ordini superiori a 250 euro), la Panca GIG offre un rapporto qualita-prezzo imbattibile. Consegna in <strong>18/24 giorni lavorativi</strong>, disponibilita immediata e una robustezza che pochi prodotti possono eguagliare.' },
      { type: 'paragraph', text: 'Migliaia di clienti hanno scelto la BK234 Panca GIG per i loro spazi: scopri subito perche su <strong>mobiliufficio.it</strong>.' },
    ],
    relatedProducts: [
      { name: 'BK234 Panca GIG 2/3/4/5 posti', price: '146,40 €', image:  './panca-gig-1.jpg', link: 'https://mobiliufficio.it/bk234-panca-attesa-gig-2-3-4-5-posti-su-trave-in-metallo.html' },
      { name: 'Scopri altri prodotti su mobiliufficio.it', price: 'Vedi tutti', image:  './panca-gig-2.jpg', link: 'https://mobiliufficio.it' },
    ],
    tags: ['Panca attesa', 'GIG', 'Best seller', 'Robustezza', 'Ufficio'],
  },
  'ke123n-key-line-poltrona-operativa': {
    slug: 'ke123n-key-line-poltrona-operativa',
    title: 'KE123N Key Line: la poltrona operativa che unisce design e tecnologia',
    category: 'PRODOTTI',
    date: '22 Maggio 2026',
    readTime: '6 min',
    coverImage:  './keyline-article-1.jpg',
    excerpt: 'La KE123N Key Line e una poltrona operativa a rete con struttura in poliammide rinforzata, progettata per chi cerca ergonomia e stile nel lavoro quotidiano.',
    content: [
      { type: 'paragraph', text: 'Nel mondo delle sedute da ufficio, esistono prodotti che distinguono per la loro capacita di unire <strong>tecnologia, ergonomia e design</strong> in un unico elemento. La <strong>KE123N Key Line</strong> e una di queste: una poltrona operativa a rete che rappresenta il connubio perfetto tra innovazione materica e comfort quotidiano.' },
      { type: 'image', src:  './keyline-article-1.jpg', alt: 'KE123N Key Line poltrona operativa', caption: 'La KE123N Key Line: poltrona operativa con struttura in poliammide rinforzata' },
      { type: 'heading', text: 'Struttura tecnologica e materiali di pregio' },
      { type: 'paragraph', text: 'La struttura della Key Line e realizzata in <strong>poliammide rinforzata con fibra di vetro</strong>, un materiale che garantisce leggerezza, resistenza e durabilita nel tempo. La <strong>rete portante in poliestere termoretraibile</strong> che costituisce sedile e schienale offre un sostegno ergonomico naturale, favorendo la circolazione dell aria e riducendo l accumulo di calore durante le lunghe sedute.' },
      { type: 'paragraph', text: 'I <strong>braccioli integrati</strong> completano il design ergonomico, offrendo un comodo appoggio che allevia lo stress su spalle e collo. Il tutto in un profilo slanciato e moderno che si integra perfettamente in qualsiasi ambiente di lavoro contemporaneo.' },
      { type: 'image', src:  './keyline-article-2.jpg', alt: 'KE123N Key Line dettaglio rete', caption: 'Dettaglio della rete portante in poliestere termoretraibile' },
      { type: 'heading', text: 'Meccanismo e regolazioni avanzate' },
      { type: 'paragraph', text: 'La KE123N Key Line monta un <strong>meccanismo in alluminio con copertura in tecnopolimero</strong> oppure una piastra fissa in acciaio con leva. Il meccanismo oscillante con blocco in posizione di lavoro permette di adattare la sedia alla propria postura preferita, favorendo il movimento naturale della schiena.' },
      { type: 'paragraph', text: 'L <strong>alzata a gas</strong> consente di regolare l altezza del seduta in modo fluido e preciso (H. seduta 48/60 cm), adattandosi a utenti di diverse stature e a diverse tipologie di scrivania. Il basamento a <strong>5 razze in nylon nero rinforzato</strong> (diametro 660 mm) garantisce stabilita e sicurezza.' },
      { type: 'image', src:  './keyline-article-3.jpg', alt: 'KE123N Key Line meccanismo', caption: 'Meccanismo avanzato e basamento a 5 razze rinforzato' },
      { type: 'heading', text: 'Caratteristiche tecniche' },
      { type: 'paragraph', text: '<strong>Dimensioni:</strong> L. 58 x P. 63 x H. schienale 97/109 x H. seduta 48/60 cm<br/><strong>Struttura:</strong> poliammide rinforzata con fibra di vetro nera<br/><strong>Sedile & Schienale:</strong> rete portante in poliestere termoretraibile<br/><strong>Meccanismo:</strong> oscillante con blocco o piastra fissa girevole<br/><strong>Alzata:</strong> colonna con pistone a gas<br/><strong>Base:</strong> 5 razze nylon nero rinforzato, diametro 660 mm<br/><strong>Ruote:</strong> gommate auto-frenanti, diametro 65 mm<br/><strong>Certificazione:</strong> EN1335 C (da richiedere all acquisto)<br/><strong>Consegna:</strong> 14/18 giorni lavorativi' },
      { type: 'quote', text: 'La KE123N Key Line non e solo una sedia: e uno strumento di lavoro progettato per chi passa molte ore seduto e non vuole rinunciare a comfort e benessere.' },
      { type: 'heading', text: 'Perche scegliere la KE123N Key Line' },
      { type: 'paragraph', text: 'A <strong>441,64 euro</strong> (IVA inclusa e trasporto gratis, prezzo di listino 634,40 euro), la KE123N Key Line offre un rapporto qualita-prezzo eccezionale. Un investimento nel proprio benessere quotidiano che si ripaga in termini di salute, produttivita e comfort. Disponibile su <strong>mobiliufficio.it</strong> con consegna in 14/18 giorni lavorativi.' },
    ],
    relatedProducts: [
      { name: 'KE123N poltrona KEY LINE nera', price: '441,64 €', image:  './keyline-article-1.jpg', link: 'https://mobiliufficio.it/ke123n-poltrona-key-line-operativa-a-rete.html' },
      { name: 'KE123B poltrona KEY LINE bianca', price: '441,64 €', image:  './keyline-bianca.jpg', link: 'https://mobiliufficio.it/ke123b-poltrona-key-line-operativa-a-rete.html' },
      { name: 'Scopri tutta la linea KASTEL', price: 'Vedi tutti', image:  './keyline-article-2.jpg', link: 'https://mobiliufficio.it/linee-arredo/kastel-confort-design.html' },
    ],
    tags: ['Key Line', 'Kastel', 'Poltrona operativa', 'Rete', 'Ergonimica', 'Ufficio'],
  },
  'horo-direzionale-anteprima-2026': {
    slug: 'horo-direzionale-anteprima-2026',
    title: 'HORO: la nuova linea direzionale 2026 - Anteprima esclusiva',
    category: 'NOVITA',
    date: '22 Maggio 2026',
    readTime: '5 min',
    coverImage:  './horo-1.jpg',
    excerpt: 'Anteprima esclusiva della collezione HORO: design innovativo, eleganza senza tempo e funzionalita per gli uffici direzionali del futuro.',
    content: [
      { type: 'paragraph', text: 'Siamo orgogliosi di presentare in anteprima assoluta la <strong>collezione HORO</strong>, la nuova linea direzionale che rivoluzionera il concetto di arredo per uffici professionali nel 2026. Un progetto che unisce <strong>design innovativo, materiali di pregio e funzionalita senza compromessi</strong>.' },
      { type: 'image', src:  './horo-1.jpg', alt: 'HORO direzionale anteprima 2026', caption: 'Anteprima esclusiva della collezione HORO direzionale 2026' },
      { type: 'heading', text: 'Design che guarda al futuro' },
      { type: 'paragraph', text: 'La collezione HORO nasce da un\'attenta ricerca su forme, materiali e tecnologie. Ogni elemento e pensato per creare ambienti direzionali che trasmettano <strong>autorevolezza, eleganza e professionalita</strong>. Le linee pulite e le finiture curate caratterizzano una linea destinata a diventare un punto di riferimento nel settore.' },
      { type: 'image', src:  './horo-2.jpg', alt: 'HORO dettaglio design', caption: 'Dettaglio del design innovativo della collezione HORO' },
      { type: 'paragraph', text: 'L\'attenzione al dettaglio si traduce in scelte materiche accurate: legni pregiati, acciai lavorati e tessuti tecnici che garantiscono sia l\'estetica sia la durabilita nel tempo. HORO e una collezione pensata per chi non accetta compromessi tra bellezza e funzionalita.' },
      { type: 'heading', text: 'Caratteristiche principali' },
      { type: 'paragraph', text: '<strong>Eleganza senza tempo</strong> &mdash; Design raffinato che si adatta a qualsiasi ambiente direzionale, dai piu classici ai piu contemporanei.<br/><strong>Materiali di pregio</strong> &mdash; Selezione accurata di legni, acciai e tessiti tecnici per garantire durabilita e resistenza.<br/><strong>Funzionalita avanzata</strong> &mdash; Soluzioni ergonomiche e tecnologiche per il massimo comfort e produttivita.<br/><strong>Personalizzazione</strong> &mdash; Ampia gamma di finiture e configurazioni per adattarsi a ogni esigenza.' },
      { type: 'image', src:  './horo-3.jpg', alt: 'HORO finiture e materiali', caption: 'Finiture premium e materiali di pregio della collezione HORO' },
      { type: 'image', src:  './horo-4.jpg', alt: 'HORO ambiente direzionale', caption: 'La collezione HORO in un ambiente direzionale moderno' },
      { type: 'heading', text: 'In anteprima, prossimamente disponibile' },
      { type: 'paragraph', text: 'La collezione HORO e attualmente in <strong>fase di anteprima</strong> e <strong>non e ancora ordinabile</strong>. Stiamo lavorando per perfezionare ogni dettaglio e offrirvi un prodotto di eccellenza. Presto sara disponibile per l acquisto su mobiliufficio.it.' },
      { type: 'paragraph', text: 'Restate connessi per scoprire tutte le novita sulla linea HORO. Inserisci la tua email nella newsletter per essere il primo a sapere quando la collezione sara disponibile!' },
      { type: 'quote', text: 'HORO rappresenta il futuro dell arredo direzionale: design, qualita e innovazione in un unica collezione.' },
    ],
    relatedProducts: [
      { name: 'Scarica il catalogo HORO preview', price: 'PDF gratuito', image:  './horo-preview-copertina.jpg', link: './HORO_2026_brochure.pdf' },
    ],
    tags: ['HORO', 'Direzionale', 'Anteprima', 'Novita 2026', 'Design'],
  },
  'linea-sedute-star-operativa': {
    slug: 'linea-sedute-star-operativa',
    title: 'Linea Sedute STAR operativa: un classico Selin, 12 anni di affidabilita',
    category: 'DESIGN',
    date: '22 Maggio 2026',
    readTime: '6 min',
    coverImage: './star-hero.png',
    excerpt: 'La STAR operativa di Selin e una linea storica dell arredo ufficio: robustezza, design attuale e prezzo competitivo da oltre 12 anni.',
    content: [
      { type: 'paragraph', text: 'Nel panorama delle sedute da ufficio, esistono prodotti che resistono al tempo senza mai invecchiare. La <strong>linea STAR operativa di Selin</strong> e uno di questi: in produzione da oltre 12 anni, rappresenta un punto fermo per chi cerca <strong>robustezza, design sempre attuale e un prezzo competitivo</strong>.' },
      { type: 'image', src: './star-1.png', alt: 'STAR operativa sedia impilabile', caption: 'La STAR operativa: sedia fissa impilabile con schienale perforato e seduta imbottita blu' },
      { type: 'heading', text: 'Sedia fissa impilabile: la base di tutto' },
      { type: 'paragraph', text: 'La versione base della STAR e una <strong>sedia fissa impilabile</strong> perfetta per sale riunioni, aule, conferenze e spazi polivalenti. Lo <strong>schienale perforato in polipropilene</strong> garantisce traspirabilita e comfort, mentre la <strong>struttura tubolare in acciaio verniciato</strong> offre una robustezza a prova di tempo. La capacita di impilabilita permette di ottimizzare gli spazi quando le sedie non sono in uso.' },
      { type: 'image', src: './star-2.png', alt: 'STAR operativa con braccioli', caption: 'Versione con braccioli per un comfort aggiunto nelle lunghe sedute' },
      { type: 'heading', text: 'Con braccioli: comfort evoluto' },
      { type: 'paragraph', text: 'La versione con <strong>braccioli fissi</strong> aggiunge un livello di comfort per chi trascorre molte ore seduto, offrendo un appoggio stabile per le braccia e riducendo lo stress su spalle e collo. Ideale per postazioni di lavoro fisse, sale d attesa e ambienti dove il comfort e prioritiario. Disponibile anche con <strong>tavoletta scrittoio integrata</strong> per aule formazione, corsi professionali e seminari.' },
      { type: 'image', src: './star-5.png', alt: 'STAR poltrona operativa girevole', caption: 'La poltrona operativa girevole STAR con schienale in rete traspirante' },
      { type: 'heading', text: 'La poltrona operativa girevole' },
      { type: 'paragraph', text: 'La STAR e disponibile anche come <strong>poltrona operativa girevole</strong> con <strong>schienale in rete traspirante</strong>. Il design della rete grigia offre un supporto ergonomico naturale, favorendo la circolazione dell aria e prevenendo l accumulo di calore nelle lunghe giornate di lavoro. La seduta imbottita, disponibile in vari colori, garantisce comfort e personalizzazione. Il meccanismo girevole e l alzata a gas completano le regolazioni ergonomiche.' },
      { type: 'image', src: './star-3.png', alt: 'STAR poltrona operativa retro', caption: 'Vista laterale: dettaglio dello schienale in rete e della struttura ergonomica' },
      { type: 'heading', text: '12 anni di storia, un futuro assicurato' },
      { type: 'paragraph', text: 'Il segreto del successo della STAR risiede nella sua capacita di <strong>evolversi mantenendo intatte le proprie qualita</strong>. Selin ha continuamente perfezionato i dettagli, migliorato i materiali e aggiornato le finiture, senza mai tradire la filosofia originale: offrire una sedia robusta, bella ed economica. Dopo 12 anni, la STAR continua a essere una delle linee piu richieste nell arredo ufficio italiano.' },
      { type: 'image', src: './star-4.png', alt: 'STAR poltrona con poggiatesta', caption: 'Versione con poggiatesta per il massimo supporto cervicale' },
      { type: 'heading', text: 'Versione con poggiatesta' },
      { type: 'paragraph', text: 'Per chi desidera il massimo del comfort, la poltrona STAR e disponibile anche con <strong>poggiatesta integrato</strong>. Il supporto cervicale aggiuntivo e ideale per chi trascorre molte ore al computer, riducendo la tensione sul collo e migliorando la postura complessiva. La combinazione di schienale in rete traspirante, seduta imbottita e poggiatesta rende questa versione la piu completa della gamma.' },
      { type: 'quote', text: 'La STAR operativa e la prova che quando un prodotto e ben progettato, il tempo gli da solo ragione.' },
      { type: 'heading', text: 'Perche scegliere la STAR operativa' },
      { type: 'paragraph', text: '<strong>Robustezza comprovata</strong> &mdash; Struttura in acciaio e materiali selezionati per resistere a un uso intensivo.<br/><strong>Design senza tempo</strong> &mdash; Linee pulite e proporzioni equilibrate che si adattano a qualsiasi ambiente.<br/><strong>Prezzo competitivo</strong> &mdash; Un rapporto qualita-prezzo imbattibile, frutto di una produzione efficiente e matura.<br/><strong>Versatilita</strong> &mdash; Sedia fissa, con braccioli, con tavoletta, poltrona girevole e con poggiatesta: una soluzione per ogni esigenza.<br/><strong>Produzione italiana Selin</strong> &mdash; Garanzia di qualita e affidabilita made in Italy.' },
    ],
    relatedProducts: [
      { name: 'STAR sedia fissa impilabile base', price: '36,60 €', image: './star-1.png', link: 'https://mobiliufficio.it/s45-sedia-interlocutore-star.html' },
      { name: 'STAR sedia con braccioli fissi', price: '51,24 €', image: './star-2.png', link: 'https://mobiliufficio.it/s46-sedia-star-con-braccioli.html' },
      { name: 'STAR poltrona operativa girevole', price: '165,92 €', image: './star-5.png', link: 'https://mobiliufficio.it/st51-poltrona-semi-direzionale-star-certificazione-catas-uni-en-1335.html' },
      { name: 'STAR poltrona con poggiatesta', price: '189,10 €', image: './star-4.png', link: 'https://mobiliufficio.it/st52-poltrona-star-operativa-con-poggiatesta.html' },
    ],
    tags: ['STAR', 'Selin', 'Sedia impilabile', 'Poltrona operativa', 'Storica', 'Ufficio'],
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
                Trova la tua poltrona da ufficio ideale
              </h3>
              <p
                className="font-body text-base mt-3"
                style={{ color: '#6B7280' }}
              >
                Scopri il catalogo completo di poltrone e sedie da ufficio su mobiliufficio.it
              </p>
              <a
                href="https://mobiliufficio.it/sedie-ufficio/poltrone-da-ufficio.html"
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
                Scopri le poltrone da ufficio &rarr;
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



              {/* Tags */}
              <div className="mt-8 pt-6" style={{ borderTop: '1px solid #E5E5E5' }}>
                <h4
                  className="font-heading font-semibold text-xs tracking-[0.08em] uppercase mb-3"
                  style={{ color: '#9CA3AF' }}
                >
                  TAGS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(article.tags || ['Ufficio', 'Design']).map((tag) => (
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
              { title: 'Postura corretta al lavoro', category: 'GUIDE', image:  './news-4.jpg', slug: 'postura-corretta-lavoro' },
              { title: 'Le tendenze arredo ufficio 2026', category: 'DESIGN', image:  './news-2.jpg', slug: 'tendenze-arredo-2026' },
              { title: 'Arredare uno spazio di coworking', category: 'GUIDE', image:  './featured-3.jpg', slug: 'arredare-coworking' },
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
