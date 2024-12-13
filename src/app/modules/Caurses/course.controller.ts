import { RequestHandler } from "express";
import CatchAsync from "../../utils/fetch.async";
import { courseservices } from "./course.server";
import sendResponse from "../../utils/sendReponse";
import httpStatus from 'http-status';


const createCourse :RequestHandler = CatchAsync(async (req, res ) => {
  

    const result = await courseservices.creaCourseintoDB(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course is created succesfully',
      data: result,
    });

})
const getAllCourses :RequestHandler =  CatchAsync(async (req, res  ) => {

    const result = await  courseservices.getAllCoursesFromDb(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Courses are retrieved succesfully',
      data: result,
    });
  
})
const getSinglecourse :RequestHandler = CatchAsync( async (req, res  )=> {

    const {id}= req.params;
    const result = await courseservices.getsingleCourseFromDb(id);
 
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'courseis retrieved succesfully',
      data: result,
    });
 
})
const updatecourse:RequestHandler = CatchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await courseservices.updateCourseintoDb(id,req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'faculty is Updated succesfully',
      data: result,
    });
  });
  
  const deleteCousrse:RequestHandler = CatchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await courseservices.deleteCourseFromDb(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'delete is deleted succesfully',
      data: result,
    });
  });
    
  const assignFaculties:RequestHandler = CatchAsync(async (req, res) => {
    const { courseId } = req.params;
    const {faculties}=req.body
    const result = await courseservices.assignFacultiesintocourseintoDb(courseId,faculties);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Facuty assigned  succesfully',
      data: result,
    });
  });
  const removeassignFaculties:RequestHandler = CatchAsync(async (req, res) => {
    const { courseId } = req.params;
    const {faculties}=req.body
    const result = await courseservices.removeassignFacultiesintocourseintoDb(courseId,faculties);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Facuty removed succesfully',
      data: result,
    });
  });
export const courseController={
    assignFaculties, createCourse,getAllCourses,getSinglecourse,deleteCousrse ,updatecourse,removeassignFaculties
}