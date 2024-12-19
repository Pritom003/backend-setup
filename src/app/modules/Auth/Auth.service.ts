import config from "../../config";
import AppError from "../Errors/AppErrors";
import { User } from "../Users/user.models"
import { TLoginUser } from "./Auth.interface"
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import  { JwtPayload } from 'jsonwebtoken';
import { creatreTokep } from "./Auth.utils";
const Loginuser=async(payload:TLoginUser)=>{
const isUserExists=await User.isUserExistByCustomId (payload.id)
// console.log(isUserExists);
    if(!isUserExists){
        throw new AppError(httpStatus.NOT_FOUND, 'User  not found !');
    }
    const isUserDelted=isUserExists?.isDeleted
    if(isUserDelted){
        throw new AppError(httpStatus.FORBIDDEN, 'This User is Deleted!');
    }
    const isUserBlocked=isUserExists?.status
    if(isUserBlocked==='blocked'){
        throw new AppError(httpStatus.FORBIDDEN, 'This User is Blocked');
    }

const isPasswordmatched= await User.isPasswordmatched(payload.password,isUserExists.password)
   
if(!isPasswordmatched){
    throw new AppError(httpStatus.FORBIDDEN, 'password do not match');

}

const JwtPayload={
    UserID:isUserExists.id,
    role:isUserExists.role
}

const accessToken=creatreTokep(JwtPayload,config.JWT_SECRET,config.JWT_ACCESS_IN)
 const refreshToken=creatreTokep(JwtPayload,config.JWT_REFRESH_SECRET,config.JWT_REFRESH_IN)
return {
    accessToken,refreshToken,
    needsPassworChange:isUserExists.needsPassworChange
    
}
}
const ChangePasswordservice= async(userData:JwtPayload ,
    payload :{oldPassword:string,newPassword:string})=>{
        const isUserExists=await User.isUserExistByCustomId (userData.userID)
        // console.log(isUserExists);
            if(!isUserExists){
                throw new AppError(httpStatus.NOT_FOUND, 'User  not found !');
            }
            const isUserDelted=isUserExists?.isDeleted
            if(isUserDelted){
                throw new AppError(httpStatus.FORBIDDEN, 'This User is Deleted!');
            }
            const isUserBlocked=isUserExists?.status
            if(isUserBlocked==='blocked'){
                throw new AppError(httpStatus.FORBIDDEN, 'This User is Blocked');
            }
        
        const isPasswordmatched= await User.isPasswordmatched(payload.oldPassword,isUserExists.password)
           
        if(!isPasswordmatched){
            throw new AppError(httpStatus.FORBIDDEN, 'password do not match');
        
        }
        const newHashedPasswrod =await bcrypt.hash(
            payload.newPassword, Number(config.bycrypt_pass)
        )

await User.findByIdAndUpdate({
    id:userData.userID,role:userData.role
} , {
    password:newHashedPasswrod,
    needsPassworChange:false,
    passwordChangedAt:new Date()
}  )
return null
}

export const Authservice={
    Loginuser,ChangePasswordservice

}