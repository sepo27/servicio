import express from 'express';
import { HttpError } from '../lib/http-meta/index.js';

/**
 * Default error handler to send errors from HttpError instances.
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
export const errorHandler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof HttpError) {
    if (err.headers) {
      res.set(err.headers);
    }

    const sendArgs = err.body ? [err.body] : [];

    res.status(err.status).send(...sendArgs);
  } else {
    next(err);
  }
};
