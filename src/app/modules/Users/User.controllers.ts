import {  RequestHandler} from "express";
import { UserService } from "./User.service";
import sendResponse from "../../utils/sendReponse";
import httpStatus from 'http-status';
import CatchAsync from "../../utils/fetch.async";
const createStudent :RequestHandler = CatchAsync(async (req, res ) => {
 
    const { password, student } = req.body;

    const result = await UserService.createStudentoDB(password, student);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });

})
const createFaculty :RequestHandler = CatchAsync(async (req, res ) => {
 
  const { password, faculty } = req.body;

  const result = await UserService.createFacultyoDB(password, faculty);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created succesfully',
    data: result,
  });

})

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     // data from client
//     const {password, student  } = req.body;
//     // send the service
//     const result = await UserService.createStudentoDB(student,password);
//     // send the result to client
//     res.status(200).json({
//       success: true,
//       message: 'student created successfully',
//       data: result,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
export const userController ={
  createStudent,
  createFaculty
}