import express from 'express';
import validationReques from '../Middlewares/validateRequest';

import { AcademicFacultycontroller } from './AcademicFaculy.controllers';
import { AcademicFacultyValidation } from './AcademicFaculty.validation';


const router = express.Router();
// call the controller
router.post('/create-academic-faculty', validationReques(AcademicFacultyValidation.academicFacultyValidationSchema),AcademicFacultycontroller.createAcademicFaculty)
router.get('/', AcademicFacultycontroller.getAllAcademicFacultys)
router.get('/AcademicFacultyId', AcademicFacultycontroller.getSinglAcademicFaculty);
router.patch('/AcademicFacultyId',validationReques(AcademicFacultyValidation.updateacademicFacultyValidationSchema), AcademicFacultycontroller.updateAcademicFaculty);

// router.get('/', studentController.getAllstudents);

export const AcademicfacultyRoute = router;