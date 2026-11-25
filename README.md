# Status

**! ACTIVE DEVELOPMENT !**

# Purpose

Backend Service Frame.  
*(Based on express JS)*

**Features:**
- lightweight *(as express JS itself)*
- reusable routes abstraction
- returnable http response (from route handler)

# Quick Start

Install
```shell
pnpm install @sepo27/servicio

# MIND to install peer dependencies as well (i.e. Express JS) !
```

Use
```typescript
import { Route, servicio, HttpStatus, SuccessResponse } from '@sepo27/servicio';

const app = servicio();

const fooRoute = new Route('GET /foo', () => {
  return new SuccessResponse({
    status: HttpStatus.OK,
    body: {
      ok: true,
    },
  });
});

app.addRoute(fooRoute);

app.listen(3000, () => {
  console.log('=== Servicio listening on port 3000');
});
```

# Usage

## Express JS wrapper

`servicio()` factory returns an object which is a combined instance of `Express` and `ServicioApp` classes.  
So all express functionality is preserved as is.

## Http Meta

A library (exported from `servicio` itself) exposing HTTP meta interfaces (HTTP method, status codes, response classes etc).  
See respective Typescript definitions.

## Error handling

[Express error handling](https://expressjs.com/en/5x/guide/error-handling/) is supported out of the box.  
Also, `HttpError` and its derivative classes can be used to quickly throw respective errors from handlers (see `BadRequestError`, etc (re)exports from `http-meta` library).  
If instance of `HttpError` is thrown with optional `headers` it will be caught & handled by [express default error handler](https://expressjs.com/en/5x/guide/error-handling/#the-default-error-handler).  
However, body isn't handled by default.  
Use servicio default error handler instead to fully support `HttpError`s:
```typescript
const app = servicio();

// Add routes here ...

app.useErrorHandler();
```

**(i) `useErrorHandler()` has to be called at the end same way as any other express error handler.**  

**(i) Servicio default error handler does not pass through !  
So any error (and in-fact other) handler used below `useErrorHandler()` won't be called.  
(Neither will default express error handler).  
(This behavior might be changed in the future should the need come)**
