import mongoose, { Schema } from 'mongoose';
import { SemesterRegistrationStatus } from './semiRegi.constant';
import { TSemesterRegi } from './SemisterRegi.interface';


const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegi>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'AcademicSem',
    },
    status: {
      type: String,
      enum: SemesterRegistrationStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
);

export const SemesterRegiModel = mongoose.model<TSemesterRegi>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);