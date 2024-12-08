import { z } from 'zod';

// Zod schema for User validation
 const academicDepValidationSchema =z.object({body:z.object({
    name:z.string({
        required_error:"Academic Department is  required",
        invalid_type_error:'Academic Dep  must be a string'}),
    academicFaculty:z.string({
        required_error:"Faculty  is  required",
        invalid_type_error:'Academic Faculty must be a string'
    })
 })
 
});
 const updateacademicDepValidationSchema =z.object({body:z.object({
    name:z.string({
        required_error:"Academic Department is  required",
        invalid_type_error:'Academic Dep  must be a string'}).optional(),
    academicFaculty:z.string({
        required_error:"Faculty  is  required",
        invalid_type_error:'Academic Faculty must be a string'
    }).optional()
 })
 
});

// Type inferred from the Zod schema
export const AcademicDepValidation={
    academicDepValidationSchema,
    updateacademicDepValidationSchema
}
