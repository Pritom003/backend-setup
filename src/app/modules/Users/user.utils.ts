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
  const lastSamCode = lastStudentID?.substring(5, 6);
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
