import express from 'express';
import { HttpMethod, HttpStatus, SuccessResponse } from '../lib/http-meta/index.js';
import { Route } from './Route.js';
import { ServicioApp } from './ServicioApp.js';
import { TMock } from '../@spec/index.js';
import { ExpressHttpMethod } from '../lib/express/types.js';
import * as errorHandlerModule from './errorHandler.js';

describe('ServicioApp', () => {
  let expressApp: express.Express,
    app: ServicioApp,
    mock: TMock,
    expressMethodMockMap: Record<HttpMethod, jest.Mock>;

  beforeEach(() => {
    expressApp = express();
    app = new ServicioApp(expressApp);
    mock = new TMock();

    expressMethodMockMap = Object.values(HttpMethod).reduce((acc, method) => Object.assign(acc, {
      [method]: jest.spyOn(expressApp, method.toLowerCase() as ExpressHttpMethod),
    }), {}) as Record<HttpMethod, jest.Mock>;
  });

  afterEach(() => {
    mock.reset();
  });

  it('useRoute() adds route to express app for all methods', () => {
    const paths = ['/foo', '/bar/:bar', '/abc'],
      endpoints = Object.values(HttpMethod).map(method => {
        const pathIdx = Math.floor(Math.random() * paths.length),
          endpointPath = paths[pathIdx];

        return { method, path: endpointPath };
      });

    const wrapRouteHandlerMock = mockWrapRouteHandler();

    endpoints.forEach(endpoint => {
      const route = new Route(endpoint, () => Promise.resolve(new SuccessResponse()));
      const expressMethodMock = expressMethodMockMap[endpoint.method];

      app.useRoute(route);

      expect(expressMethodMock).toHaveBeenCalledWith(route.endpoint.path, wrapRouteHandlerMock);
    });
  });

  it('useRoute() wraps route handler to send http status', async () => {
    const response = new SuccessResponse(HttpStatus.ACCEPTED),
      route = new Route('GET /foo', () => Promise.resolve(response));

    const resMock = await runRouteHandlerWrapper(route);

    expect(resMock.status).toHaveBeenCalledWith(response.status);
    expect(resMock.send).toHaveBeenCalled();
  });

  it('useRoute() wraps route handler to send http body', async () => {
    const responseBody = { foo: 'bar' },
      response = new SuccessResponse({ status: HttpStatus.OK, body: responseBody }),
      route = new Route('GET /foo', () => Promise.resolve(response));

    const resMock = await runRouteHandlerWrapper(route);

    expect(resMock.status).toHaveBeenCalledWith(response.status);
    expect(resMock.status).toHaveBeenCalledBefore(resMock.send);
    expect(resMock.send).toHaveBeenCalledWith(responseBody);
  });

  it('useRoute() wraps route handler to send http headers', async () => {
    const responseHeaders = { 'x-header': 'abc' },
      response = new SuccessResponse({ status: HttpStatus.OK, headers: responseHeaders }),
      route = new Route('GET /foo', () => Promise.resolve(response));

    const resMock = await runRouteHandlerWrapper(route);

    expect(resMock.status).toHaveBeenCalledWith(response.status);
    expect(resMock.set).toHaveBeenCalledWith(responseHeaders);
    expect(resMock.set).toHaveBeenCalledBefore(resMock.send);
    expect(resMock.send).toHaveBeenCalled();
  });

  it('useRoute() wraps route handler to send http status, body and headers', async () => {
    const responseHeaders = { 'x-header': 'abc' },
      responseBody = { ok: true },
      response = new SuccessResponse({ status: HttpStatus.OK, headers: responseHeaders, body: responseBody }),
      route = new Route('GET /foo', () => Promise.resolve(response));

    const resMock = await runRouteHandlerWrapper(route);

    expect(resMock.status).toHaveBeenCalledWith(response.status);
    expect(resMock.set).toHaveBeenCalledWith(responseHeaders);
    expect(resMock.send).toHaveBeenCalledWith(responseBody);
  });

  it('useErrorHandler() uses default error handler', () => {
    const errorHandlerMock = jest.spyOn(errorHandlerModule, 'errorHandler'),
      expressUseMock = jest.spyOn(expressApp, 'use');

    app.useErrorHandler();

    expect(expressUseMock).toHaveBeenCalledWith(errorHandlerMock);
  });

  /*** Private ***/

  function mockWrapRouteHandler(): jest.Mock {
    const mock = jest.fn();
    // @ts-ignore: Mocking private member
    jest.spyOn(app, 'wrapRouteHandler').mockReturnValue(mock);
    return mock;
  }

  async function runRouteHandlerWrapper(route: Route) {
    const expressMethodMock = jest.spyOn(expressApp, route.endpoint.method.toLowerCase() as ExpressHttpMethod);

    app.useRoute(route);

    const routeHandlerWrapper = (expressMethodMock.mock.calls[0] as unknown as [string, express.RequestHandler])[1];
    const resMock = mock.express.res;

    // @ts-ignore
    await routeHandlerWrapper(mock.express.req, resMock);

    return resMock;
  }
});
