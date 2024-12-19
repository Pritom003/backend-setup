import { z } from 'zod';

const LoginValidationScheema= z.object({
    body:z.object({
        id: z.string({required_error:'Id is required'}),
        password: z.string({required_error:'Password is required'})
    })
})
const ChangePasswordValidationScheema= z.object({
    body:z.object({
    oldPassword: z.string({required_error:'Old Password is required'}),
        newpassword: z.string({required_error:'Password is required'})
    })
})
const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
        required_error: 'Refresh token is required!',
      }),
    }),
  });
export const AuthValidation={
    LoginValidationScheema,ChangePasswordValidationScheema,refreshTokenValidationSchema
} 