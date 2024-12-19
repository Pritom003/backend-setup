import { RequestHandler } from "express";
import CatchAsync from "../../utils/fetch.async";

import sendResponse from "../../utils/sendReponse";
import httpStatus from 'http-status';
import { OfferedCoursesservices } from "./OfferedCurses.Sevice";


const createOfferedCourses :RequestHandler = CatchAsync(async (req, res ) => {
      const result = await OfferedCoursesservices.creaofferedCourseintoDB(req.body)

 
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' OfferedOfferedCourses is created succesfully',
      data: result,
    });

})
const getAllOfferedCoursess :RequestHandler =  CatchAsync(async (req, res  ) => {

    const result = await  OfferedCoursesservices.getAllOfferedCoursessFromDb(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCoursess are retrieved succesfully',
      data: result,
    });
  
})
const getSingleOfferedCourses :RequestHandler = CatchAsync( async (req, res  )=> {

    const {id}= req.params;
    const result = await OfferedCoursesservices.getsingleOfferedCoursesFromDb(id);
 
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCoursesis retrieved succesfully',
      data: result,
    });
 
})
const updateOfferedCourses:RequestHandler = CatchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await OfferedCoursesservices.updateOfferedCourseintoDb(id,req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'faculty is Updated succesfully',
      data: result,
    });
  });
  


export const OfferedCoursesController={
    createOfferedCourses,
    getAllOfferedCoursess,getSingleOfferedCourses,
   updateOfferedCourses,
   
}