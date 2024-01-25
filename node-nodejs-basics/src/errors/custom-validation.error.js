export class CustomValidationError extends Error {
  constructor(message = 'FS operation failed') {
    super(message);
    this.name = 'Validation Error';
    Error.captureStackTrace(this, CustomValidationError);
  }
}