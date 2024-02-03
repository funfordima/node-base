export class CustomValidationError extends Error {
  constructor(message = 'Operation failed\r\n') {
    super(message);
    this.name = 'Validation Error';
    Error.captureStackTrace(this, CustomValidationError);
  }
}
