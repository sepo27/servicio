import { HttpError, HttpErrorOpts } from './HttpError.js';
import { DefaultHttpResponseBody } from '../types.js';
import { HttpStatus } from '../httpStatus.js';

export class BadRequestError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.BAD_REQUEST, opts);
    Object.setPrototypeOf(this, BadRequestError.prototype);
    // this.name = BadRequestError.name; // TODO: not needed (name derived via prototype) ?
  }
}

export class UnauthorizedError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.UNAUTHORIZED, opts);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class PaymentRequiredError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.PAYMENT_REQUIRED, opts);
    Object.setPrototypeOf(this, PaymentRequiredError.prototype);
  }
}

export class ForbiddenError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.FORBIDDEN, opts);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class NotFoundError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.NOT_FOUND, opts);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class MethodNotAllowedError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.METHOD_NOT_ALLOWED, opts);
    Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
  }
}

export class NotAcceptableError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.NOT_ACCEPTABLE, opts);
    Object.setPrototypeOf(this, NotAcceptableError.prototype);
  }
}

export class ProxyAuthenticationRequiredError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.PROXY_AUTHENTICATION_REQUIRED, opts);
    Object.setPrototypeOf(this, ProxyAuthenticationRequiredError.prototype);
  }
}

export class RequestTimeoutError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.REQUEST_TIMEOUT, opts);
    Object.setPrototypeOf(this, RequestTimeoutError.prototype);
  }
}

export class ConflictError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.CONFLICT, opts);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export class GoneError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.GONE, opts);
    Object.setPrototypeOf(this, GoneError.prototype);
  }
}

export class LengthRequiredError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.LENGTH_REQUIRED, opts);
    Object.setPrototypeOf(this, LengthRequiredError.prototype);
  }
}

export class PreconditionFailedError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.PRECONDITION_FAILED, opts);
    Object.setPrototypeOf(this, PreconditionFailedError.prototype);
  }
}

export class ContentTooLargeError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.CONTENT_TOO_LARGE, opts);
    Object.setPrototypeOf(this, ContentTooLargeError.prototype);
  }
}

export class UriTooLongError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.URI_TOO_LONG, opts);
    Object.setPrototypeOf(this, UriTooLongError.prototype);
  }
}

export class UnsupportedMediaTypeError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.UNSUPPORTED_MEDIA_TYPE, opts);
    Object.setPrototypeOf(this, UnsupportedMediaTypeError.prototype);
  }
}

export class RangeNotSatisfiableError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.RANGE_NOT_SATISFIABLE, opts);
    Object.setPrototypeOf(this, RangeNotSatisfiableError.prototype);
  }
}

export class ExpectationFailedError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.EXPECTATION_FAILED, opts);
    Object.setPrototypeOf(this, ExpectationFailedError.prototype);
  }
}

export class ImATeapotError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.IM_A_TEAPOT, opts);
    Object.setPrototypeOf(this, ImATeapotError.prototype);
  }
}

export class MisdirectedRequestError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.MISDIRECTED_REQUEST, opts);
    Object.setPrototypeOf(this, MisdirectedRequestError.prototype);
  }
}

export class UnprocessableContentError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.UNPROCESSABLE_CONTENT, opts);
    Object.setPrototypeOf(this, UnprocessableContentError.prototype);
  }
}

export class LockedError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.LOCKED, opts);
    Object.setPrototypeOf(this, LockedError.prototype);
  }
}

export class FailedDependencyError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.FAILED_DEPENDENCY, opts);
    Object.setPrototypeOf(this, FailedDependencyError.prototype);
  }
}

export class TooEarlyError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.TOO_EARLY, opts);
    Object.setPrototypeOf(this, TooEarlyError.prototype);
  }
}

export class UpgradeRequiredError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.UPGRADE_REQUIRED, opts);
    Object.setPrototypeOf(this, UpgradeRequiredError.prototype);
  }
}

export class PreconditionRequiredError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.PRECONDITION_REQUIRED, opts);
    Object.setPrototypeOf(this, PreconditionRequiredError.prototype);
  }
}

export class TooManyRequestsError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.TOO_MANY_REQUESTS, opts);
    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }
}

export class RequestHeaderFieldsTooLargeError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE, opts);
    Object.setPrototypeOf(this, RequestHeaderFieldsTooLargeError.prototype);
  }
}

export class UnavailableForLegalReasonsError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS, opts);
    Object.setPrototypeOf(this, UnavailableForLegalReasonsError.prototype);
  }
}

export class InternalServerError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, opts);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export class NotImplementedError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.NOT_IMPLEMENTED, opts);
    Object.setPrototypeOf(this, NotImplementedError.prototype);
  }
}

export class BadGatewayError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.BAD_GATEWAY, opts);
    Object.setPrototypeOf(this, BadGatewayError.prototype);
  }
}

export class ServiceUnavailableError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.SERVICE_UNAVAILABLE, opts);
    Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
  }
}

export class GatewayTimeoutError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.GATEWAY_TIMEOUT, opts);
    Object.setPrototypeOf(this, GatewayTimeoutError.prototype);
  }
}

export class HttpVersionNotSupportedError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.HTTP_VERSION_NOT_SUPPORTED, opts);
    Object.setPrototypeOf(this, HttpVersionNotSupportedError.prototype);
  }
}

export class VariantAlsoNegotiatesError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.VARIANT_ALSO_NEGOTIATES, opts);
    Object.setPrototypeOf(this, VariantAlsoNegotiatesError.prototype);
  }
}

export class InsufficientStorageError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.INSUFFICIENT_STORAGE, opts);
    Object.setPrototypeOf(this, InsufficientStorageError.prototype);
  }
}

export class LoopDetectedError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.LOOP_DETECTED, opts);
    Object.setPrototypeOf(this, LoopDetectedError.prototype);
  }
}

export class NotExtendedError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.NOT_EXTENDED, opts);
    Object.setPrototypeOf(this, NotExtendedError.prototype);
  }
}

export class NetworkAuthenticationRequiredError<B = DefaultHttpResponseBody> extends HttpError<B> {
  constructor(opts: HttpErrorOpts<B> = {}) {
    super(HttpStatus.NETWORK_AUTHENTICATION_REQUIRED, opts);
    Object.setPrototypeOf(this, NetworkAuthenticationRequiredError.prototype);
  }
}
