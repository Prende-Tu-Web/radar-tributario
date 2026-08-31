import { useEffect, useState } from 'react';

type Consent = 'accepted' | 'rejected';
const STORAGE_KEY = 'rt-cookie-consent';

interface Props {
  hasGtm?: boolean;
}

export default function CookieConsent({ hasGtm = false }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* localStorage no disponible (modo privado estricto) — no bloquear el sitio por esto */
    }
    if (!stored) setVisible(true);

    function reopen() {
      setVisible(true);
    }
    window.addEventListener('rt-open-cookie-preferences', reopen);
    return () => window.removeEventListener('rt-open-cookie-preferences', reopen);
  }, []);

  function choose(consent: Consent) {
    try {
      localStorage.setItem(STORAGE_KEY, consent);
    } catch {
      /* si no se puede persistir, igual respetamos la elección en esta sesión */
    }
    setVisible(false);
    if (consent === 'accepted') {
      const w = window as typeof window & { __rtLoadGTM?: () => void };
      w.__rtLoadGTM?.();
    }
  }

  if (!visible) return null;

  return (
    <div role="dialog" aria-modal="false" aria-label="Preferencias de cookies" className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-xl border border-primary/10 bg-surface p-5 shadow-[0_-10px_40px_-10px_rgba(15,37,71,0.25)] sm:flex-row sm:items-center sm:p-6">
        <p className="font-body text-[13.5px] leading-relaxed text-text/80">
          Usamos cookies necesarias para que el sitio funcione{hasGtm ? ' y, si las aceptas, cookies analíticas para entender cómo se usa el sitio' : ''}.
          Puedes cambiar tu elección cuando quieras desde{' '}
          <a href="/politica-de-cookies/" className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:text-secondary hover:decoration-accent">
            Política de Cookies
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose('rejected')}
            className="cursor-pointer rounded-md border border-primary/20 px-4 py-2.5 font-body text-[13px] font-medium text-primary transition-colors hover:bg-background"
          >
            Rechazar no esenciales
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="cursor-pointer rounded-md bg-primary px-4 py-2.5 font-body text-[13px] font-medium text-background shadow-sm transition-colors hover:bg-accent hover:text-on-accent"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
