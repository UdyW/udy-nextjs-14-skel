import { NextFunction, Request, Response } from 'express';

const DEFAULT_NAME = 'OtherError';
const DEFAULT_MESSAGE = 'Sorry there has been an error';
const APPLICATION_ERROR_RESPONSE = {
  code: 'APPLICATION_ERROR',
  description: DEFAULT_MESSAGE,
};

const isApplicationError = (err: any) => err.errorName === 'ApplicationError';

const getStatusCode = (err: any) => err.status ?? 500;

const getErrorResponse = (err: any) => ({
  name: err.errorName ?? DEFAULT_NAME,
  error: err.errorMessage ?? DEFAULT_MESSAGE,
  errorResponse:
    (isApplicationError(err) ? APPLICATION_ERROR_RESPONSE : err.errorObject) ??
    err.message,
});

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(getStatusCode(err)).json(getErrorResponse(err));
};

export { errorHandler };
