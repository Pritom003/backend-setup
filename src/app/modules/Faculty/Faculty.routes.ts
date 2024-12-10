import express from 'express';

// import validationReques from '../Middlewares/validateRequest';
import { FacultyController } from './Faculty.controller';


const router = express.Router();
// call the controller

router.get('/', FacultyController.getAllfaculties);
router.get('/:facultyId', FacultyController.getSingletfaculty);
router.patch('/:facultyId', FacultyController.UpdateFaculty);
router.delete('/:facultyId', FacultyController.deletefaculty);
export const facultyRoutes = router;