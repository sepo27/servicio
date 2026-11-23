import express from 'express';
import { ServicioApp } from './ServicioApp.js';
import { Servicio } from './types.js';

type AnyRecord = Record<string | symbol, any>;

export const servicio = (): Servicio => {
  const expressApp = express();
  const servicio = new ServicioApp(expressApp);
  return makeServicioAppProxy(expressApp, servicio);
};

/*** Private ***/

function makeServicioAppProxy(expressApp: express.Express, servicioApp: ServicioApp): Servicio {
  const expressRecord = expressApp as unknown as AnyRecord;
  const servicioRecord = servicioApp as unknown as AnyRecord;

  return new Proxy(expressApp, {
    get(_, prop) {
      if (prop in servicioRecord) {
        const value = servicioRecord[prop];
        // Bind methods to the target instance so they have access to `this`
        if (typeof value === 'function') {
          return value.bind(servicioApp);
        }
        return value;
      }

      // Otherwise, pass through to the Express application
      const value = expressRecord[prop];
      return typeof value === 'function' ? value.bind(expressApp) : value;
    },

    set(_, prop, value) {
      // If the property exists on the ServicioApp instance, set it there
      if (prop in servicioRecord) {
        servicioRecord[prop] = value;
        return true;
      }

      // Otherwise, pass through to the Express application
      expressRecord[prop] = value;
      return true;
    },

    has(_, prop) {
      // Check both the Servicio instance and the Express application
      return prop in servicioRecord || prop in expressRecord;
    },
  }) as unknown as Servicio;
}
