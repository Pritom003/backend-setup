
import httpStatus from 'http-status';

import mongoose from 'mongoose';
import QueryBuilder from '../../Builder/QueryBuilder';
import { TFaculty } from './Faculty.interface';
import FacultyShceemaModel from './Faculty.models';
import { facultyseachablefields } from './faculty.const';
import AppError from '../Errors/AppErrors';
import { User } from '../Users/user.models';


const getAllFacultiessfromDB = async (query: Record<string, unknown>) => {

const studentQuery =new QueryBuilder (FacultyShceemaModel.find()
.populate({
  path: 'academicDepartment',
  populate: {
    path: 'academicFaculty',
  }}),query).
search(facultyseachablefields).filter().sort().paginate().fields()
const result =await studentQuery.modelQuery
  return result
};

const getsinglefacultyfromDB = async (id: string) => {
  const result = await FacultyShceemaModel.findOne({ id })
  .populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });
  return result;
};
const UpdatedfacultyFromDB  = async (id: string,payload:Partial<TFaculty>) => {
   const {name,gender, ...remaindfacultyData}=payload
const modifiedData:Record<string,unknown>={...remaindfacultyData}
if(name && Object.keys(name).length){
  for(const[key,value]of Object.entries(name)){
    modifiedData[`name.${key}`]=value
  }
}

if(gender && Object.keys(gender).length){
  for(const[key,value]of Object.entries(gender)){
    modifiedData[`gender.${key}`]=value
  }
}

  const result = await FacultyShceemaModel.findOneAndUpdate({ id },modifiedData) 
  return result;
};
const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Corrected: Use findOneAndUpdate instead of findByIdAndUpdate
    const deletefaculty = await FacultyShceemaModel.findOneAndUpdate(
      { id }, 
      { isDeleted: true }, 
      { new: true, session }
    );

    if (!deletefaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty');
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
    return deletefaculty;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    console.log(err);
    // throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'An error occurred');
  }
};

export const FacultyServices = {
 
  getAllFacultiessfromDB,
getsinglefacultyfromDB 
,UpdatedfacultyFromDB,
deleteFacultyFromDB
//   deleteStudentFromDB ,
//   UpdatedStudentFromDB
};