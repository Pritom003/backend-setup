
// import httpStatus from 'http-status';


import QueryBuilder from '../../Builder/QueryBuilder';
import AdminShceemaModel from './Admin.models';
import { Adminseachablefields } from './Admin.const';



const getAllAdminsfromDB = async (query: Record<string, unknown>) => {

const AdminQuery =new QueryBuilder (AdminShceemaModel.find(),query)
.search(Adminseachablefields).filter().sort().paginate().fields()
const result =await AdminQuery.modelQuery
  return result
};

const getsingleAdminfromDB = async (id: string) => {
  const result = await AdminShceemaModel.findById( id )

  return result;
};
// const UpdatedfacultyFromDB  = async (id: string,payload:Partial<TAdmin>) => {
//    const {name,gender, ...remaindfacultyData}=payload
// const modifiedData:Record<string,unknown>={...remaindfacultyData}
// if(name && Object.keys(name).length){
//   for(const[key,value]of Object.entries(name)){
//     modifiedData[`name.${key}`]=value
//   }
// }

// if(gender && Object.keys(gender).length){
//   for(const[key,value]of Object.entries(gender)){
//     modifiedData[`gender.${key}`]=value
//   }
// }

//   const result = await FacultyShceemaModel.findOneAndUpdate({ id },modifiedData) 
//   return result;
// };
// const deleteFacultyFromDB = async (id: string) => {
//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     // Corrected: Use findOneAndUpdate instead of findByIdAndUpdate
//     const deletefaculty = await FacultyShceemaModel.findOneAndUpdate(
//       { id }, 
//       { isDeleted: true }, 
//       { new: true, session }
//     );

//     if (!deletefaculty) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty');
//     }

//     // Corrected: Use findOneAndUpdate for User as well
//     const deletedUser = await User.findOneAndUpdate(
//       { id }, 
//       { isDeleted: true }, 
//       { new: true, session }
//     );

//     if (!deletedUser) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
//     }

//     await session.commitTransaction();
//     await session.endSession();
//     return deletefaculty;
//   } catch (err) {
//     await session.abortTransaction();
//     await session.endSession();
//     console.log(err);
//     // throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'An error occurred');
//   }
// };

export const AdminServices = {
 
    getAllAdminsfromDB,
    getsingleAdminfromDB 
//   deleteStudentFromDB ,
//   UpdatedStudentFromDB
};