import express from 'express';
import { userController } from './User.controllers';

import { StudentValidation } from '../students/student.validation';
import validationReques from '../Middlewares/validateRequest';
import { FacultyValidation } from '../Faculty/Faculty.validation';
// import StudentValidation  from '../students/student.validation';
const router = express.Router();

// call the controller
router.post(
  '/create-students',
  validationReques(StudentValidation.CreateStudentValSchema),
  userController.createStudent
);
router.post(
  '/create-faculty',
  validationReques(FacultyValidation.createFacultyValidationSchema),
  userController.createFaculty
);

export const userRoutes = router;
