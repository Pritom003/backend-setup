import httpStatus from 'http-status';
import { RequestHandler } from "express";
import CatchAsync from "../../utils/fetch.async";
import sendResponse from "../../utils/sendReponse";
import { AcademicDepService } from './AcademicDep.service';

const createAcademicDep :RequestHandler = CatchAsync(async (req, res ) => {
 


    const result = await AcademicDepService.createAcademicDepToDB(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department  is created succesfully',
      data: result,
    });

})

const getAllAcademicDeps :RequestHandler =  CatchAsync(async (req, res  ) => {

  const result = await AcademicDepService.getAllAcademicDepsfromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Departmetns  are retrieved succesfully',
    data: result,
  });

})
const getSinglAcademicDep :RequestHandler = CatchAsync( async (req, res  )=> {

  const {AcademicDepId} = req.params;
  const result = await AcademicDepService.getsingleAcademicDepfromDB(AcademicDepId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department are retrieved succesfully',
    data: result,
  });

})
const updateAcademicDep = CatchAsync(async (req, res) => {
  const { AcademicDepId } = req.params;
  const result = await AcademicDepService.updateAcademicDepIntoDB(
    AcademicDepId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is updated succesfully',
    data: result,
  });
});

export const AcademicDepcontroller ={
    createAcademicDep,
    getSinglAcademicDep,
    getAllAcademicDeps,
    updateAcademicDep
}