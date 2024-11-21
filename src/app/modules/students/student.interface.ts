// import { Schema, model, connect } from 'mongoose';

export type Guadian = {
  fatherName: string;
  motherName: string;
  fathercontact: string;
  fatheroccupation: string;
};
export type LocalGuadian = {
  Name: string;
  contact: string;
  Occupation: string;
  address: string;
};
export type Name = {
  firstname: string;
  middleName: string;
  lastName: string;
};

export type Student = {
  id: string;
  name: Name;
  gender: 'male' | 'female';
  DateOfBirth: string;
  email: string;
  contactNo: string;
  BloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presendAddress: string;
  guardian: Guadian;
  Localguardian: LocalGuadian;
  ProfileImage?: string;
  isActive: 'active' | 'inActive';
};
