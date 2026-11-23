import { RouteEndpoint, RouteEndpointStruct, RouteHandler } from './types.js';
import { isObj } from '../lib/common/isType.js';
import { HttpMethod } from '../lib/http-meta/index.js';

const
  httpMethodsList = Object.values(HttpMethod).join('|'),
  stringEndpointPattern = new RegExp(`^(${httpMethodsList})\\s(/.*)$`);

export class Route {
  constructor(endpoint: RouteEndpoint, handler: RouteHandler) {
    this.endpoint = this.parseEndpoint(endpoint);
    this.handler = handler;
  }

  /*** Public ***/

  public readonly endpoint: RouteEndpointStruct;
  public readonly handler: RouteHandler;

  /*** Private ***/

  private parseEndpoint(endpoint: RouteEndpoint): RouteEndpointStruct {
    if (isObj(endpoint)) {
      return endpoint as RouteEndpointStruct;
    }

    const match = (endpoint as string).match(stringEndpointPattern);

    if (match) {
      const [, method, path] = match;
      return { method: method as HttpMethod, path };
    }

    throw new Error(`Invalid route endpoint: ${endpoint}`);
  }
}
