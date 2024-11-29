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

const StudentValSchema = z.object({
  id: z.string().min(1, { message: 'Student ID is required' }),
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
  isActive: z.enum(['active', 'inActive']).default('active'),
  Localguardian: LocalGuadianvalidationSchema,
  ProfileImage: z.string().min(1, { message: 'Profile image is required' }),
});

export default StudentValSchema;
