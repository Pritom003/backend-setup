import { model, Schema } from "mongoose";
import { TName } from "../Faculty/Faculty.interface";
import { TAdmin } from "./Admin .interface";




const AdminNameSchema = new Schema<TName>({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  });
  

const AdminScheema =new Schema<TAdmin>({
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    name:AdminNameSchema,
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
  
    profileImage: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },


})
const AdminShceemaModel = model<TAdmin>('Admin', AdminScheema);
export default AdminShceemaModel;