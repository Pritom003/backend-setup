import { TassignFaculty, TpreRequisteCourses } from './Course.interface';
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Tcourse } from "./Course.interface"
import mongoose from "mongoose"
import QueryBuilder from "../../Builder/QueryBuilder"
import { Tcourse } from "./Course.interface"
import  { courseFacultyModel, courseModel } from "./course.models"
import AppError from "../Errors/AppErrors"
import httpStatus from 'http-status';
import CatchAsync from '../../utils/fetch.async';

const creaCourseintoDB=async(payload:Tcourse)=>{
    const result=await courseModel.create(payload)
    return result
}
const getAllCoursesFromDb=async(query:Record<string, unknown>)=>{
    const searchableCourse=['title','prefix','code']
    const courseQuery=new QueryBuilder(courseModel.find().populate('preRequisiteCourses.course'),query)
    .search(searchableCourse)
    .filter()
    .sort()
    .paginate()
    .fields()

    
    const result=await courseQuery.modelQuery
    return result
}
const getsingleCourseFromDb=async(id:string)=>{
    const result=await courseModel.findById(id).populate('preRequisiteCourses.course')
    return result
}
const updateCourseintoDb=async(id:string,payload:Partial<Tcourse>)=>{
    
    const {preRequisiteCourses,...courseRemainingData}=payload
    const session = await mongoose.startSession();
try{  
    
    session.startTransaction();
    const BasicCourdeInfoUpdate=await courseModel.findByIdAndUpdate(id,courseRemainingData,
    {new:true,runValidators:true,session})

    if (!BasicCourdeInfoUpdate) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
      }
  

 if(preRequisiteCourses && preRequisiteCourses.length >0){
    const filterdeletedpreRequisite=preRequisiteCourses.
    filter((el:TpreRequisteCourses)=>el.course && 
        el.isDeleted).map((el:TpreRequisteCourses)=>el.course)
        const deletedPreRequisiteCourses = await courseModel.findByIdAndUpdate(
            id,
            {
              $pull: {
                preRequisiteCourses: { course: { $in: filterdeletedpreRequisite } },
              },
            },
            {
              new: true,
              runValidators: true,
              session,
            },
          );
          if (!deletedPreRequisiteCourses) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
          }
          const newPreRequisites = preRequisiteCourses?.filter(
            (el:TpreRequisteCourses) => el.course && !el.isDeleted,
          );
          
      const newPreRequisiteCourses = await courseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
      }
    }
    await session.commitTransaction();
    await session.endSession();

    const result = await courseModel.findById(id).populate(
      'preRequisiteCourses.course',
    );

    return result
    
 }   


catch(err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

const deleteCourseFromDb=async(id:string)=>{

    const result=await courseModel.findByIdAndUpdate(id,{isDeleted:true},{new:true})
        return result
}
const assignFacultiesintocourseintoDb=async(
    id:string , 
    payload:Partial<TassignFaculty>)=>{
        const result =await courseFacultyModel.findByIdAndUpdate(
            id,
            {
                course:id,
                $addToSet:{faculties:{$each:payload}},
            },{
                upsert:true,new:true
            }
        )
return result
}
const removeassignFacultiesintocourseintoDb=async(
    id:string , 
    payload:Partial<TassignFaculty>)=>{
        const result =await courseFacultyModel.findByIdAndUpdate(
            id,
            {
                
                $pull:{faculties:{$in:payload}},
            },{
                upsert:true,new:true
            }
        )
return result
}
export const courseservices={
    creaCourseintoDB,getAllCoursesFromDb,getsingleCourseFromDb,
    updateCourseintoDb
,    deleteCourseFromDb,
assignFacultiesintocourseintoDb,removeassignFacultiesintocourseintoDb
}