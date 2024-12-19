import express from 'express';
import { StudentRoutes } from '../modules/students/student.route';
import { userRoutes } from '../modules/Users/User.router';
import { AcademicSemRoute } from '../modules/AcademicSem/AcademicSem.router';
import { AcademicfacultyRoute } from '../modules/AcademicFaculty/AcademicFaculy.router';
import { AcademicDepRoute } from '../modules/AcademicDepartment/AcademicDep.router';
import { facultyRoutes } from '../modules/Faculty/Faculty.routes';
import { AdminRoutes } from '../modules/Admin/Admin.router';
import { CourseRouter } from '../modules/Caurses/course.router';
import { semesterRegistrationRoutes } from '../modules/SemisterRegistration/SemisRegi.router';
import { offeredCourseRoutes } from '../modules/OfferedCourses/OfferedCourses.router';
import { AuthRouter } from '../modules/Auth/Auth.route';
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
   path:'/faculty',
   route:facultyRoutes
},
{
   path:'/admin',
   route:AdminRoutes
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
 {
   path:'/course',
   route:CourseRouter
},
{
   path:'/sem-regi',
   route:semesterRegistrationRoutes
},
{
   path:'/offered-course',
   route:offeredCourseRoutes
},
{
   path:'/auth',
   route:AuthRouter
},
]
moduleRoutes.forEach(route=>router.use(route.path,route.route))




export default router