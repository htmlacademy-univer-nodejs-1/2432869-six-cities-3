import { HttpError } from '../../../../rest/errors';

export class BaseUserException extends HttpError {
  constructor(httpStatusCode: number, message: string) {
    super(httpStatusCode, message);
  }
}
