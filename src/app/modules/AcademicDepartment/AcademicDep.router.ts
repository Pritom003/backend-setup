import express from 'express';
import validationReques from '../Middlewares/validateRequest';
import { AcademicDepValidation } from './AcademicDep.validation';
import { AcademicDepcontroller } from './AcademicDep.controller';



const router = express.Router();
// call the controller
router.post('/create-academic-dep', validationReques(AcademicDepValidation.academicDepValidationSchema),AcademicDepcontroller.createAcademicDep)
router.get('/', AcademicDepcontroller.getAllAcademicDeps)
router.get('/AcademicDepId', AcademicDepcontroller.getSinglAcademicDep);
router.patch('/AcademicDepId',validationReques(AcademicDepValidation.updateacademicDepValidationSchema), AcademicDepcontroller.updateAcademicDep);

// router.get('/', studentController.getAllstudents);

export const AcademicDepRoute = router;