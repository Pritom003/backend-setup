import express from 'express';
import { AcademicSemcontroller } from './AcademicSem.controller';
import validationReques from '../Middlewares/validateRequest';
import { AcademicSemValidationSchema } from './AcademicSem.validation';


const router = express.Router();
// call the controller
router.post('/create-academic-sem', validationReques(AcademicSemValidationSchema.createAcdemicSemValidationSchema),AcademicSemcontroller.createAcademicSem)
router.get('/', AcademicSemcontroller.getAllAcademicSems)
router.get('/AcademicSemId', AcademicSemcontroller.getSinglAcademicSem);
router.patch('/AcademicSemId', AcademicSemcontroller.getSinglAcademicSem);
router.patch(
    '/:AcademicSemId',
    validationReques(
        AcademicSemValidationSchema.updateAcademicSemValidationSchema,
    ),
    AcademicSemcontroller.updateAcademicSemester,
  );

// router.get('/', studentController.getAllstudents);

export const AcademicSemRoute = router;