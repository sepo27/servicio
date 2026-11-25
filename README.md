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



