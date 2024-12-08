import express from 'express';
import { studentController } from './student.controller';
import validationReques from '../Middlewares/validateRequest';
import { StudentValidation } from './student.validation';

const router = express.Router();
// call the controller

router.get('/', studentController.getAllstudents);
router.get('/:id', studentController.getSingletudents);
router.delete('/:studentId', studentController.deleteStudent);
router.patch('/:studentId',validationReques(StudentValidation.UpdateStudentValSchema), studentController.UpdateStudent);
export const StudentRoutes = router;