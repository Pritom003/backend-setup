import { model, Schema } from "mongoose";
import { TAcademicSem } from "./AcademicSem.interface";
import { AcademicSemCode, AcademicSemName, Months } from "./AcademicSem.const";



const AcademicSemSchema = new Schema<TAcademicSem>(
  {
    name: {
      type: String,
      enum:AcademicSemName, // Correct enum type for name
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemCode,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);



AcademicSemSchema.pre('save', async function (next) {
    const isSemesterExists = await AcademicSem.findOne({
      year: this.year,
      name: this.name,
    });
  
    if (isSemesterExists) {
      throw new Error('Semester is already exists !');
    }
    next();
  });
const AcademicSem= model<TAcademicSem>('AcademicSem',AcademicSemSchema)
export default AcademicSem;
