import express from 'express';
import { Route } from './Route.js';
import { HttpResponse } from '../lib/http-meta/index.js';
import { RouteHandler } from './types.js';
import { errorHandler } from './errorHandler.js';

export class ServicioApp {
  constructor(private readonly _express: express.Express) {}

  /*** Public ***/

  public addRoute(route: Route): this {
    const expressMethod = route.endpoint.method.toLowerCase();
    // @ts-ignore: TODO ?
    this._express[expressMethod](route.endpoint.path, this.wrapRouteHandler(route.handler));

    return this;
  }

  public useErrorHandler(): this {
    this._express.use(errorHandler);
    return this;
  }

  /*** Private ***/

  private wrapRouteHandler(handler: RouteHandler): express.RequestHandler {
    return async (req: express.Request, res: express.Response) => {
      const handlerRes: HttpResponse = await handler(req),
        sendArgs = [];

      if (handlerRes.headers) {
        res.set(handlerRes.headers);
      }

      if (handlerRes.body) {
        sendArgs.push(handlerRes.body);
      }

      res.status(handlerRes.status).send(...sendArgs);
    };
  }
}
