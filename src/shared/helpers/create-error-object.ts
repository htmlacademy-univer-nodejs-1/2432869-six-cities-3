import { ApplicationError, ValidationErrorField } from '../../rest';

export function createErrorObject(errorType: ApplicationError, error: string, details: ValidationErrorField[] = []) {
  return { errorType, error, details };
}
