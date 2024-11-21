import { Request, Response } from 'express';
import { StudentServices } from './studen.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    // data from client
    const student = req.body.student;
    // send the service
    const result = await StudentServices.createStudentoDB(student);
    // send the result to client
    res.status(200).json({
      success: true,
      message: 'student created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getAllstudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllstudentsfromDB();
    res.status(200).json({
      success: true,
      message: 'student are retrieve successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getSingletudents = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id;
    const result = await StudentServices.getsinglestudnetfromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student is retrieve successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
export const studentController = {
  createStudent,
  getAllstudents,
  getSingletudents,
};
