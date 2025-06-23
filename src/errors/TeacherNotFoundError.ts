import ErrorBase from './ErrorBase';
import { StatusCodes } from 'http-status-codes';
import ErrorCodes from '../const/ErrorCodes';

export default class TeacherNotFoundError extends ErrorBase {
  constructor() {
    super('Teacher not found', ErrorCodes.TEACHER_NOT_FOUND, StatusCodes.NOT_FOUND);
  }
}
