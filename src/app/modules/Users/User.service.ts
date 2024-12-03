import config from "../../config";
import { TStudent } from "../students/student.interface";
import studentModel from "../students/student.model";
import { TUser } from "./User.interface";
import { User } from "./user.models";

const createStudentoDB = async (password: string, studentdata: TStudent) => {


  // Create user object
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_pass as string;
  userData.role = 'student';
  userData.id = '202410001334'; // Manually set ID for the user
  
  try {
    const newUser = await User.create(userData);

    // Check if the user creation was successful
    if (newUser && Object.keys(newUser).length > 0) {
      try {
        // Ensure studentdata is defined and has the correct structure
        if (!studentdata) {
          throw new Error('Student data is undefined');
        }

        studentdata.id = newUser.id; // Assign user ID to studentdata
        studentdata.user = newUser._id; // Reference the user correctly

        // Create student in the database
        const newStudent = await studentModel.create(studentdata);
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