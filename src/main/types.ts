import express from 'express';
import { HttpMethod, HttpResponse } from '../lib/http-meta/index.js';
import { ExpressPathParams } from '../lib/express/types.js';
import { ServicioApp } from './ServicioApp.js';

export type Servicio = ServicioApp & express.Express;

export interface Request extends express.Request {}

export type RouteEndpointStruct = {
  method: HttpMethod
  path: ExpressPathParams
};

export type RouteEndpoint = string | RouteEndpointStruct;

export type RouteHandler = (req: Request) => HttpResponse | Promise<HttpResponse>;
