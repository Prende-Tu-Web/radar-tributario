import { useState, type SubmitEvent } from 'react';
import { getPillarLabel } from '../../lib/pillars';
import type { Pillar } from '../../lib/sanity/types';

interface ServiceOption {
  slug: string;
  title: string;
  pillar: Pillar;
}

interface Props {
  service?: string;
  pillar?: string;
  combo?: string;
  headcount?: number;
  /** Muestra el input de N° de trabajadores (solo combo rrhh-mensual) — nunca calcula ni muestra precio, solo precarga el lead. */
  showHeadcount?: boolean;
  /** Si viene, muestra un select de servicio (precargado en `service`) en vez de enviarlo en silencio. */
  services?: ServiceOption[];
}

type ContributorType = 'natural' | 'empresa';
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  message?: string;
}

function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function LeadForm({ service = 'general', pillar, combo, headcount, showHeadcount = false, services }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rut, setRut] = useState('');
  const [selectedService, setSelectedService] = useState(service);
  const [contributorType, setContributorType] = useState<ContributorType>('natural');
  const [companyName, setCompanyName] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [headcountInput, setHeadcountInput] = useState(headcount ? String(headcount) : '');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  function validateField(field: keyof FieldErrors) {
    setErrors((prev) => {
      const next = { ...prev };
      if (field === 'name') next.name = name.trim().length < 2 ? 'Ingresa tu nombre.' : undefined;
      if (field === 'email') next.email = !validateEmail(email) ? 'Ingresa un correo válido.' : undefined;
      if (field === 'phone') next.phone = phone.trim().length < 8 ? 'Ingresa un teléfono de contacto.' : undefined;
      if (field === 'companyName')
        next.companyName = contributorType === 'empresa' && companyName.trim().length < 2 ? 'Ingresa el nombre de la empresa.' : undefined;
      if (field === 'message') next.message = message.trim().length < 10 ? 'Cuéntanos un poco más (mínimo 10 caracteres).' : undefined;
      return next;
    });
  }

  function isFormValid(): boolean {
    return (
      name.trim().length >= 2 &&
      validateEmail(email) &&
      phone.trim().length >= 8 &&
      (contributorType !== 'empresa' || companyName.trim().length >= 2) &&
      message.trim().length >= 10 &&
      (!showHeadcount || Number(headcountInput) > 0)
    );
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    validateField('name');
    validateField('email');
    validateField('phone');
    validateField('companyName');
    validateField('message');

    if (!isFormValid()) return;

    setStatus('submitting');

    try {
      const res = await fetch('/api/lead/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          rut: rut || undefined,
          contributorType,
          companyName: contributorType === 'empresa' ? companyName : undefined,
          service: selectedService,
          pillar: services ? services.find((s) => s.slug === selectedService)?.pillar ?? pillar : pillar,
          combo,
          headcount: showHeadcount ? Number(headcountInput) || undefined : headcount,
          message,
          honeypot,
        }),
      });

      if (!res.ok) throw new Error(`Request failed with ${res.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-xl border border-primary/10 bg-surface p-8 text-center">
        <p className="font-heading text-xl text-primary">Recibimos tu mensaje.</p>
        <p className="mt-2 font-body text-[14px] text-muted">
          Te vamos a escribir en las próximas horas hábiles. Si es urgente, escríbenos por WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — invisible para personas, visible para bots */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">No completar este campo</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {showHeadcount && (
        <div>
          <label htmlFor="lead-headcount" className="block font-body text-[13px] font-medium text-primary">
            N° de trabajadores <span className="text-destructive">*</span>
          </label>
          <input
            id="lead-headcount"
            type="number"
            min={1}
            required
            value={headcountInput}
            onChange={(e) => setHeadcountInput(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-primary/20 bg-background px-3.5 py-2.5 font-body text-[14px] text-text outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <p className="mt-1.5 font-body text-[12px] text-muted">
            Solo para armar tu cotización — no mostramos precio aquí, te lo confirmamos directo.
          </p>
        </div>
      )}

      {services && services.length > 0 && (
        <div>
          <label htmlFor="lead-service" className="block font-body text-[13px] font-medium text-primary">
            Servicio
          </label>
          <select
            id="lead-service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="mt-1.5 w-full cursor-pointer rounded-md border border-primary/20 bg-background px-3.5 py-2.5 font-body text-[14px] text-text outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            {(['tributario', 'contable', 'rrhh'] as Pillar[]).map((p) => {
              const options = services.filter((s) => s.pillar === p);
              if (options.length === 0) return null;
              return (
                <optgroup key={p} label={getPillarLabel(p)}>
                  {options.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="block font-body text-[13px] font-medium text-primary">
            Nombre <span className="text-destructive">*</span>
          </label>
          <input
            id="lead-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => validateField('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'lead-name-error' : undefined}
            className="mt-1.5 w-full rounded-md border border-primary/20 bg-background px-3.5 py-2.5 font-body text-[14px] text-text outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {errors.name && (
            <p id="lead-name-error" className="mt-1 font-body text-[12.5px] text-red-700">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lead-email" className="block font-body text-[13px] font-medium text-primary">
            Correo <span className="text-destructive">*</span>
          </label>
          <input
            id="lead-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => validateField('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'lead-email-error' : undefined}
            className="mt-1.5 w-full rounded-md border border-primary/20 bg-background px-3.5 py-2.5 font-body text-[14px] text-text outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {errors.email && (
            <p id="lead-email-error" className="mt-1 font-body text-[12.5px] text-red-700">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-phone" className="block font-body text-[13px] font-medium text-primary">
            Teléfono <span className="text-destructive">*</span>
          </label>
          <input
            id="lead-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => validateField('phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'lead-phone-error' : undefined}
            className="mt-1.5 w-full rounded-md border border-primary/20 bg-background px-3.5 py-2.5 font-body text-[14px] text-text outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {errors.phone && (
            <p id="lead-phone-error" className="mt-1 font-body text-[12.5px] text-red-700">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lead-rut" className="block font-body text-[13px] font-medium text-primary">
            RUT <span className="font-normal text-muted">(opcional)</span>
          </label>
          <input
            id="lead-rut"
            type="text"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-primary/20 bg-background px-3.5 py-2.5 font-body text-[14px] text-text outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <fieldset>
        <legend className="font-body text-[13px] font-medium text-primary">Eres...</legend>
        <div className="mt-2 flex gap-5">
          <label className="flex items-center gap-2 font-body text-[14px] text-text">
            <input
              type="radio"
              name="contributorType"
              value="natural"
              checked={contributorType === 'natural'}
              onChange={() => setContributorType('natural')}
              className="h-4 w-4 accent-accent"
            />
            Persona natural
          </label>
          <label className="flex items-center gap-2 font-body text-[14px] text-text">
            <input
              type="radio"
              name="contributorType"
              value="empresa"
              checked={contributorType === 'empresa'}
              onChange={() => setContributorType('empresa')}
              className="h-4 w-4 accent-accent"
            />
            Empresa
          </label>
        </div>
      </fieldset>

      {contributorType === 'empresa' && (
        <div>
          <label htmlFor="lead-company-name" className="block font-body text-[13px] font-medium text-primary">
            Nombre de la empresa <span className="text-destructive">*</span>
          </label>
          <input
            id="lead-company-name"
            type="text"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            onBlur={() => validateField('companyName')}
            aria-invalid={Boolean(errors.companyName)}
            aria-describedby={errors.companyName ? 'lead-company-name-error' : undefined}
            className="mt-1.5 w-full rounded-md border border-primary/20 bg-background px-3.5 py-2.5 font-body text-[14px] text-text outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {errors.companyName && (
            <p id="lead-company-name-error" className="mt-1 font-body text-[12.5px] text-red-700">
              {errors.companyName}
            </p>
          )}
        </div>
      )}

      <div>
        <label htmlFor="lead-message" className="block font-body text-[13px] font-medium text-primary">
          Cuéntanos qué necesitas <span className="text-destructive">*</span>
        </label>
        <textarea
          id="lead-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onBlur={() => validateField('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'lead-message-error' : undefined}
          className="mt-1.5 w-full rounded-md border border-primary/20 bg-background px-3.5 py-2.5 font-body text-[14px] text-text outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
        {errors.message && (
          <p id="lead-message-error" className="mt-1 font-body text-[12.5px] text-red-700">
            {errors.message}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p role="alert" className="font-body text-[13px] text-red-700">
          No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos directo por WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full cursor-pointer rounded-md bg-primary px-6 py-3 font-body text-[14px] font-medium text-background shadow-sm transition-colors hover:bg-accent hover:text-on-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Enviando...' : 'Enviar mensaje'}
      </button>
    </form>
  );
}
