import { useEffect, useRef, useState } from 'react';

interface Props {
  whatsappNumber?: string;
}

const BUBBLE_MESSAGE = '¿Se te quedó dando vueltas alguna duda? Escríbenos — respondemos nosotros, no un bot.';
const SHOW_AFTER_MS = 7000;
const AUTO_HIDE_MS = 14000;
const DISMISS_KEY = 'rt-wa-bubble-dismissed';

function markSeenThisSession() {
  try {
    sessionStorage.setItem(DISMISS_KEY, '1');
  } catch {
    /* si no se puede persistir, el peor caso es que el aviso automático se repita — no rompe nada */
  }
}

export default function WhatsAppFloatingButton({ whatsappNumber }: Props) {
  // El botón (el círculo con el ícono) SIEMPRE está visible y SIEMPRE lleva a
  // WhatsApp, sin importar nada de lo de abajo — eso es lo único que garantiza
  // que el usuario pueda escribir cuando quiera. La burbuja de texto es solo
  // un empujón inicial, no el único camino:
  // - Aparece sola una vez (auto) a los pocos segundos y se retrae si nadie
  //   la toca, para no quedar pegada en pantalla para siempre.
  // - Cerrarla (o que se autorretracte) solo apaga ese aviso automático por
  //   el resto de la sesión — no "esconde" nada más.
  // - En desktop, pasar el mouse por el botón la vuelve a mostrar bajo
  //   demanda, se haya cerrado antes o no — es la forma de "recuperarla" si
  //   el usuario sí quiere ver el mensaje de nuevo.
  const [autoVisible, setAutoVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visible = autoVisible || hovering;

  useEffect(() => {
    if (!whatsappNumber) return;

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      /* sessionStorage no disponible (modo privado estricto) — mostramos el aviso automático igual */
    }
    if (alreadySeen) return;

    const showTimer = setTimeout(() => {
      setAutoVisible(true);
      hideTimer.current = setTimeout(() => {
        setAutoVisible(false);
        markSeenThisSession();
      }, AUTO_HIDE_MS);
    }, SHOW_AFTER_MS);

    return () => {
      clearTimeout(showTimer);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [whatsappNumber]);

  if (!whatsappNumber) return null;

  const href = `https://wa.me/${whatsappNumber}`;

  function dismissBubble(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setAutoVisible(false);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    markSeenThisSession();
  }

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {visible && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          role="status"
          className="group relative max-w-[15.5rem] rounded-2xl rounded-br-sm border border-primary/10 bg-surface px-4 py-3 pr-8 shadow-[0_16px_36px_-12px_rgba(15,37,71,0.3)] transition-transform duration-200 ease-out animate-[rt-bubble-in_0.3s_ease-out] hover:-translate-y-0.5"
        >
          {/* La X solo apaga el aviso automático de esta sesión — pasar el mouse
              por el botón de abajo la vuelve a traer cuando el usuario quiera. */}
          <button
            type="button"
            onClick={dismissBubble}
            aria-label="Cerrar mensaje"
            className="absolute right-2 top-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-background hover:text-primary"
          >
            <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5" aria-hidden="true">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <p className="font-body text-[13px] leading-snug text-text/85">{BUBBLE_MESSAGE}</p>
          <span
            className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 border-b border-r border-primary/10 bg-surface"
            aria-hidden="true"
          />
        </a>
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary shadow-[0_12px_28px_-8px_rgba(28,25,23,0.45)] transition-transform duration-200 ease-out hover:scale-105"
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

      <style>{`
        @keyframes rt-bubble-in {
          from { opacity: 0; transform: translateY(6px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
