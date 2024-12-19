import express from 'express';
import { AuthValidation } from './Aurh.validation';
import validationReques from '../Middlewares/validateRequest';
import { LoginUserController } from './Auth.controller';
import auth from '../Middlewares/auth';
import { USER_ROLE } from '../Users/User.conts';



const router = express.Router();
// call the controller

router.post('/login', validationReques(AuthValidation.LoginValidationScheema),LoginUserController.createLoginUser);
router.post('/change-pass-route',auth(USER_ROLE.Admin,USER_ROLE.faculty,USER_ROLE.student), validationReques(AuthValidation.ChangePasswordValidationScheema),LoginUserController.ChangePassword)
export const AuthRouter = router;