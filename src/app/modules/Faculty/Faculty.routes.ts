import express from 'express';

// import validationReques from '../Middlewares/validateRequest';
import { FacultyController } from './Faculty.controller';


const router = express.Router();
// call the controller

router.get('/', FacultyController.getAllfaculties);
router.get('/:id', FacultyController.getSingletfaculty);
router.patch('/:id', FacultyController.UpdateFaculty);
router.delete('/:id', FacultyController.deletefaculty);
export const facultyRoutes = router;