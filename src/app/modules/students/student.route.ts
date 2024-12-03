import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();
// call the controller

router.get('/', studentController.getAllstudents);
router.get('/:id', studentController.getSingletudents);
export const StudentRoutes = router;