import { BadRequestError } from '../lib/http-meta/index.js';
import { TMock } from '../@spec/index.js';
import { errorHandler } from './errorHandler.js';

describe('errorHandler()', () => {
  let mock: TMock;

  beforeEach(() => {
    mock = new TMock();
  });

  afterEach(() => {
    mock.reset();
  });

  it('sends status of http error', () => {
    const err = new BadRequestError(),
      resMock = mock.express.res;

    errorHandler(err, mock.express.req, resMock, mock.express.next);

    expect(resMock.status).toHaveBeenCalledWith(err.status);
    expect(resMock.send).toHaveBeenCalledWith();
    expect(resMock.send).toHaveBeenCalledAfter(resMock.status);
    expect(mock.express.next).not.toHaveBeenCalled();
  });

  it('sends status and headers of http error', () => {
    const
      errHeaders = { 'x-app': 'test' },
      err = new BadRequestError({ headers: errHeaders }),
      resMock = mock.express.res;

    errorHandler(err, mock.express.req, resMock, mock.express.next);

    expect(resMock.set).toHaveBeenCalledWith(err.headers);
    expect(resMock.set).toHaveBeenCalledBefore(resMock.status);
    expect(resMock.status).toHaveBeenCalledWith(err.status);
    expect(resMock.send).toHaveBeenCalledWith();
    expect(resMock.send).toHaveBeenCalledAfter(resMock.status);
    expect(mock.express.next).not.toHaveBeenCalled();
  });

  it('sends status and body of http error', () => {
    const
      errBody = { error: 'Test error' },
      err = new BadRequestError({ body: errBody }),
      resMock = mock.express.res;

    errorHandler(err, mock.express.req, resMock, mock.express.next);

    expect(resMock.status).toHaveBeenCalledWith(err.status);
    expect(resMock.send).toHaveBeenCalledWith(errBody);
    expect(resMock.send).toHaveBeenCalledAfter(resMock.status);
    expect(mock.express.next).not.toHaveBeenCalled();
  });

  it('sends status, headers and body of http error', () => {
    const
      errHeaders = { 'x-app': 'test' },
      errBody = { error: 'Test error' },
      err = new BadRequestError({ headers: errHeaders, body: errBody }),
      resMock = mock.express.res;

    errorHandler(err, mock.express.req, resMock, mock.express.next);

    expect(resMock.set).toHaveBeenCalledWith(err.headers);
    expect(resMock.set).toHaveBeenCalledBefore(resMock.status);
    expect(resMock.status).toHaveBeenCalledWith(err.status);
    expect(resMock.send).toHaveBeenCalledWith(errBody);
    expect(resMock.send).toHaveBeenCalledAfter(resMock.status);
    expect(mock.express.next).not.toHaveBeenCalled();
  });

  it('passes through non-http error', () => {
    const err = new Error('Unknown test error'),
      resMock = mock.express.res;

    errorHandler(err, mock.express.req, resMock, mock.express.next);

    expect(resMock.set).not.toHaveBeenCalled();
    expect(resMock.status).not.toHaveBeenCalled();
    expect(resMock.send).not.toHaveBeenCalled();
    expect(mock.express.next).toHaveBeenCalledWith(err);
  });
});
