# Purpose

Backend Service Frame.  
*(Based on express JS)*

**Features:**
- lightweight *(as express JS itself)*
- reusable routes abstraction
- returnable http response (from route handler)

# Quick Start

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







