import { Schema, model } from 'mongoose';
import { Name, Student, Guadian, LocalGuadian } from './student.interface';
const StudentNameScheema = new Schema<Name>({
  firstname: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});
const GuadianScheema = new Schema<Guadian>({
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  fathercontact: { type: String, required: true },
  fatheroccupation: { type: String, required: true },
});
const LocalGuadianScheema = new Schema<LocalGuadian>({
  Name: { type: String, required: true },
  contact: { type: String, required: true },
  Occupation: { type: String, required: true },
  address: { type: String, required: true },
});

const StudenSchema = new Schema<Student>({
  id: { type: String },
  name: StudentNameScheema,
  gender: {
    type: String,
    enum: ['male', 'female', 'others'],
  },
  DateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  presendAddress: { type: String, required: true },
  guardian: GuadianScheema,
  BloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  isActive: {
    type: String,
    enum: ['active', 'inActive'],
    default: 'active',
  },
  Localguardian: LocalGuadianScheema,
  ProfileImage: { type: String, required: true },
});
const studentModel = model<Student>('student', StudenSchema);
export default studentModel;
