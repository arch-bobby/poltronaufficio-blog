export default function WhatsAppButton() {
  const phoneNumber = '3939887094';
  const message = 'Ciao! Vorrei avere maggiori informazioni sui vostri prodotti.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
      style={{
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <img
        src="./whatsapp-button.png"
        alt="Scrivici su WhatsApp 393 988 7094"
        className="h-[68px] w-auto"
        style={{
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        }}
      />
    </a>
  );
}
