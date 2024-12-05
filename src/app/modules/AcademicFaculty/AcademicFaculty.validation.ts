import { z } from 'zod';

// Zod schema for User validation
 const academicFacultyValidationSchema =z.object({body:z.object({
    name:z.string({invalid_type_error:'Academic faculty  must be a string'})
 })
 
});
 const updateacademicFacultyValidationSchema = z.object({body:z.object({
    name:z.string({invalid_type_error:'Academic faculty  must be a string'})
 })
 
});

// Type inferred from the Zod schema
export const AcademicFacultyValidation={
    academicFacultyValidationSchema,
    updateacademicFacultyValidationSchema
}
