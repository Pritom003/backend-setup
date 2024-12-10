import { Model, Types } from "mongoose";
export type TName={
    firstName: string;
    middleName?: string;
    lastName: string;
  };
export type TFaculty = {
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
  profileImage?: string; // Optional profile image URL
  academicFaculty: Types.ObjectId; // Reference to the faculty collection
  academicDepartment: Types.ObjectId; // Reference to the department collection
  isDeleted: boolean; // Soft delete flag
  createdAt: Date; // Timestamp for creation
  updatedAt: Date; // Timestamp for last update
};

export interface FacultyModel extends Model<TFaculty> {
  isFacultyExists(id: string): Promise<TFaculty | null>;
}
