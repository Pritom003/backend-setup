import express from 'express';
import { userController } from './User.controllers';

import { StudentValidation } from '../students/student.validation';
import validationReques from '../Middlewares/validateRequest';
import { FacultyValidation } from '../Faculty/Faculty.validation';
import { AdminValidation } from '../Admin/Admin.validation';
import auth from '../Middlewares/auth';
import { USER_ROLE } from './User.conts';
// import StudentValidation  from '../students/student.validation';
const router = express.Router();

// call the controller
router.post(
  '/create-students',auth(USER_ROLE.admin),
  validationReques(StudentValidation.CreateStudentValSchema),
  userController.createStudent
);
router.post(
  '/create-faculty',auth(USER_ROLE.admin),
  validationReques(FacultyValidation.createFacultyValidationSchema),
  userController.createFaculty
);
router.post(
  '/create-admin',
  validationReques(AdminValidation.createAdminValidationSchema),
  userController.createAdmin
);

export const userRoutes = router;
