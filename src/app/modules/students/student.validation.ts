import { z } from 'zod';

const NameValSchema = z.object({
  firstname: z.string().min(1, { message: 'First name is required' }),
  middleName: z.string().min(1, { message: 'Middle name is required' }),  
  lastName: z.string().min(1, { message: 'Last name is required' }),
});

const GuadianValidationSchema = z.object({
  fatherName: z.string()
    .min(1, { message: 'Father\'s name is required' })
    .max(20, { message: 'Father\'s name should be less than 20 characters' })
    .refine((value) => value.charAt(0).toUpperCase() + value.slice(1) === value, {
      message: '{VALUE} is not in capitalized format',
    }),
  motherName: z.string().min(1, { message: 'Mother\'s name is required' }),
  fathercontact: z.string().min(1, { message: 'Father\'s contact number is required' }),
  fatheroccupation: z.string().min(1, { message: 'Father\'s occupation is required' }),
});

const LocalGuadianvalidationSchema = z.object({
  Name: z.string().min(1, { message: 'Local guardian\'s name is required' }),
  contact: z.string().min(1, { message: 'Local guardian\'s contact number is required' }),
  Occupation: z.string().min(1, { message: 'Local guardian\'s occupation is required' }),
  address: z.string().min(1, { message: 'Local guardian\'s address is required' }),
});

const CreateStudentValSchema = z.object({
  body: z.object({
    password: z.string().max(10, { message: 'Password must be 10 characters or less' }),
    student: z.object({
      name: NameValSchema,
      gender: z.enum(['male', 'female', 'others']),
      DateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
      email: z.string()
        .email({ message: '{VALUE} is not a valid email' })
        .min(1, { message: 'Email address is required' }),
      contactNo: z.string().min(1, { message: 'Contact number is required' }),
      presendAddress: z.string().min(1, { message: 'Present address is required' }),
      guardian: GuadianValidationSchema,
      BloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        errorMap: () => ({ message: '{VALUE} is not a valid blood group' }),
      }),
      admissionSemister: z.string(),
      academicDepartment: z.string(),
      Localguardian: LocalGuadianvalidationSchema,
      ProfileImage: z.string().min(1, { message: 'Profile image is required' }),
    }),
  }),
});

// ✅ UpdateStudentValSchema (uses partial for optional updates)
const UpdateStudentValSchema = z.object({
  body: z.object({
    password: z.string().max(10, { message: 'Password must be 10 characters or less' }).optional(),
    student: z.object({
      name: NameValSchema.partial(), // Makes all fields of name optional
      gender: z.enum(['male', 'female', 'others']).optional(),
      DateOfBirth: z.string().optional(),
      email: z.string().email({ message: '{VALUE} is not a valid email' }).optional(),
      contactNo: z.string().optional(),
      presendAddress: z.string().optional(),
      guardian: GuadianValidationSchema.partial(), // Makes guardian fields optional
      BloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
      admissionSemister: z.string().optional(),
      academicDepartment: z.string().optional(),
      Localguardian: LocalGuadianvalidationSchema.partial(), // Makes local guardian fields optional
      ProfileImage: z.string().optional(),
    }).partial(), // Entire student object is optional
  }),
});

export const StudentValidation = {
  CreateStudentValSchema,
  UpdateStudentValSchema
};
