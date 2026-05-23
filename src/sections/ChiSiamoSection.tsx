import { Award, Users, Calendar, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Calendar, value: '2014', label: 'Anno di fondazione' },
  { icon: Users, value: '50K+', label: 'Clienti soddisfatti' },
  { icon: Award, value: '500+', label: 'Articoli pubblicati' },
  { icon: TrendingUp, value: '12', label: 'Anni di esperienza' },
];

export default function ChiSiamoSection() {
  return (
    <section
      id="chisiamo"
      className="relative"
      style={{
        zIndex: 2,
        backgroundColor: '#FFFFFF',
        padding: '3rem 4vw',
        borderTop: '1px solid #E5E5E5',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <span
          className="inline-block font-heading font-semibold text-xs tracking-[0.08em] uppercase mb-6"
          style={{ color: '#0099CC' }}
        >
          CHI SIAMO
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left - Text */}
          <div>
            <h2
              className="font-heading font-semibold text-2xl md:text-3xl leading-tight mb-4"
              style={{ color: '#000000' }}
            >
              Il blog italiano dedicato all&apos;arredo per ufficio
            </h2>
            <p className="font-body text-base leading-relaxed mb-4" style={{ color: 'rgba(0,0,0,0.65)' }}>
              Poltrona Ufficio nasce nel 2014 con l&apos;obiettivo di aiutare professionisti e aziende
              a creare spazi di lavoro confortevoli, ergonomici e produttivi.
            </p>
            <p className="font-body text-base leading-relaxed mb-4" style={{ color: 'rgba(0,0,0,0.65)' }}>
              Ogni settimana pubblichiamo guide approfondite, recensioni oneste e consigli pratici
              su sedie ergonomiche, scrivanie, illuminazione e accessori per l&apos;ufficio.
            </p>
            <p className="font-body text-base leading-relaxed" style={{ color: 'rgba(0,0,0,0.65)' }}>
              Siamo il blog ufficiale di{' '}
              <a
                href="https://mobiliufficio.it"
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading font-medium transition-colors duration-300 hover:underline"
                style={{ color: '#008000' }}
              >
                mobiliufficio.it
              </a>
              , il tuo punto di riferimento per l&apos;arredamento professionale in Italia.
            </p>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-lg text-center"
                  style={{
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #E5E5E5',
                  }}
                >
                  <Icon size={24} className="mx-auto mb-2" style={{ color: '#0099CC' }} />
                  <div
                    className="font-heading font-bold text-2xl"
                    style={{ color: '#000000' }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="font-heading text-xs mt-1"
                    style={{ color: '#6B7280' }}
                  >
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
