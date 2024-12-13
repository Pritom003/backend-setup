import {  model, Schema } from "mongoose";
import { TassignFaculty, Tcourse, TpreRequisteCourses } from "./Course.interface";


const preRequiCourseScheema=new Schema <TpreRequisteCourses>({
    course:{
        type:Schema.Types.ObjectId,
        ref:"Course"
      
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
})

const courseScheema=new Schema<Tcourse>({
    title:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    prefix:{
        type:String,
        trim:true,
        required:true
    },
    code:{
        type:Number,

        trim:true,
        required:true
    },
    credits:{
        type:Number,
        trim:true,
        required:true
    },
    preRequisiteCourses:  [preRequiCourseScheema],
    isDeleted:{
        type:Boolean,
        default:false
    },
})

export const courseModel =model<Tcourse>('Course',courseScheema)

const CourseFacultyScheema=new Schema<TassignFaculty>({
    course:{
        type:Schema.Types.ObjectId,
        ref:"Course",
        unique:true,
        required:true
      
    },
faculties:[
    {
        type:Schema.Types.ObjectId,
        ref:'Faculty'
    }
]
})

export const courseFacultyModel =model<TassignFaculty>('CourseFaculty',CourseFacultyScheema)
