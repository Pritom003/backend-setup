import { Schema, model } from 'mongoose';
import { Name, TStudent, Guadian, LocalGuadian } from './student.interface';
import validator from 'validator';
const StudentNameScheema = new Schema<Name>({
  firstname: { type: String, required: [true, 'First name is required'] },
  middleName: { type: String },
  lastName: { type: String, required: [true, 'Last name is required'] },
});

const GuadianScheema = new Schema<Guadian>({
  fatherName: { type: String, 
    required:[true, 'Father\'s name is required'],
 maxlength:[20,'name should be less than 20 character'],
 validate: {
    validator: function (value: string) {
      const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
      return capitalized === value;
    },
    message: '{VALUE} is not in capitalized format',
  },
},
  motherName: { type: String, required: [true, 'Mother\'s name is required'] },
  fathercontact: { type: String, required: [true, 'Father\'s contact number is required'] },
  fatheroccupation: { type: String, required: [true, 'Father\'s occupation is required'] },
});

const LocalGuadianScheema = new Schema<LocalGuadian>({
  Name: { type: String, required: [true, 'Local guardian\'s name is required'] },
  contact: { type: String, required: [true, 'Local guardian\'s contact number is required'] },
  Occupation: { type: String, required: [true, 'Local guardian\'s occupation is required'] },
  address: { type: String, required: [true, 'Local guardian\'s address is required'] },
});

const StudenSchema = new Schema<TStudent>({
  id: { type: String, required: [true, 'Student ID is required'], unique: true },
  name: {
    type: StudentNameScheema,
    required: [true, 'Student name is required'],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'others'],
  },
  DateOfBirth: { type: String, required: [true, 'Date of birth is required'] },
  email: { type: String,
     required: [true, 'Email address is required'],
      unique: true,
    validate:{
        validator: (value :string )=> validator.isEmail(value),
        message: '{VALUE} is not a valid email'
    }
    },
  contactNo: { type: String, required: [true, 'Contact number is required'] },
  presendAddress: { type: String, required: [true, 'Present address is required'] },
  guardian: {
    type: GuadianScheema,
    required: [true, 'Guardian details are required'],
  },
  BloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group',
    },
    required: [true, 'Blood group is required'],
  },
  isActive: {
    type: String,
    enum: ['active', 'inActive'],
    default: 'active',
  },
  Localguardian: {
    type: LocalGuadianScheema,
    required: [true, 'Local guardian details are required'],
  },
  ProfileImage: { type: String, required: [true, 'Profile image is required'] },
});
// c
const studentModel = model<TStudent>('student', StudenSchema);
export default studentModel;
