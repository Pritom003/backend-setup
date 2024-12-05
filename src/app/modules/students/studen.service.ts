
import studentModel from './student.model';


const getAllstudentsfromDB = async () => {
  const result = await studentModel.find();
  return result;
};
const getsinglestudnetfromDB = async (id: string) => {
  const result = await studentModel.findOne({ id });
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const result = await studentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
 
  getAllstudentsfromDB,
  getsinglestudnetfromDB,
  deleteStudentFromDB 
};