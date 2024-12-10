import { z } from 'zod';

const FacultyNameSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }),
  middleName: z.string().optional(),
  lastName: z.string({ required_error: 'Last name is required' }),
});

const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .max(10, { message: 'Password must be 10 characters or less' }),
    faculty: z.object({
    
      name: FacultyNameSchema,
      designation: z
        .string({ required_error: 'Designation is required' })
        .min(1, 'Designation cannot be empty'),
      gender: z.enum(['male', 'female', 'others'], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z
        .string({ required_error: 'Date of birth is required' })
        .min(1, 'Date of birth cannot be empty'),
      email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format'),
      contactNo: z
        .string({ required_error: 'Contact number is required' })
        .min(1, 'Contact number cannot be empty'),
      emergencyContactNo: z
        .string({ required_error: 'Emergency contact number is required' })
        .min(1, 'Emergency contact number cannot be empty'),
      presentAddress: z
        .string({ required_error: 'Present address is required' })
        .min(1, 'Present address cannot be empty'),
      permanentAddress: z
        .string({ required_error: 'Permanent address is required' })
        .min(1, 'Permanent address cannot be empty'),
      academicFaculty: z
        .string({ required_error: 'Academic faculty ID is required' })
        .min(1, 'Academic faculty ID cannot be empty'),
      academicDepartment: z.string(),
      profileImage: z
        .string({ required_error: 'Profile image URL is required' })
        .min(1, 'Profile image URL cannot be empty'),
      isDeleted: z.boolean()
    }),
  }),
});

export const FacultyValidation = {
  createFacultyValidationSchema,
};
