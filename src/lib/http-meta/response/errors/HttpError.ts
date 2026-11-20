import { HttpResponse } from '../HttpResponse.js';
import { DefaultHttpResponseBody, HttpHeaders } from '../types.js';
import { HttpErrorStatus, httpStatusText } from '../httpStatus.js';
import { LooseObject } from '../../../common/types.js';

export interface HttpErrorOpts<B = any> {
  headers?: LooseObject
  body?: B
  message?: string
}

export class HttpError<B = DefaultHttpResponseBody> extends Error implements HttpResponse<B> {
  constructor(status: HttpErrorStatus, opts: HttpErrorOpts<B> = {}) {
    super(makeMessage(status, opts));

    // Set the prototype explicitly
    Object.setPrototypeOf(this, HttpError.prototype);
    // this.name = HttpError.name; // TODO: not needed (name derived via prototype) ?

    this.status = status;
    this.headers = opts.headers;
    this.body = opts.body;
  }

  public readonly status: HttpErrorStatus;
  public readonly headers?: HttpHeaders;
  public readonly body?: B;
}

/*** Private ***/

function makeMessage(status: HttpErrorStatus, opts: HttpErrorOpts): string {
  const msg = [`[${status} ${httpStatusText(status)}]`];

  if (opts.message) {
    msg.push(`${opts.message}`);
  }

  return msg.join(' ');
}
