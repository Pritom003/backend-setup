import express from 'express';
import { StudentRoutes } from '../modules/students/student.route';
import { userRoutes } from '../modules/Users/User.router';
const router = express.Router();

const moduleRoutes=[
 {
    path:'/users',
    route:userRoutes
 },
 {
    path:'/students',
    route:StudentRoutes
 },
 
]
moduleRoutes.forEach(route=>router.use(route.path,route.route))




export default router