import { TAcademicFaculty } from "./AcademicFaculty.interface";
import { AcademicFacultymodel } from "./AcademicFaculty.models";


const createAcademicFacultyToDB=async(payload:TAcademicFaculty)=>{
  
const result =await AcademicFacultymodel.create(payload);
return result

}


const getAllAcademicFacultiesfromDB = async () => {
    const result = await AcademicFacultymodel.find();
    return result;
  };
  const getsingleAcademicFacultyfromDB = async (AcademicFacultyId: string) => {
    const result = await AcademicFacultymodel.findOne({ AcademicFacultyId });
    return result;
  };

  const updateAcademicFacultyIntoDB = async (
   AcademicFacultyId: string,
    payload: Partial<TAcademicFaculty>,
  ) => {
  
    const result = await AcademicFacultymodel.findOneAndUpdate({ _id: AcademicFacultyId }, payload, {
      new: true,
    });
    return result;
  };
export const AcademicFacultyService={
    createAcademicFacultyToDB,
    getAllAcademicFacultiesfromDB,
    getsingleAcademicFacultyfromDB,
    updateAcademicFacultyIntoDB
}