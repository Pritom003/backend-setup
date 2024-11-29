import { Request, Response } from 'express';
import { StudentServices } from './studen.service';
// import StudentValSchema from './student.validation';


const getAllstudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllstudentsfromDB();
    res.status(200).json({
      success: true,
      message: 'student are retrieve successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: err,
    });
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
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: err,
    });
  }
};
export const studentController = {
  // createStudent,
  getAllstudents,
  getSingletudents,
};
