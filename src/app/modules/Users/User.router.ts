import express from 'express';


const router = express.Router();
// call the controller
router.post('/create-user', userController.createStudent);

export const userRoutes = router;
