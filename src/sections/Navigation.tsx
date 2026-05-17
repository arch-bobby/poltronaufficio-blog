import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Menu, X, LogIn } from 'lucide-react';

const navLinks = [
  { label: 'BLOG', href: '#blog', active: true },
  { label: 'NOVIT\u00C0', href: '#novita' },
  { label: 'PRODOTTI', href: '#prodotti' },
  { label: 'GUIDE', href: '#guide' },
  { label: 'CHI SIAMO', href: '#chisiamo' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
        <a href="#" className="shrink-0 flex items-center">
          <img
            src="/logo.jpg"
            alt="Poltrona Ufficio"
            className="h-9 w-auto object-contain"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative font-heading font-medium text-sm tracking-[0.02em] transition-colors duration-300"
              style={{
                color: link.active ? '#0099CC' : '#000000',
              }}
              onMouseEnter={(e) => {
                if (!link.active) (e.target as HTMLElement).style.color = '#0099CC';
              }}
              onMouseLeave={(e) => {
                if (!link.active) (e.target as HTMLElement).style.color = '#000000';
              }}
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 h-[2px] w-full origin-left transition-transform duration-300 ease-out"
                style={{
                  backgroundColor: '#0099CC',
                  transform: link.active ? 'scaleX(1)' : 'scaleX(0)',
                }}
              />
            </a>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          <button
            className="text-black hover:text-[#0099CC] transition-colors duration-300"
            aria-label="Cerca"
          >
            <Search size={20} />
          </button>
          <Link
            to="/login"
            className="flex items-center gap-1 font-heading font-semibold text-xs tracking-[0.08em] uppercase px-5 py-2 rounded transition-all duration-300 hover:bg-[#007AA3]"
            style={{ backgroundColor: '#0099CC', color: '#FFFFFF' }}
          >
            <LogIn size={14} /> Accedi
          </Link>
          <a
            href="#newsletter"
            className="font-heading font-semibold text-xs tracking-[0.08em] uppercase px-5 py-2 border transition-all duration-300 hover:bg-[#0099CC] hover:text-white"
            style={{
              borderColor: '#0099CC',
              color: '#0099CC',
              borderRadius: '4px',
            }}
          >
            ISCRIVITI
          </a>
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
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-heading font-medium text-sm tracking-[0.02em] text-black hover:text-[#0099CC] transition-colors duration-300 py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/login"
            className="font-heading font-semibold text-sm text-center px-5 py-3 rounded transition-all duration-300 hover:bg-[#007AA3]"
            style={{ backgroundColor: '#0099CC', color: '#FFFFFF' }}
            onClick={() => setMobileOpen(false)}
          >
            Accedi
          </Link>
          <a
            href="#newsletter"
            className="font-heading font-semibold text-xs tracking-[0.08em] uppercase px-5 py-2 border text-center transition-all duration-300 hover:bg-[#0099CC] hover:text-white mt-2"
            style={{
              borderColor: '#0099CC',
              color: '#0099CC',
              borderRadius: '4px',
            }}
            onClick={() => setMobileOpen(false)}
          >
            ISCRIVITI
          </a>
        </div>
      )}
    </nav>
  );
}
