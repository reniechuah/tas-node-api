import ErrorBase from './ErrorBase';
import { StatusCodes } from 'http-status-codes';
import ErrorCodes from '../const/ErrorCodes';

export default class TeacherNotFoundError extends ErrorBase {
  constructor() {
    super('Student not found', ErrorCodes.STUDENT_NOT_FOUND, StatusCodes.NOT_FOUND);
  }
}
