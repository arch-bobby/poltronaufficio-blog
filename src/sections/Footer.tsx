import { Instagram, Facebook, Linkedin } from 'lucide-react';

const categories = [
  'Sedie Ergonomiche',
  'Scrivanie',
  'Accessori',
  'Illuminazione',
  'Mobili per Riunioni',
];

const guides = [
  'Come scegliere una sedia',
  'Postura corretta',
  'Arredare piccoli uffici',
  'Cura dei materiali',
];

const links = [
  'Chi Siamo',
  'Contatti',
  'Privacy Policy',
  'Termini di Servizio',
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#F9FAFB',
        borderTop: '1px solid #E5E5E5',
        position: 'relative',
        zIndex: 2,
        padding: '4rem 4vw 2rem',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <a href="#" className="inline-block">
              <img
                src="./logo-footer.jpg"
                alt="Poltrona Ufficio e Mobili Ufficio"
                className="h-16 w-auto object-contain"
              />
            </a>
            <p className="font-body text-sm mt-3" style={{ color: '#6B7280' }}>
              Blog di arredamento per ufficio dal 2014
            </p>
            <div className="flex items-center gap-4 mt-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-[#0099CC]"
                style={{ color: '#9CA3AF' }}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-[#0099CC]"
                style={{ color: '#9CA3AF' }}
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-[#0099CC]"
                style={{ color: '#9CA3AF' }}
                aria-label="Pinterest"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2.2-1.8 4-4 4"/>
                  <path d="M12 16l-2 6"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-[#0099CC]"
                style={{ color: '#9CA3AF' }}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4
              className="font-heading font-semibold text-xs tracking-[0.08em] uppercase mb-4"
              style={{ color: '#0099CC' }}
            >
              CATEGORIE
            </h4>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat}>
                  <a
                    href="#"
                    className="font-body text-sm transition-colors duration-300 hover:text-[#0099CC]"
                    style={{ color: '#6B7280' }}
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h4
              className="font-heading font-semibold text-xs tracking-[0.08em] uppercase mb-4"
              style={{ color: '#0099CC' }}
            >
              GUIDE
            </h4>
            <ul className="space-y-2.5">
              {guides.map((guide) => (
                <li key={guide}>
                  <a
                    href="#"
                    className="font-body text-sm transition-colors duration-300 hover:text-[#0099CC]"
                    style={{ color: '#6B7280' }}
                  >
                    {guide}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4
              className="font-heading font-semibold text-xs tracking-[0.08em] uppercase mb-4"
              style={{ color: '#0099CC' }}
            >
              LINK UTILI
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-body text-sm transition-colors duration-300 hover:text-[#0099CC]"
                    style={{ color: '#6B7280' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://mobiliufficio.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm transition-colors duration-300 hover:text-[#008000]"
                  style={{ color: '#008000' }}
                >
                  mobiliufficio.it &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8"
          style={{ borderTop: '1px solid #E5E5E5' }}
        >
          <p
            className="font-heading font-semibold text-xs tracking-[0.08em] uppercase"
            style={{ color: '#9CA3AF' }}
          >
            &copy; 2026 Poltrona Ufficio. Tutti i diritti riservati.
          </p>
          <p
            className="font-heading font-semibold text-xs tracking-[0.08em] uppercase"
            style={{ color: '#9CA3AF' }}
          >
            Un progetto di{' '}
            <a
              href="https://mobiliufficio.it"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-[#007AA3]"
              style={{ color: '#0099CC' }}
            >
              mobiliufficio.it
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
