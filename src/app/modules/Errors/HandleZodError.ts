import { ZodError, ZodIssue } from 'zod';
import { TErrorSource, tGenericErrorResponce } from "../Interface/Error"

export const handleZodError=(err:ZodError) :tGenericErrorResponce=>{
    const statusCode =400
  const errorSources:TErrorSource=err.issues.map((issue:ZodIssue)=>{
    return{
      path:issue?.path[issue.path.length-1] ||'unknown',
      message:issue?.message ||'unknown error'
    }
  })
    return {
      statusCode,
      message:'Validation Error',
      errorSources
    }
  }