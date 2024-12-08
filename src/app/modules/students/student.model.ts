import { Schema, model } from 'mongoose';
import { Name, TStudent, Guadian, LocalGuadian } from './student.interface';

const StudentNameSchema = new Schema<Name>({
  firstname: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const GuardianSchema = new Schema<Guadian>({
  fatherName: {
    type: String,
    required: true,
    maxlength: 20,
    validate: {
      validator: function (value: string) {
        const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
        return capitalized === value;
      },
    },
  },
  motherName: { type: String, required: true },
  fathercontact: { type: String, required: true },
  fatheroccupation: { type: String, required: true },
});

const LocalGuardianSchema = new Schema<LocalGuadian>({
  Name: { type: String, required: true },
  contact: { type: String, required: true },
  Occupation: { type: String, required: true },
  address: { type: String, required: true },
});

const StudentSchema = new Schema<TStudent>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  name: { type: StudentNameSchema, required: true },
  gender: { type: String, enum: ['male', 'female', 'others'] },
  DateOfBirth: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: { type: String, required: true },
  presendAddress: { type: String, required: true },
  guardian: { type: GuardianSchema, required: true },
  BloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true,
  },
  admissionSemister: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSem',
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
  },
  Localguardian: { type: LocalGuardianSchema, required: true },
  ProfileImage: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

// Virtual property for full name
StudentSchema.virtual('fullName').get(function () {
  return `${
    this.name.firstname
  } ${this.name.middleName ?? ''} ${this.name.lastName}`;
});

// Query Middleware
StudentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Custom static method
StudentSchema.statics.isUserExists = async function (id: string) {
  return await studentModel.findOne({ id });
};

const studentModel = model<TStudent>('student', StudentSchema);
export default studentModel;
