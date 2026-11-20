import { HttpStatus } from './httpStatus.js';
import { HttpHeaders, DefaultHttpResponseBody } from './types.js';

export interface HttpResponse<B = DefaultHttpResponseBody> {
  readonly status: HttpStatus
  readonly headers?: HttpHeaders
  readonly body?: B
}
