import { academicSemNameCodeMapper } from "./AcademicSem.const";
import { TAcademicSem } from "./AcademicSem.interface";
import AcademicSem from "./AcademicSem.models";

const createAcademicSemToDB=async(payload:TAcademicSem)=>{
    if (academicSemNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code');
      }
const result =await AcademicSem.create(payload);
return result

}


const getAllAcademicSemfromDB = async () => {
    const result = await AcademicSem.find();
    return result;
  };
  const getsingleAcademicSemfromDB = async (AcademicSemId: string) => {
    const result = await AcademicSem.findOne({ AcademicSemId });
    return result;
  };

  const updateAcademicSemIntoDB = async (
   AcademicSemId: string,
    payload: Partial<TAcademicSem>,
  ) => {
    if (
      payload.name &&
      payload.code &&
      academicSemNameCodeMapper[payload.name] !== payload.code
    ) {
      throw new Error('Invalid Semester Code');
    }
  
    const result = await AcademicSem.findOneAndUpdate({ _id: AcademicSemId }, payload, {
      new: true,
    });
    return result;
  };
export const AcademicsemService={
    createAcademicSemToDB,
    getAllAcademicSemfromDB,
    getsingleAcademicSemfromDB,
    updateAcademicSemIntoDB
}