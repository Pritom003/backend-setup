import httpStatus from 'http-status';
import { RequestHandler } from "express";
import { AcademicFacultyService } from "./AcademicFaculty.services";
import CatchAsync from "../../utils/fetch.async";
import sendResponse from "../../utils/sendReponse";

const createAcademicFaculty :RequestHandler = CatchAsync(async (req, res ) => {
 


    const result = await AcademicFacultyService.createAcademicFacultyToDB(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semister  is created succesfully',
      data: result,
    });

})

const getAllAcademicFacultys :RequestHandler =  CatchAsync(async (req, res  ) => {

  const result = await AcademicFacultyService.getAllAcademicFacultiesfromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved succesfully',
    data: result,
  });

})
const getSinglAcademicFaculty :RequestHandler = CatchAsync( async (req, res  )=> {

  const AcademicFacultyId = req.params.id;
  const result = await AcademicFacultyService.getsingleAcademicFacultyfromDB(AcademicFacultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved succesfully',
    data: result,
  });

})
const updateAcademicFaculty = CatchAsync(async (req, res) => {
  const { AcademicFacultyId } = req.params;
  const result = await AcademicFacultyService.updateAcademicFacultyIntoDB(
    AcademicFacultyId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

export const AcademicFacultycontroller ={
    createAcademicFaculty,
    getSinglAcademicFaculty,
    getAllAcademicFacultys,
    updateAcademicFaculty
}