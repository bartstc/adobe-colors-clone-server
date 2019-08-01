import { ValidationError } from '../types/error.types';

export class ValidationException extends Error {
  constructor(
    public status: number,
    public message: string,
    public errorFields: ValidationError[]
  ) {
    super(message);
    this.errorFields = errorFields;
  }
}
