import express from 'express';
import { userController } from './User.controllers';


import { StudentValidation } from '../students/student.validation';
import validationReques from '../Middlewares/validateRequest';
// import StudentValidation  from '../students/student.validation';
const router = express.Router();


// call the controller
router.post('/create-students',validationReques(StudentValidation. CreateStudentValSchema), userController.createStudent);

export const userRoutes = router;
