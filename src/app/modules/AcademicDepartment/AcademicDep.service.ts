import { TAcademicDep } from "./AcademicDep.interface";
import { AcademicDepmodel } from "./AcademicDep.modules";



const createAcademicDepToDB=async(payload:TAcademicDep)=>{
  
const result =await AcademicDepmodel.create(payload);
return result

}


const getAllAcademicDepsfromDB = async () => {
    const result = await AcademicDepmodel.find().populate(
        'academicFaculty'
    );
    return result;
  };
  const getsingleAcademicDepfromDB = async (id: string) => {
    const result = await AcademicDepmodel.findOne({ _id:id }).populate(
        'academicFaculty'
    );;
    return result;
  };

  const updateAcademicDepIntoDB = async (
   AcademicDepId: string,
    payload: Partial<TAcademicDep>,
  ) => {
  
    const result = await AcademicDepmodel.findOneAndUpdate({ _id: AcademicDepId }, payload, {
      new: true,
    });
    return result;
  };
export const AcademicDepService={
    createAcademicDepToDB,
    getAllAcademicDepsfromDB,
    getsingleAcademicDepfromDB,
    updateAcademicDepIntoDB
}