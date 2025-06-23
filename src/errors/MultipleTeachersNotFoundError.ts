// errors/MultipleTeachersNotFoundError.ts
import ErrorBase from './ErrorBase';
import { StatusCodes } from 'http-status-codes';
import ErrorCodes from '../const/ErrorCodes';

export default class MultipleTeachersNotFoundError extends ErrorBase {
  constructor() {
    super('One or more teachers not found', ErrorCodes.MULTIPLE_TEACHERS_NOT_FOUND, StatusCodes.NOT_FOUND);
  }
}
