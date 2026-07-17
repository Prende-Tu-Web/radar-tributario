interface Props {
  whatsappNumber?: string;
}

export default function WhatsAppFloatingButton({ whatsappNumber }: Props) {
  if (!whatsappNumber) return null;

  const href = `https://wa.me/${whatsappNumber}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary shadow-[0_12px_28px_-8px_rgba(28,25,23,0.45)] transition-transform duration-200 ease-out hover:scale-105 sm:bottom-6 sm:right-6"
    >
      {/* Primary invierte tono entre light/dark mode (ver globals.css); el ícono usa
          --color-background como color de contraste porque ese token es, por diseño,
          siempre el tono opuesto a --color-primary en ambos modos. */}
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path
          d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.35A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 0 1 0 16.4 8.1 8.1 0 0 1-4.15-1.14l-.3-.17-2.96.8.8-2.88-.19-.3A8.2 8.2 0 0 1 12 3.8Z"
          style={{ fill: 'var(--color-background)' }}
        />
        <path
          d="M9.1 7.4c-.2-.45-.4-.46-.6-.47h-.5c-.18 0-.46.07-.7.34-.24.27-.9.9-.9 2.18s.93 2.53 1.06 2.7c.13.18 1.8 2.87 4.44 3.9 2.2.86 2.65.68 3.13.64.48-.05 1.53-.62 1.75-1.23.22-.6.22-1.11.15-1.22-.06-.1-.24-.16-.5-.29-.26-.13-1.53-.75-1.77-.84-.24-.09-.4-.13-.58.14-.17.26-.66.83-.81 1-.15.17-.3.19-.55.06-.26-.13-1.09-.4-2.08-1.28-.77-.68-1.28-1.53-1.44-1.79-.15-.26-.02-.4.11-.53.12-.12.26-.3.4-.46.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.57-1.45-.8-1.98Z"
          style={{ fill: 'var(--color-primary)' }}
        />
      </svg>
    </a>
  );
}
