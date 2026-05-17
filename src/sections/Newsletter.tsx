import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(panelRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="newsletter"
      className="relative py-20 px-4"
      style={{ zIndex: 1 }}
    >
      <div
        ref={panelRef}
        className="max-w-[700px] mx-auto px-8 py-12 md:px-12 md:py-16 text-center rounded-xl"
        style={{
          backgroundColor: 'rgba(255,255,255,0.92)',
          border: '1px solid #E5E5E5',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        <span
          className="inline-block font-heading font-semibold text-xs tracking-[0.08em] uppercase mb-4"
          style={{ color: '#0099CC' }}
        >
          NEWSLETTER
        </span>

        <h2
          className="font-heading font-semibold text-3xl md:text-4xl leading-tight"
          style={{ color: '#000000' }}
        >
          Rimani aggiornato sul mondo dell&apos;arredo ufficio
        </h2>

        <p
          className="font-body text-base leading-relaxed mt-4"
          style={{ color: 'rgba(0,0,0,0.6)' }}
        >
          Ricevi ogni settimana guide, recensioni e offerte esclusive sulle migliori
          sedie e scrivanie per il tuo workspace.
        </p>

        {submitted ? (
          <div
            className="mt-8 py-4 px-6 rounded-lg"
            style={{
              backgroundColor: 'rgba(0,128,0,0.08)',
              border: '1px solid rgba(0,128,0,0.25)',
            }}
          >
            <p className="font-heading font-medium text-sm" style={{ color: '#008000' }}>
              Grazie per l&apos;iscrizione! Controlla la tua email per confermare.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="La tua email"
                required
                className="flex-1 w-full bg-transparent border-b py-3 px-1 font-body text-base outline-none transition-colors duration-300 focus:border-[#0099CC]"
                style={{
                  borderColor: '#D1D5DB',
                  color: '#000000',
                }}
              />
              <button
                type="submit"
                className="w-full sm:w-auto font-heading font-semibold text-xs tracking-[0.08em] uppercase px-7 py-3 transition-all duration-300 hover:bg-[#007AA3] shrink-0"
                style={{
                  backgroundColor: '#0099CC',
                  color: '#FFFFFF',
                  borderRadius: '4px',
                }}
              >
                ISCRIVITI
              </button>
            </div>
          </form>
        )}

        <p
          className="font-heading font-semibold text-[10px] tracking-[0.08em] uppercase mt-6"
          style={{ color: '#9CA3AF' }}
        >
          Iscrivendoti accetti la nostra privacy policy.
        </p>
      </div>
    </section>
  );
}
