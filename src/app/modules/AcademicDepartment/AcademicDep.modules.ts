import { model, Schema } from "mongoose";
import { TAcademicDep } from "./AcademicDep.interface";
// import AppError from "../Errors/AppErrors";

const AcademicDepSchema =new Schema<TAcademicDep>({
name:{
    type:String,
    required:true,
    unique:true
},
academicFaculty:{
    type:Schema.Types.ObjectId,
    ref:'AcademicFaculty'
}
}, {
    timestamps: true
})
// AcademicDepSchema.pre('save',async function (next){
//     const isDepExist=await AcademicDepmodel.findOne({
//         name:this.name
//     })
//     if(isDepExist){
//         throw new AppError(
//             404,
//             'This department already  exist! ',
//           );
//         }
      
//     next()
// } )

// AcademicDepSchema.pre('findOneAndUpdate',async function (next){
// const query=this.getQuery()
// const isDepExist=await AcademicDepmodel.findOne(query)
// if(!isDepExist){
//     throw new AppError(
//         404,
//         'This department already  exist! ',
//       );
//     }
//     next()
// } )
  
  export const AcademicDepmodel = model<TAcademicDep>('AcademicDepartment', AcademicDepSchema);