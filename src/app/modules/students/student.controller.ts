import {  RequestHandler} from 'express';
import { StudentServices } from './studen.service';
import sendResponse from '../../utils/sendReponse';
import httpStatus from 'http-status';
import CatchAsync from '../../utils/fetch.async';

const getAllstudents :RequestHandler =  CatchAsync(async (req, res  ) => {

    const result = await StudentServices.getAllstudentsfromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student are retrieved succesfully',
      data: result,
    });
  
})
const getSingletudents :RequestHandler = CatchAsync( async (req, res  )=> {

    const studentId = req.params.id;
    const result = await StudentServices.getsinglestudnetfromDB(studentId);
 
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student are retrieved succesfully',
      data: result,
    });
 
})
const UpdateStudent:RequestHandler = CatchAsync(async (req, res) => {
  const { studentId } = req.params;
  const {student}=req.body
  const result = await StudentServices.UpdatedStudentFromDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is Updated succesfully',
    data: result,
  });
});

const deleteStudent:RequestHandler = CatchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted succesfully',
    data: result,
  });
});
export const studentController = {
  getAllstudents,
  getSingletudents,
  deleteStudent,
  UpdateStudent
};