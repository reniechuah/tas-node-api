import express, { RequestHandler } from 'express';
import { suspendStudentByEmail } from '../services/studentService';
import { registerStudentsToTeacher, getCommonStudents } from '../services/userService';

const UserController = express.Router();

const registerStudents: RequestHandler = async (req, res) => {
  const { teacher, students } = req.body;

  if (!teacher || !Array.isArray(students) || students.length === 0) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    await registerStudentsToTeacher(teacher, students);
    return res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Unknown error occurred' });
  }
};

const retrieveCommonStudents: RequestHandler = async (req, res) => {
  const teacherQuery = req.query.teacher;
  if (!teacherQuery) {
    return res
      .status(400)
      .json({ error: 'At least one teacher email is required' });
  }

  const teacherEmails  = Array.isArray(teacherQuery) ? teacherQuery : [teacherQuery];
  if (teacherEmails .length === 0) {
    return res.status(400).json({ error: 'At least one valid teacher email is required' });
  }

  try {
    const students = await getCommonStudents(teacherEmails as string[]);
    return res.status(200).json({ students }); 
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Unknown error occurred' });
  }
};

const suspendStudent: RequestHandler = async (req, res) => {
  const { student } = req.body;
  if (!student || typeof student !== 'string') {
    return res.status(400).json({ error: 'Invalid student email' });
  }

  try {
    await suspendStudentByEmail(student);
    return res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Unknown error occurred' });
  }
}

UserController.post('/register', registerStudents);
UserController.get('/commonStudents', retrieveCommonStudents);
UserController.post('/suspend', suspendStudent);

export default UserController;
