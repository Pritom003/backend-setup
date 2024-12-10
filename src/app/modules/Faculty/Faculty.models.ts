import { model, Schema } from "mongoose";
import { TFaculty, TName } from "./Faculty.interface";



const FacultyNameSchema = new Schema<TName>({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  });
  

const FacultyScheema =new Schema<TFaculty>({
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    name:FacultyNameSchema,
    designation:{ type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'others'] },
    dateOfBirth: { type: String, required: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: true },
    emergencyContactNo:{ type: String, required: true },
    presentAddress:{ type: String, required: true },
    permanentAddress:{ type: String, required: true },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
      },
      academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
      },
    profileImage: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },


})
const FacultyShceemaModel = model<TFaculty>('Faculty', FacultyScheema);
export default FacultyShceemaModel;