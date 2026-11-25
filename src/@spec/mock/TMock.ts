import express from 'express';

type ExpressRequestMock = express.Request & {};

type ExpressResponseMock = express.Response & {
  status: jest.Mock;
  set: jest.Mock;
  send: jest.Mock;
};

interface ExpressMock {
  get req(): ExpressRequestMock
  get res(): ExpressResponseMock
  get next(): express.NextFunction
}

export class TMock {
  /*** Public ***/

  public get express(): ExpressMock {
    const tmock = this;

    return {
      get req(): ExpressRequestMock {
        return {} as unknown as ExpressRequestMock;
      },
      get res(): ExpressResponseMock {
        return {
          status: jest.fn().mockReturnThis(),
          set: jest.fn().mockReturnThis(),
          send: jest.fn().mockReturnThis(),
        } as unknown as ExpressResponseMock;
      },
      get next(): express.NextFunction {
        return tmock.getMock('express.next', () => jest.fn());
      },
    };
  }

  public reset() {
    this.mockCache = {};
    jest.resetAllMocks();
  }

  /*** Private ***/

  private mockCache: Record<string, jest.Mock> = {};

  private getMock(key: string, factory: () => jest.Mock): jest.Mock {
    if (key in this.mockCache) {
      return this.mockCache[key];
    }

    const mock = factory();
    this.mockCache[key] = mock;

    return mock;
  }
}
