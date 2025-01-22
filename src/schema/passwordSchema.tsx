import { z } from 'zod';

const lower = new RegExp('(?=.*[a-z])');
const upper = new RegExp('(?=.*[A-Z])');
const number = new RegExp('(?=.*[0-9])');
const special = new RegExp('(?=.*[!@#$%^&*)+-])');

const passwordSchema = z
  .string({ required_error: 'Your password does not fulfill the complexity.' })
  .refine(data => lower.test(data), {
    path: ['lower'],
  })
  .refine(data => upper.test(data), {
    path: ['upper'],
  })
  .refine(data => number.test(data), {
    path: ['number'],
  })
  .refine(data => special.test(data), {
    path: ['special'],
  })
  .refine(data => data.length >= 8 && data.length <= 20, {
    path: ['length'],
  });

export const createPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string({}),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
  });
