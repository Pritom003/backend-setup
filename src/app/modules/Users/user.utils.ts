// year semesterCode 4digit number

import { TAcademicSem } from '../AcademicSem/AcademicSem.interface';
import { User } from './user.models';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const genarateStudentId = async (payload: TAcademicSem) => {
  let currentId = (0).toString(); //0000
  const lastStudentID = await findLastStudentId();
  const lastSamCode = lastStudentID?.substring(4, 6);
  const lastsemisYear = lastStudentID?.substring(0, 4);
  const currentCode = payload.code;
  const currentYear = payload.year;
  if (
    lastStudentID &&
    lastSamCode === currentCode &&
    lastsemisYear === currentYear
  ) {
    currentId=lastStudentID.substring(6)
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id;
};

// Generate a new unique faculty ID
export const generateFacultyID = async (): Promise<string> => {
  // Get the last faculty ID
  const lastFacultyID = await findLastFacultyId();

  let currentId = 'F-0000'; // Default initial ID if no faculty exists yet

  if (lastFacultyID) {
    // Increment the numeric part of the last ID
    const lastNumericPart = parseInt(lastFacultyID.split('-')[1], 10);
    const newNumericPart = lastNumericPart + 1;

    // Format the numeric part to 4 digits with leading zeros
    const formattedNumericPart = newNumericPart.toString().padStart(4, '0');

    // Generate the new ID
    currentId = `F-${formattedNumericPart}`;
  }

  return currentId;
};