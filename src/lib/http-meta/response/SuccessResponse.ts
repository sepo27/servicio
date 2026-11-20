import { DefaultHttpResponseBody, HttpHeaders } from './types.js';
import { HttpStatus } from './httpStatus.js';
import { HttpResponse } from './HttpResponse.js';
import { isObj } from '../../common/isType.js';

type Params<B = DefaultHttpResponseBody> = [] | [HttpStatus] | [HttpResponse<B>];

const DEFAULT_STATUS = HttpStatus.OK;

export class SuccessResponse<B = DefaultHttpResponseBody> implements HttpResponse<B> {
  constructor(...args: Params<B>) {
    const { status, headers, body } = extractArgs(args);
    this.status = status;
    this.headers = headers;
    this.body = body;
  }

  public readonly status: HttpStatus = HttpStatus.OK;
  public readonly headers?: HttpHeaders;
  public readonly body?: B;
}

/*** Private ***/

function extractArgs<B>(args: Params<B>) {
  let status: HttpStatus, headers, body;

  if (args.length === 0) {
    status = DEFAULT_STATUS;
  } else if (args.length === 1 && Number.isInteger(args[0])) {
    status = args[0] as HttpStatus;
  } else if (args.length === 1 && isObj(args[0])) {
    ({ status, headers, body } = args[0] as HttpResponse<B>);
  } else {
    throw new Error(`Invalid '${SuccessResponse.name}' args`);
  }

  return { status, headers, body };
}
