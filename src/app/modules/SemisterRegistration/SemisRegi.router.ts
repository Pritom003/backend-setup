import express from 'express';
import { SemesterRegistrationValidations } from './SemisRegi.validation';
import { SemesterRegistrationController } from './SemisRegi.controller';
import validationReques from '../Middlewares/validateRequest';


const router = express.Router();

router.post(
  '/create-sem-regi',
  validationReques(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  validationReques(
    SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.delete(
  '/:id',
  SemesterRegistrationController.deleteSemesterRegistration,
);

router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);

export const semesterRegistrationRoutes = router;