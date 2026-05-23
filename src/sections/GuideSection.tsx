import { BookOpen, Lightbulb, ShieldCheck, Ruler } from 'lucide-react';

const guides = [
  {
    icon: BookOpen,
    title: 'Come scegliere una sedia ergonomica',
    desc: 'Guida completa per trovare la sedia ideale per il tuo fisico e le tue abitudini di lavoro.',
    tag: 'ERGONOMIA',
  },
  {
    icon: Lightbulb,
    title: 'Illuminazione ufficio: cosa sapere',
    desc: 'Luce naturale, lampade LED e posizionamento per ridurre l\'affaticamento visivo.',
    tag: 'DESIGN',
  },
  {
    icon: ShieldCheck,
    title: 'Postura corretta al lavoro',
    desc: 'Esercizi, consigli e prodotti per mantenere una postura sana durante la giornata.',
    tag: 'GUIDE',
  },
  {
    icon: Ruler,
    title: 'Arredare piccoli uffici',
    desc: 'Soluzioni salvaspazio e mobili multifunzione per ottimizzare ogni metro quadro.',
    tag: 'GUIDE',
  },
];

export default function GuideSection() {
  return (
    <section
      id="guide"
      className="relative"
      style={{
        zIndex: 2,
        backgroundColor: '#F9FAFB',
        padding: '3rem 4vw',
        borderTop: '1px solid #E5E5E5',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <span
          className="inline-block font-heading font-semibold text-xs tracking-[0.08em] uppercase mb-6"
          style={{ color: '#0099CC' }}
        >
          GUIDE
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((guide, i) => {
            const Icon = guide.icon;
            return (
              <a
                key={i}
                href="#"
                className="group flex gap-4 p-4 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0099CC';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,153,204,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E5E5';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(0,153,204,0.08)' }}
                >
                  <Icon size={22} style={{ color: '#0099CC' }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="font-heading font-semibold text-[10px] tracking-[0.08em] uppercase px-2 py-0.5 rounded"
                      style={{ backgroundColor: 'rgba(0,153,204,0.1)', color: '#0099CC' }}
                    >
                      {guide.tag}
                    </span>
                  </div>
                  <h3
                    className="font-heading font-medium text-base leading-snug transition-colors duration-300 group-hover:text-[#0099CC]"
                    style={{ color: '#000000' }}
                  >
                    {guide.title}
                  </h3>
                  <p className="font-body text-sm mt-1" style={{ color: '#6B7280' }}>
                    {guide.desc}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
