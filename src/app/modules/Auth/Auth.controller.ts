import { RequestHandler } from "express";
import CatchAsync from "../../utils/fetch.async";
import sendResponse from "../../utils/sendReponse";
import httpStatus from 'http-status';
import { Authservice } from "./Auth.service";
import config from "../../config";


const createLoginUser :RequestHandler= CatchAsync(async (req, res ) => {
  

    const result = await Authservice.Loginuser(req.body)
    const {refreshToken,accessToken,needsPassworChange}=result
    res.cookie('refreshToken',refreshToken,{
      secure:config.NODE_ENV==='production',
      httpOnly: true,

    })
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'LoginUser  is created succesfully',
      data:{accessToken,needsPassworChange},
    });

})
const ChangePassword :RequestHandler= CatchAsync(async (req, res ) => {
  // const user=req.user;
  const {...passwordData}=req.body

  const result = await Authservice.ChangePasswordservice(req.user,passwordData )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password changed succesfully',
    data: result,
  });

})
export const LoginUserController={
    createLoginUser,ChangePassword
}