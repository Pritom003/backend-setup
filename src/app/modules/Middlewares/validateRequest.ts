import {AnyZodObject} from 'zod'
import { NextFunction, Request, Response } from 'express';
const validationReques=(schema:AnyZodObject)=>{
    return async(req:Request,res:Response ,next:NextFunction)=>
        
        {try{
        await schema.parseAsync({
                body:req.body,
            })

         next()
        }catch(err){
            next(err)
        }
}}
export default validationReques