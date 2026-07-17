import type { APIRoute } from 'astro';
import { leadSchema } from '../../lib/validation';
import { sendLeadNotification } from '../../lib/resend';

export const prerender = false;

function fireWebhook(payload: unknown): void {
  const url = import.meta.env.LEAD_WEBHOOK_URL;
  if (!url) return; // no-op si no está configurado — nunca bloquea ni falla la respuesta

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: controller.signal,
  })
    .catch(() => {
      /* fire-and-forget — el webhook nunca debe afectar la respuesta al usuario */
    })
    .finally(() => clearTimeout(timeout));
}

export const POST: APIRoute = async ({ request }) => {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return new Response(JSON.stringify({ success: false, errors: { _: 'Payload inválido.' } }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[String(issue.path[0])] = issue.message;
    }
    return new Response(JSON.stringify({ success: false, errors }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const lead = parsed.data;

  // Honeypot lleno → no delatar al bot, pero no enviar email ni webhook.
  if (lead.honeypot) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await sendLeadNotification(lead);
  } catch (err) {
    console.error('[api/lead] Resend falló:', err instanceof Error ? err.message : err);
    return new Response(JSON.stringify({ success: false }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  fireWebhook(lead);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
