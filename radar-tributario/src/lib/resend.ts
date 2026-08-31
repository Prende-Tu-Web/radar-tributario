import { Resend } from 'resend';
import type { LeadPayload } from './validation';

// El dominio del remitente debe estar verificado en la cuenta de Resend —
// ver instructivo.md. Mientras no lo esté, Resend rechaza el envío.
const FROM_ADDRESS = 'Radar Tributario <leads@radartributario.cl>';

function buildEmailHtml(lead: LeadPayload): string {
  const rows: [string, string][] = [
    ['Nombre', lead.name],
    ['Email', lead.email],
    ['Teléfono', lead.phone],
    ['RUT', lead.rut || '—'],
    ['Tipo', lead.contributorType === 'empresa' ? 'Empresa' : 'Persona natural'],
    ['Empresa', lead.companyName || '—'],
    ['Servicio', lead.service],
    ['Pilar', lead.pillar || '—'],
    ['Combo', lead.combo || '—'],
    ['N° trabajadores', lead.headcount ? String(lead.headcount) : '—'],
  ];

  const rowsHtml = rows
    .map(([label, value]) => `<tr><td style="padding:6px 12px;color:#64748b;">${label}</td><td style="padding:6px 12px;font-weight:600;">${value}</td></tr>`)
    .join('');

  return `
    <div style="font-family: sans-serif; max-width: 560px;">
      <h2 style="color:#0f2547;">Nuevo lead — Radar Tributario</h2>
      <table style="border-collapse: collapse; width: 100%;">${rowsHtml}</table>
      <p style="margin-top: 16px; color:#0f2547;"><strong>Mensaje:</strong></p>
      <p style="white-space: pre-wrap;">${lead.message}</p>
    </div>
  `;
}

export async function sendLeadNotification(lead: LeadPayload): Promise<void> {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const notificationEmail = import.meta.env.LEAD_NOTIFICATION_EMAIL;

  if (!apiKey || !notificationEmail) {
    throw new Error('RESEND_API_KEY o LEAD_NOTIFICATION_EMAIL no configurados — ver instructivo.md.');
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: notificationEmail,
    subject: `Nuevo lead — ${lead.service}`,
    html: buildEmailHtml(lead),
  });

  if (error) {
    throw new Error(`Resend rechazó el envío: ${error.message}`);
  }
}
