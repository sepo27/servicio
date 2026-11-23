import express from 'express';

type ExpressResponseMock = express.Response & {
  status: jest.Mock;
  set: jest.Mock;
  send: jest.Mock;
};

export const expressResponseMock = (): ExpressResponseMock => ({
  status: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
}) as unknown as ExpressResponseMock;
