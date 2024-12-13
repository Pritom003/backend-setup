import express from 'express';
import validationReques from '../Middlewares/validateRequest';
import { courseValidation } from './course.validation';
import { courseController } from './course.controller';




const router = express.Router();
// call the controller
router.post('/create-course', validationReques(courseValidation.createCourseValidationSchema),courseController.createCourse)
router.get('/', courseController.getAllCourses)
router.get('/:id', courseController.getSinglecourse);
router.delete('/:id', courseController.deleteCousrse);
router.put('/:courseId/assign-facutlties', validationReques(courseValidation.facultiesWithCourseValidationSchema),courseController.assignFaculties)
router.delete('/:courseId/remove-facutlties', validationReques(courseValidation.facultiesWithCourseValidationSchema),courseController.removeassignFaculties)
router.patch('/:id',validationReques(courseValidation.updateCourseValidationSchema), courseController.updatecourse);


export const CourseRouter = router;