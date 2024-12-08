import express from 'express';
import { StudentRoutes } from '../modules/students/student.route';
import { userRoutes } from '../modules/Users/User.router';
import { AcademicSemRoute } from '../modules/AcademicSem/AcademicSem.router';
import { AcademicfacultyRoute } from '../modules/AcademicFaculty/AcademicFaculy.router';
import { AcademicDepRoute } from '../modules/AcademicDepartment/AcademicDep.router';
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
 {
    path:'/academic-sem',
    route:AcademicSemRoute
 },
 {
    path:'/academic-feculty',
    route:AcademicfacultyRoute
 },
 {
    path:'/academic-Dep',
    route:AcademicDepRoute
 },
 
]
moduleRoutes.forEach(route=>router.use(route.path,route.route))




export default router