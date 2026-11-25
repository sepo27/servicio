import supertest from 'supertest';
import { servicio } from './servicio.js';
import { Servicio } from './types.js';
import { Route } from './Route.js';
import { BadRequestError, HttpStatus, SuccessResponse, InternalServerError } from '../lib/http-meta/index.js';

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

  it('handles http error with status by default (w/ express default handler)', async () => {
    const
      error = new BadRequestError(),
      route = new Route('GET /xyz', () => {
        throw error;
      });

    app.addRoute(route);

    await agent.get('/xyz').expect(error.status);
  });

  it('handles http error with status by error handler', async () => {
    const
      error = new InternalServerError(),
      route = new Route('GET /xyz', () => {
        throw error;
      });

    app.addRoute(route).useErrorHandler();

    await agent.get('/xyz').expect(error.status);
  });

  it('handles http error with status and body by error handler', async () => {
    const
      error = new BadRequestError({
        body: { message: 'Test error occurred' },
      }),
      route = new Route('GET /baz', () => {
        throw error;
      });

    app.addRoute(route).useErrorHandler();

    await agent
      .get('/baz')
      .expect(error.status)
      .expect(res => {
        expect(res.body).toEqual(error.body);
      });
  });
});
