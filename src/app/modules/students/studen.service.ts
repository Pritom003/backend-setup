
import mongoose from 'mongoose';
import studentModel from './student.model';
import AppError from '../Errors/AppErrors';
import httpStatus from 'http-status';
import { User } from '../Users/user.models';
import { TStudent } from './student.interface';

const getAllstudentsfromDB = async () => {
  const result = await studentModel.find()
  .populate('admissionSemister')
  .populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });;
  return result;
};
const getsinglestudnetfromDB = async (id: string) => {
  const result = await studentModel.findOne({ id })
  .populate('admissionSemister')

  .populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });;;
  return result;
};
const UpdatedStudentFromDB  = async (id: string,payload:Partial<TStudent>) => {
   const {name,gender ,Localguardian, ...remaindStudentData}=payload
const modifiredData:Record<string,unknown>={...remaindStudentData}
if(name && Object.keys(name).length){
  for(const[key,value]of Object.entries(name)){
    modifiredData[`name.${key}`]=value
  }
}
if(Localguardian && Object.keys(Localguardian).length){
  for(const[key,value]of Object.entries(Localguardian)){
    modifiredData[`Localguardian.${key}`]=value
  }
}
if(gender && Object.keys(gender).length){
  for(const[key,value]of Object.entries(gender)){
    modifiredData[`gender.${key}`]=value
  }
}

  const result = await studentModel.findOneAndUpdate({ id },modifiredData) 
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Corrected: Use findOneAndUpdate instead of findByIdAndUpdate
    const deleteStudent = await studentModel.findOneAndUpdate(
      { id }, 
      { isDeleted: true }, 
      { new: true, session }
    );

    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student');
    }

    // Corrected: Use findOneAndUpdate for User as well
    const deletedUser = await User.findOneAndUpdate(
      { id }, 
      { isDeleted: true }, 
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }

    await session.commitTransaction();
    await session.endSession();
    return deleteStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    console.log(err);
    // throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'An error occurred');
  }
};

export const StudentServices = {
 
  getAllstudentsfromDB,
  getsinglestudnetfromDB,
  deleteStudentFromDB ,
  UpdatedStudentFromDB
};