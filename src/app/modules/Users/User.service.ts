// import { ObjectId } from "mongoose";

import config from "../../config";
// import { TAcademicSem } from "../AcademicSem/AcademicSem.interface";
import AcademicSem from "../AcademicSem/AcademicSem.models";
import { TStudent } from "../students/student.interface";
import studentModel from "../students/student.model";
import { TUser } from "./User.interface";
import { User } from "./user.models";
import { genarateStudentId } from "./user.utils";
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

userData.id= await genarateStudentId(admissionSemister)

  try {
    const newUser = await User.create(userData);

    // Check if the user creation was successful
    if (newUser && Object.keys(newUser).length > 0) {
      try {
        // Ensure studentdata is defined and has the correct structure
        if (!payload) {
          throw new Error('Student data is undefined');
        }

        payload.id = newUser.id; // Assign user ID to studentdata
        payload.user = newUser._id; // Reference the user correctly

        // Create student in the database
        const newStudent = await studentModel.create(payload);
        return newStudent;
      } catch (err: any) {
        throw new Error(`Error creating student: ${err.message}`);
      }
    } else {
      throw new Error("User creation failed");
    }
  } catch (err: any) {
    throw new Error(`Error in createStudentoDB: ${err.message}`);
  }
};




export const UserService={
  createStudentoDB
}