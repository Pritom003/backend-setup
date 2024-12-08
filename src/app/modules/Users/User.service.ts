// import { ObjectId } from "mongoose";

import mongoose from "mongoose";
import config from "../../config";
import httpStatus from 'http-status';
// import { TAcademicSem } from "../AcademicSem/AcademicSem.interface";
import AcademicSem from "../AcademicSem/AcademicSem.models";
import { TStudent } from "../students/student.interface";
import studentModel from "../students/student.model";
import { TUser } from "./User.interface";
import { User } from "./user.models";
import { genarateStudentId } from "./user.utils";
import AppError from "../Errors/AppErrors";
// import { genarateStudentId } from "./user.utils";

const createStudentoDB = async (password: string, payload: TStudent) => {


  // Create user object
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_pass as string;
  userData.role = 'student';
  // userData.id = '202410001334'; // Manually set ID for the user
  

const admissionSemister=await AcademicSem.findById( payload.admissionSemister)
if (!admissionSemister) {
  throw new Error("Admission semester not found");
}

const session =await mongoose.startSession()

  try {
    session.startTransaction()
    userData.id= await genarateStudentId(admissionSemister)
  //  create a user 
    const newUser = await User.create([userData],{session});

    // Check if the user creation was successful
    if (!newUser.length ) {

throw new AppError(httpStatus.BAD_REQUEST,'Failed to create User')
    }
      try {
        // Ensure studentdata is defined and has the correct structure
        if (!payload) {
          throw new Error('Student data is undefined');
        }

        payload.id = newUser[0].id; // Assign user ID to studentdata
        payload.user = newUser[0]._id; // Reference the user correctly

        // Create student in the database transition

        const newStudent = await studentModel.create([payload],{session});
        if(!newStudent.length){
          throw new AppError(httpStatus.BAD_REQUEST,'Failed to create student')
        }

        await session.commitTransaction()
        await session.endSession()
        return newStudent;
      } catch (err: any) {
        await session.abortTransaction()
        await session.endSession()

        throw new AppError(500,`Error creating student: ${err.message}`);
      }
    // } else {
    //   throw new Error("User creation failed");
    // }
  } catch (err: any) {
    throw new Error(`Error in createStudentoDB: ${err.message}`);
  }
};




export const UserService={
  createStudentoDB
}