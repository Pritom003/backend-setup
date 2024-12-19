

// import mongoose from "mongoose"
import QueryBuilder from "../../Builder/QueryBuilder"
import AppError from "../Errors/AppErrors";
import { SemesterRegiModel } from "../SemisterRegistration/SemisterRegi.modules";

import httpStatus from 'http-status';
// import AppError from "../Errors/AppErrors"
// import httpStatus from 'http-status';
// import CatchAsync from '../../utils/fetch.async';
import { TOfferedCourse } from './OfferedCourse.interface';
import { OfferedCourse } from './OfferedCourse.models';
import { AcademicFacultymodel } from "../AcademicFaculty/AcademicFaculty.models";
import { AcademicDepmodel } from "../AcademicDepartment/AcademicDep.modules";
import { courseModel } from "../Caurses/course.models";
import FacultyShceemaModel from '../Faculty/Faculty.models';
import { hasTimeConflict } from "./offeredCourse.utils";

const creaofferedCourseintoDB=async(payload:TOfferedCourse)=>{
    const {
        semesterRegistration,
        academicFaculty,
        academicDepartment,
        course,
        section,
        faculty,
        days,
        startTime,
        endTime,
      } = payload;
    
  //check if the semester registration id is exists!
  const isSemesterRegistrationExits =
    await SemesterRegiModel.findById(semesterRegistration);

  if (!isSemesterRegistrationExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found !',
    );
  }

  const academicSemester = isSemesterRegistrationExits.academicSemester;

  const isAcademicFacultyExits =
    await AcademicFacultymodel.findById(academicFaculty);

  if (!isAcademicFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found !');
  }

  const isAcademicDepartmentExits =
    await AcademicDepmodel.findById(academicDepartment);

  if (!isAcademicDepartmentExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found !');
  }

  const isCourseExits = await courseModel.findById(course);

  if (!isCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found !');
  }

  const isFacultyExits = await FacultyShceemaModel.findById(faculty);

  if (!isFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  // check if the department is belong to the  faculty
  const isDepartmentBelongToFaculty = await AcademicDepmodel.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExits.name} is not  belong to this ${isAcademicFacultyExits.name}`,
    );
  }

  // check if the same offered course same section in same registered semester exists

  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exist!`,
    );
  }

  // get the schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

  const result = await OfferedCourse.create({
    ...payload,
    academicSemester,
  });
    return result
}
const getAllOfferedCoursessFromDb=async(query:Record<string, unknown>)=>{
    const searchableCourse=['title','prefix','code']
    const courseQuery=new QueryBuilder(OfferedCourse.find().populate('preRequisiteCourses.course'),query)
    .search(searchableCourse)
    .filter()
    .sort()
    .paginate()
    .fields()

    
    const result=await courseQuery.modelQuery
    return result
}
const getsingleOfferedCoursesFromDb=async(id:string)=>{
    const result=await OfferedCourse.findById(id).populate('preRequisiteCourses.course')
    return result
}
const updateOfferedCourseintoDb=async(
    id: string,
    payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
  ) => {

    const { faculty, days, startTime, endTime } = payload;
  
    const isOfferedCourseExists = await OfferedCourse.findById(id);
  
    if (!isOfferedCourseExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !');
    }
  
    const isFacultyExists = await FacultyShceemaModel.findById(faculty);
  
    if (!isFacultyExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
    }
  
    const semesterRegistration = isOfferedCourseExists.semesterRegistration;
    // get the schedules of the faculties
  
  
    // Checking the status of the semester registration
    const semesterRegistrationStatus =
      await SemesterRegiModel.findById(semesterRegistration);
  
    if (semesterRegistrationStatus?.status !== 'UPCOMING') {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
      );
    }
    // check if the faculty is available at that time.
    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
      }).select('days startTime endTime');
    
      const newSchedule = {
        days,
        startTime,
        endTime,
      };
    
      if (hasTimeConflict(assignedSchedules, newSchedule)) {
        throw new AppError(
          httpStatus.CONFLICT,
          `This faculty is not available at that time ! Choose other time or day`,
        );
      }
    
      const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
        new: true,
      });
      return result

};




export const OfferedCoursesservices={
  creaofferedCourseintoDB,
    getAllOfferedCoursessFromDb,
    getsingleOfferedCoursesFromDb,
    updateOfferedCourseintoDb

}