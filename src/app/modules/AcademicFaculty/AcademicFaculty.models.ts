import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./AcademicFaculty.interface";
const AcademicFacultySchema =new Schema<TAcademicFaculty>({
name:{
    type:String,
    required:true,
    unique:true
}
}, {
    timestamps: true
})

  
  export const AcademicFacultymodel = model<TAcademicFaculty>('AcademicFaculty', AcademicFacultySchema);