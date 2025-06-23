import express, { RequestHandler, NextFunction } from 'express';
import { suspendStudentByEmail } from '../services/studentService';
import { registerStudentsToTeacher, getCommonStudents } from '../services/userService';
import { StatusCodes } from 'http-status-codes';

const UserController = express.Router();

/**
 * Register students under a teacher.
 * Expects: { "teacher": string, "students": string[] }
 * Returns: 204 No Content on success
 */
const registerStudents: RequestHandler = async (req, res, next: NextFunction) => {
  const { teacher, students } = req.body;

  // Validate request body
  if (!teacher || !Array.isArray(students) || students.length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid request body' });
  }

  try {
    await registerStudentsToTeacher(teacher, students);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (err: unknown) {
    next(err);
  }
};

/**
 * Retrieve students common to one or more teachers.
 * Expects query param: teacher=email1&teacher=email2
 * Returns: { "students": string[] }
 */
const retrieveCommonStudents: RequestHandler = async (req, res, next: NextFunction) => {
  const teacherQuery = req.query.teacher;

  // Validate query param
  if (!teacherQuery) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'At least one teacher email is required' });
  }

  const teacherEmails  = Array.isArray(teacherQuery) ? teacherQuery : [teacherQuery];
  if (teacherEmails .length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'At least one valid teacher email is required' });
  }

  try {
    const students = await getCommonStudents(teacherEmails as string[]);
    return res.status(StatusCodes.OK).json({ students });
  } catch (err: unknown) {
    next(err);
  }
};

/**
 * Suspend a student by email.
 * Expects: { "student": string }
 * Returns: 204 No Content on success
 */
const suspendStudent: RequestHandler = async (req, res, next: NextFunction) => {
  const { student } = req.body;

  // Validate input
  if (!student || typeof student !== 'string') {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid student email' });
  }

  try {
    await suspendStudentByEmail(student);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (err: unknown) {
    next(err);
  }
}

// Register routes
UserController.post('/register', registerStudents);
UserController.get('/commonStudents', retrieveCommonStudents);
UserController.post('/suspend', suspendStudent);

export default UserController;
