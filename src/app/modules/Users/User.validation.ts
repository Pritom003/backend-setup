import { z } from 'zod';

// Zod schema for User validation
 const UserValidationSchema = z.object({
  password: z.string({invalid_type_error:'Password Must Be String'})
  .min(10, "Password must be at least 10 characters").optional(),  
});

// Type inferred from the Zod schema
export const UserValidation={
    UserValidationSchema
}
