export type ErrorName =
  | 'GeneralError'
  | 'NetworkError'
  | 'ServerError'
  | 'ApplicationError'
  | 'InvalidJsonError'
  | 'UnknownError';

export type ErrorMessage = string;

export type ErrorStatus = number;

export type ErrorObject = Record<string, unknown>;

interface IGeneralError {
  errorName: ErrorName;
  errorMessage: ErrorMessage;
  errorStatusCode: ErrorStatus;
  errorObject: ErrorObject;
  message?: ErrorMessage;
  status?: ErrorStatus;
  originalError: GeneralError | Error;
}

class GeneralError extends Error implements IGeneralError {
  errorName: ErrorName;

  errorMessage: ErrorMessage;

  errorStatusCode: ErrorStatus;

  errorObject: ErrorObject;

  originalError: GeneralError | Error;

  constructor(
    errorName: ErrorName,
    message: ErrorMessage,
    statusCode?: ErrorStatus,
    errorObject?: ErrorObject,
    originalError?: GeneralError | Error
  ) {
    super(message);
    this.errorName = errorName || 'UnknownError';
    this.errorMessage = message;
    this.errorStatusCode = statusCode || 0;
    this.errorObject = errorObject || {};
    this.originalError = originalError || Error();
  }
}

export { GeneralError };
export type { IGeneralError };
