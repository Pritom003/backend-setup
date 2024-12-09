import mongoose from "mongoose";
import { TErrorSource, tGenericErrorResponce } from "../Interface/Error";

export const handleValidationError=(err :mongoose.Error.ValidationError) :tGenericErrorResponce=>{
    const errorSources:TErrorSource=Object.values(err.errors).map((val:mongoose.Error.ValidatorError | mongoose.Error.CastError)=>{
        return{
            path:val?.path,
            message:val?.message
            
        }
    })
    const statusCode =400

    return {
        statusCode,
        message:'Validation Error',
        errorSources
      }
}