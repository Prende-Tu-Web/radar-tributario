import { z } from 'zod';

export const leadSchema = z
  .object({
    name: z.string().trim().min(2, 'Ingresa tu nombre.'),
    email: z.email('Ingresa un correo válido.').trim(),
    phone: z.string().trim().min(8, 'Ingresa un teléfono de contacto.'),
    rut: z.string().trim().optional(),
    contributorType: z.enum(['natural', 'empresa']),
    companyName: z.string().trim().optional(),
    service: z.string().trim().min(1),
    pillar: z.string().trim().optional(),
    combo: z.string().trim().optional(),
    headcount: z.number().positive().optional(),
    message: z.string().trim().min(10, 'Cuéntanos un poco más (mínimo 10 caracteres).'),
    honeypot: z.string().max(0).optional().or(z.literal('')),
  })
  .refine((data) => data.contributorType !== 'empresa' || (data.companyName && data.companyName.trim().length >= 2), {
    message: 'Ingresa el nombre de la empresa.',
    path: ['companyName'],
  });

export type LeadPayload = z.infer<typeof leadSchema>;
