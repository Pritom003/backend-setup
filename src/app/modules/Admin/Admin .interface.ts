import { Model, Types } from "mongoose";
import { TName } from "../Faculty/Faculty.interface";

export type TAdmin = {
  id: string; // Custom generated id
  user:Types.ObjectId;
  designation: string; // Job title or role
  name: TName,
  gender: 'male' | 'female' | 'others';
  dateOfBirth: string; // ISO date string
  email: string;
  contactNo: string; 
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string; // Optiona

 
  isDeleted: boolean; 
  createdAt: Date; 
  updatedAt: Date; 
};

export interface AdminModel extends Model<TAdmin> {
  isAdminExists(id: string): Promise<TAdmin | null>;
}
