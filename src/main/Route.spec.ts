import { HttpMethod, SuccessResponse } from '../lib/http-meta/index.js';
import { RouteEndpoint, RouteEndpointStruct, RouteHandler } from './types.js';
import { Route } from './Route.js';
import { afterEach } from 'node:test';

describe('Route', () => {
  let defaultHandler: RouteHandler;

  beforeEach(() => {
    defaultHandler = () => Promise.resolve(new SuccessResponse());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('constructs with struct endpoint', () => {
    const endpoint: RouteEndpoint = { method: HttpMethod.POST, path: '/foo' },
      handler = () => Promise.resolve(new SuccessResponse()),
      route = new Route(endpoint, handler);

    expect(route.endpoint).toBe(endpoint);
    expect(route.handler).toBe(handler);
  });

  it('constructs with string endpoint (method + path format)', () => {
    const endpoint: RouteEndpoint = 'PUT /bar/:id',
      expectedEndpoint: RouteEndpointStruct = { method: HttpMethod.PUT, path: '/bar/:id' },
      handler = () => Promise.resolve(new SuccessResponse()),
      route = new Route(endpoint, handler);

    expect(route.endpoint).toEqual(expectedEndpoint);
  });

  it('errors out when incorrect endpoint string', () => {
    ['get /foo', 'POST bar', 'baz', ''].forEach(edp => {
      expect(() => new Route(edp, defaultHandler)).toThrow(new Error(`Invalid route endpoint: ${edp}`));
    });
  });
});
