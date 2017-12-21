export class AppError extends Error {
  constructor(message: string) {
    super(`[APP]${message}`);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class AppWrappedError extends AppError {
  constructor(msg: string, public subError: Error) {
    super(`${msg}\n  > ${subError.message}`);
    Object.setPrototypeOf(this, AppWrappedError.prototype);
  }
}

export class AppInvariantError extends AppError {
  constructor(msg: string) {
    super(`[INVARIANT]: ${msg}`);
    Object.setPrototypeOf(this, AppInvariantError.prototype);
  }
}
