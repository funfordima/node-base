export class CustomValidationError extends Error {
  constructor(message = 'Operation failed') {
    super(message);
    this.name = 'Validation Error';
    Error.captureStackTrace(this, CustomValidationError);
  }
}
