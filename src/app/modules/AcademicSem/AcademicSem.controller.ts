import {  RequestHandler} from "express";

import sendResponse from "../../utils/sendReponse";
import httpStatus from 'http-status';
import CatchAsync from "../../utils/fetch.async";
import { AcademicsemService } from "./AcademicSem.service";
const createAcademicSem :RequestHandler = CatchAsync(async (req, res ) => {
 


    const result = await AcademicsemService.createAcademicSemToDB(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semister  is created succesfully',
      data: result,
    });

})

const getAllAcademicSems :RequestHandler =  CatchAsync(async (req, res  ) => {

  const result = await AcademicsemService.getAllAcademicSemfromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved succesfully',
    data: result,
  });

})
const getSinglAcademicSem :RequestHandler = CatchAsync( async (req, res  )=> {

  const AcademicSemId = req.params.id;
  const result = await AcademicsemService.getsingleAcademicSemfromDB(AcademicSemId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved succesfully',
    data: result,
  });

})
const updateAcademicSemester = CatchAsync(async (req, res) => {
  const { AcademicSemId } = req.params;
  const result = await AcademicsemService.updateAcademicSemIntoDB(
    AcademicSemId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

export const AcademicSemcontroller ={
    createAcademicSem,
    getSinglAcademicSem,
    getAllAcademicSems,
    updateAcademicSemester
}