import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Search, Menu, X } from 'lucide-react';

interface NavLink {
  label: string;
  target: string;
  active?: boolean;
  isRoute?: boolean;
}

const navLinks: NavLink[] = [
  { label: 'BLOG', target: '/', active: true },
  { label: "NOVITA'", target: '/novita', isRoute: true },
  { label: 'PRODOTTI', target: '/prodotti', isRoute: true },
  { label: 'GUIDE', target: '/guide', isRoute: true },
  { label: 'DESIGN', target: '/design', isRoute: true },
  { label: 'CATALOGHI', target: '/libri', isRoute: true },
  { label: 'CHI SIAMO', target: 'chisiamo' },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  function handleNavClick(link: NavLink) {
    setMobileOpen(false);
    if (link.isRoute || link.target === '/') {
      // Route link - let Link handle it
      return;
    }
    // Internal section link
    if (isHome) {
      scrollToSection(link.target);
    } else {
      // Navigate to home with hash, then scroll
      navigate('/#' + link.target);
      setTimeout(() => scrollToSection(link.target), 300);
    }
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderColor: '#E5E5E5',
        height: '64px',
      }}
    >
      <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="shrink-0 flex items-center">
          <img
            src="./logo.jpg"
            alt="Poltrona Ufficio"
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.isRoute || link.target === '/' ? (
              <Link
                key={link.label}
                to={link.target}
                className="group relative font-heading font-medium text-sm tracking-[0.02em] transition-colors duration-300"
                style={{ color: link.active && isHome ? '#0099CC' : '#000000' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#0099CC'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = link.active && isHome ? '#0099CC' : '#000000'; }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] w-full origin-left transition-transform duration-300 ease-out"
                  style={{
                    backgroundColor: '#0099CC',
                    transform: (link.active && isHome) || (!isHome && location.pathname === link.target) ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="group relative font-heading font-medium text-sm tracking-[0.02em] transition-colors duration-300 cursor-pointer bg-transparent border-none"
                style={{ color: '#000000' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#0099CC'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#000000'; }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] w-full origin-left transition-transform duration-300 ease-out"
                  style={{ backgroundColor: '#0099CC', transform: 'scaleX(0)' }}
                />
              </button>
            )
          )}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className="text-black hover:text-[#0099CC] transition-colors duration-300"
            aria-label="Cerca"
          >
            <Search size={20} />
          </button>

          <Link
            to="/"
            onClick={(e) => {
              if (!isHome) return;
              e.preventDefault();
              scrollToSection('newsletter');
            }}
            className="font-heading font-bold text-xs tracking-[0.08em] uppercase px-5 py-2.5 rounded transition-all duration-300 hover:bg-[#007AA3]"
            style={{
              backgroundColor: '#0099CC',
              color: '#FFFFFF',
              borderRadius: '4px',
            }}
          >
            ISCRIVITI
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-black"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden absolute top-[64px] left-0 right-0 py-6 px-6 flex flex-col gap-4"
          style={{
            background: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid #E5E5E5',
          }}
        >
          {navLinks.map((link) =>
            link.isRoute || link.target === '/' ? (
              <Link
                key={link.label}
                to={link.target}
                className="font-heading font-medium text-sm tracking-[0.02em] text-black hover:text-[#0099CC] transition-colors duration-300 py-2 block"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="font-heading font-medium text-sm tracking-[0.02em] text-black hover:text-[#0099CC] transition-colors duration-300 py-2 text-left bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
            )
          )}

          <Link
            to="/"
            onClick={(e) => {
              setMobileOpen(false);
              if (!isHome) return;
              e.preventDefault();
              scrollToSection('newsletter');
            }}
            className="font-heading font-bold text-sm text-center px-5 py-3 rounded transition-all duration-300 hover:bg-[#007AA3]"
            style={{ backgroundColor: '#0099CC', color: '#FFFFFF' }}
          >
            ISCRIVITI
          </Link>
        </div>
      )}
    </nav>
  );
}
