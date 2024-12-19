import express from 'express';
import { OfferedCoursesController } from './OfferedCourse.controller';
import validationReques from '../Middlewares/validateRequest';
import { OfferedCourseValidations } from './OfferedCourses.validation';


const router = express.Router();

router.get('/', OfferedCoursesController.getAllOfferedCoursess);

router.get('/:id', OfferedCoursesController.getSingleOfferedCourses);

router.post(
  '/create-offered-course',
  validationReques(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCoursesController.createOfferedCourses,
);

router.patch(
  '/:id',
  validationReques(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCoursesController.updateOfferedCourses,
);

// router.delete(
//   '/:id',
//   OfferedCourseControllers.deleteOfferedCourseFromDB,
// );

export const offeredCourseRoutes = router;