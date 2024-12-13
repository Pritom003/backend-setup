import { RequestHandler } from "express";
import CatchAsync from "../../utils/fetch.async";
import { FacultyServices } from "./Faculty.sevice";
import sendResponse from "../../utils/sendReponse";

import httpStatus from 'http-status';


const getAllfaculties :RequestHandler =  CatchAsync(async (req, res  ) => {

    const result = await  FacultyServices.getAllFacultiessfromDB(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculties are retrieved succesfully',
      data: result,
    });
  
})
const getSingletfaculty :RequestHandler = CatchAsync( async (req, res  )=> {

    const {id}= req.params;
    const result = await FacultyServices.getsinglefacultyfromDB(id);
 
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty is retrieved succesfully',
      data: result,
    });
 
})
const UpdateFaculty:RequestHandler = CatchAsync(async (req, res) => {
    const { id } = req.params;
    const {faculty}=req.body
    const result = await FacultyServices.UpdatedfacultyFromDB(id, faculty);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'faculty is Updated succesfully',
      data: result,
    });
  });
  
  const deletefaculty:RequestHandler = CatchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacultyServices.deleteFacultyFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'faculty is deleted succesfully',
      data: result,
    });
  });
export const FacultyController={
    getAllfaculties,
    getSingletfaculty,
    UpdateFaculty,
    deletefaculty
}