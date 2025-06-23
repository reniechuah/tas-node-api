import express, { RequestHandler, NextFunction } from 'express';
import { suspendStudentByEmail } from '../services/studentService';
import { registerStudentsToTeacher, getCommonStudents } from '../services/userService';
import { StatusCodes } from 'http-status-codes';
import validator from 'validator';
import Logger from '../config/logger';

const UserController = express.Router();
const LOG = new Logger('UserController.ts');

/**
 * Register students under a teacher.
 * Expects: { "teacher": string, "students": string[] }
 * Returns: 204 No Content on success
 */
const registerStudents: RequestHandler = async (req, res, next: NextFunction) => {
  const { teacher, students } = req.body;

  // Validate request body
  if (
    !teacher ||
    !Array.isArray(students) ||
    students.length === 0 ||
    !validator.isEmail(teacher) ||
    !students.every((email) => validator.isEmail(email))
  ) { 
    LOG.warn(`Invalid register request: teacher=${teacher}, students=${JSON.stringify(students)}`);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid request body' });
  }

  try {
    await registerStudentsToTeacher(teacher, students);
    LOG.info(`Registered students to teacher: ${teacher}`);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    LOG.error(`Error registering students to teacher ${teacher}: ${errorMessage}`);
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
  const teacherEmails  = Array.isArray(teacherQuery) ? teacherQuery : [teacherQuery];

  // Validate query param
  if (
    !teacherQuery ||
    teacherEmails.length === 0 ||
    !teacherEmails.every(email => typeof email === 'string' && validator.isEmail(email))
  ) {
    LOG.warn(`Invalid query: teacher=${JSON.stringify(teacherQuery)}`);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid teacher email(s)' });
  }

  try {
    const students = await getCommonStudents(teacherEmails as string[]);
    LOG.info(`Common students retrieved for: ${teacherEmails.join(', ')}`);
    return res.status(StatusCodes.OK).json({ students });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    LOG.error(`Error retrieving common students for ${teacherEmails.join(', ')}: ${errorMessage}`);
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
  if (!student || typeof student !== 'string' || !validator.isEmail(student)) {
    LOG.warn(`Invalid suspend request: student=${student}`);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid student email' });
  }

  try {
    await suspendStudentByEmail(student);
    LOG.info(`Student suspended: ${student}`);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    LOG.error(`Failed to suspend student ${student}: ${errorMessage}`);
    next(err);
  }
}

// Register routes
UserController.post('/register', registerStudents);
UserController.get('/commonStudents', retrieveCommonStudents);
UserController.post('/suspend', suspendStudent);

export default UserController;
