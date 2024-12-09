import mongoose from 'mongoose';
import { TErrorSource, tGenericErrorResponce } from './../Interface/Error';
export const handleCastError=(err:mongoose.Error.CastError):tGenericErrorResponce=>{
const errorSources:TErrorSource=[{
    path:err.path,
    message:err.message
}]
    const statusCode =400

    return {
        statusCode,
        message:'Invalid id Error',
        errorSources
      }

}