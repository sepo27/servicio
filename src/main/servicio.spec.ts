import supertest from 'supertest';
import { servicio } from './servicio.js';
import { Servicio } from './types.js';
import { Route } from './Route.js';
import { BadRequestError, HttpStatus, SuccessResponse } from '../lib/http-meta/index.js';

describe('servicio', () => {
  let app: Servicio, agent: supertest.Agent;

  beforeEach(() => {
    app = servicio();
    agent = supertest.agent(app);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('handles simple express like native route', async () => {
    app.get('/foo', (req, res) => {
      res.status(200).send();
    });

    await agent.get('/foo').expect(200);
  });

  it('handles simple route', async () => {
    const response = new SuccessResponse({
      status: HttpStatus.OK,
      body: {
        mary: 'Had a little lamb',
      },
    });
    const route = new Route('GET /abc', () => response);

    app.addRoute(route);

    await agent
      .get('/abc')
      .expect(HttpStatus.OK)
      .expect(res => {
        expect(res.body).toEqual(response.body);
      });
  });

  it('handles simple response error', async () => {
    const error = new BadRequestError(),
      route = new Route('GET /xyz', () => {
        throw error;
      });

    app.addRoute(route);

    await agent.get('/xyz').expect(error.status);
  });

  xit('handles response error with body', async () => {
    const error = new BadRequestError({
        body: { message: 'Test error occurred' },
      }),
      route = new Route('GET /baz', () => {
        throw error;
      });

    app.addRoute(route);

    // @ts-ignore
    app.use((err, req, res, next) => {
      console.log('=== err', err);
      return next(err);
    });

    await agent
      .get('/baz')
      .expect(error.status)
      .expect(res => {
        expect(res.body).toEqual(error.body);
      });
  });
});
