
import { TStudent } from './student.interface';
import studentModel from './student.model';

const createStudentoDB = async (student: TStudent) => {
  const result = await studentModel.create(student);
  return result;
};
const getAllstudentsfromDB = async () => {
  const result = await studentModel.find();
  return result;
};
const getsinglestudnetfromDB = async (id: string) => {
  const result = await studentModel.findOne({ id });
  return result;
};
export const StudentServices = {
  createStudentoDB,
  getAllstudentsfromDB,
  getsinglestudnetfromDB,
};