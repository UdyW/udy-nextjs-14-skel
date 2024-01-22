import { services } from '@/app/server/services';
import { Request, Response } from 'express';

import { errorHandler } from '@/app/server/middleware/errorHandler';
import { GeneralError } from '@/app/server/lib/createError';

jest.mock('node-fetch', () => jest.fn());
describe('server/middleware/errorHandler', () => {
  const req = {} as Request;

  const res = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;

  const input: Array<GeneralError> = [
    {
      errorName: 'NetworkError',
      status: 403,
      errorMessage: 'Some networking error',
      errorObject: { foo: 'bar' },
    } as any,
    {
      errorName: 'ServerError',
      status: 503,
      errorMessage: 'Some server error',
      errorObject: { foo: 'bar' },
    },
    {
      errorName: 'InvalidJsonError',
      status: 400,
      errorMessage: 'Some JSON error',
      errorObject: { foo: 'bar' },
    },
    {
      errorName: 'GeneralError',
      status: 404,
      errorMessage: 'Some general error',
      errorObject: { foo: 'bar' },
    },
    {
      errorName: 'ApplicationError',
      status: 401,
      errorMessage: 'Some application error',
      errorObject: { foo: 'bar' },
    },
    {
      errorName: 'UnknownError',
      status: 418,
      errorMessage: 'Some unknown error',
      errorObject: { foo: 'bar' },
    },
  ];

  const mockedReq = jest.mocked(req);
  const mockedRes = jest.mocked(res);

  mockedRes.status.mockReturnValue(res);
  const next = jest.fn();

  test('the response has a status', () => {
    errorHandler(input[0], mockedReq, mockedRes, next);
    expect(mockedRes.status).toHaveBeenCalled();
  });

  test('the response has returned json for NetWorkError', () => {
    errorHandler(input[0], mockedReq, mockedRes, next);
    expect(mockedRes.json).toHaveBeenCalled();
    expect(mockedRes.status).toHaveBeenCalledWith(403);
    expect(mockedRes.json).toHaveBeenCalledWith({
      error: 'Some networking error',
      errorResponse: { foo: 'bar' },
      name: 'NetworkError',
    });
  });

  test('the response has returned json for ServerError', () => {
    errorHandler(input[1], mockedReq, res, next);
    expect(res.json).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Some server error',
      errorResponse: { foo: 'bar' },
      name: 'ServerError',
    });
  });

  test('the response has returned json for InvalidJsonError', () => {
    errorHandler(input[2], mockedReq, mockedRes, next);
    expect(mockedRes.json).toHaveBeenCalled();
    expect(mockedRes.status).toHaveBeenCalledWith(400);
    expect(mockedRes.json).toHaveBeenCalledWith({
      error: 'Some JSON error',
      errorResponse: { foo: 'bar' },
      name: 'InvalidJsonError',
    });
  });

  test('the response has returned json for GeneralError', () => {
    errorHandler(input[3], mockedReq, mockedRes, next);
    expect(mockedRes.json).toHaveBeenCalled();
    expect(mockedRes.status).toHaveBeenCalledWith(404);
    expect(mockedRes.json).toHaveBeenCalledWith({
      error: 'Some general error',
      errorResponse: { foo: 'bar' },
      name: 'GeneralError',
    });
  });

  test('the response has returned json for ApplicationError', () => {
    errorHandler(input[4], mockedReq, mockedRes, next);
    expect(mockedRes.json).toHaveBeenCalled();
    expect(mockedRes.status).toHaveBeenCalledWith(401);
    expect(mockedRes.json).toHaveBeenCalledWith({
      name: 'ApplicationError',
      error: 'Some application error',
      errorResponse: {
        code: 'APPLICATION_ERROR',
        description: 'Sorry there has been an error',
      },
    });
  });

  test('the response has returned json for UnknownError', () => {
    errorHandler(input[5], mockedReq, mockedRes, next);
    expect(mockedRes.json).toHaveBeenCalled();
    expect(mockedRes.status).toHaveBeenCalledWith(418);
    expect(mockedRes.json).toHaveBeenCalledWith({
      error: 'Some unknown error',
      errorResponse: { foo: 'bar' },
      name: 'UnknownError',
    });
  });
});
