import { RequestHandler } from "express";
import CatchAsync from "../../utils/fetch.async";
import sendResponse from "../../utils/sendReponse";

import httpStatus from 'http-status';
import { AdminServices } from "./Admon.service";


const getAllAdmin :RequestHandler =  CatchAsync(async (req, res  ) => {

    const result = await AdminServices.getAllAdminsfromDB(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin are retrieved succesfully',
      data: result,
    });
  
})
const getSingletAdmin :RequestHandler = CatchAsync( async (req, res  )=> {

    const {id}= req.params;
    const result = await AdminServices.getsingleAdminfromDB(id);
 
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin is retrieved succesfully',
      data: result,
    });
 
})
// const UpdateFaculty:RequestHandler = CatchAsync(async (req, res) => {
//     const { facultyId } = req.params;
//     const {faculty}=req.body
//     const result = await FacultyServices.UpdatedfacultyFromDB(facultyId, faculty);
  
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'faculty is Updated succesfully',
//       data: result,
//     });
//   });
  
//   const deletefaculty:RequestHandler = CatchAsync(async (req, res) => {
//     const { facultyId } = req.params;
//     const result = await FacultyServices.deleteFacultyFromDB(facultyId);
  
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'faculty is deleted succesfully',
//       data: result,
//     });
//   });
export const AdminController={
    getAllAdmin,
    getSingletAdmin,
  
}