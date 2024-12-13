import express from 'express';
import { AdminController } from './Admin.controllers';




const router = express.Router();
// call the controller

router.get('/', AdminController.getAllAdmin);
router.get('/:id', AdminController.getSingletAdmin);

export const AdminRoutes = router;