import { z } from 'zod';
import { AcademicSemCode, AcademicSemName, Months } from './AcademicSem.const';

// Zod schema for User validation
const createAcdemicSemValidationSchema = z.object({
    body: z.object({
      name: z.enum([...AcademicSemName] as [string, ...string[]]),
      year: z.string(),
      code: z.enum([...AcademicSemCode] as [string, ...string[]]),
      startMonth: z.enum([...Months] as [string, ...string[]]),
      endMonth: z.enum([...Months] as [string, ...string[]]),
    }),
  });
  const updateAcademicSemValidationSchema = z.object({
    body: z.object({
      name: z.enum([...AcademicSemName] as [string, ...string[]]).optional(),
      year: z.string().optional(),
      code: z.enum([...AcademicSemCode] as [string, ...string[]]).optional(),
      startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
      endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    }),
  });
// Type inferred from the Zod schema
export const AcademicSemValidationSchema={
    createAcdemicSemValidationSchema,
    updateAcademicSemValidationSchema
}
