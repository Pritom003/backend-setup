import { Types } from "mongoose";

export type TpreRequisteCourses={
    course:Types.ObjectId;
    isDeleted:boolean
}

export type Tcourse={
    title:string;
    prefix:string;
    code:number;
    credits:number;
    preRequisiteCourses:[];
    isDeleted?:boolean

}
export type TassignFaculty={
    course:Types.ObjectId;
    faculties:[Types.ObjectId]
}