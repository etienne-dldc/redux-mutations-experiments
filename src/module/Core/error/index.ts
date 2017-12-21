export class CoreError extends Error {
  constructor(message: string) {
    super(`[CORE]${message}`);
    Object.setPrototypeOf(this, CoreError.prototype);
  }
}

export class CoreBasicError extends CoreError {
  constructor(message: string) {
    super(`: ${message}`);
    Object.setPrototypeOf(this, CoreBasicError.prototype);
  }
}

export class CoreAlreadyBooted extends CoreBasicError {
  constructor() {
    super(`: Core is already booted`);
    Object.setPrototypeOf(this, CoreAlreadyBooted.prototype);
  }
}

export class CoreReducerError extends CoreError {
  constructor(private initialError: any, private reducerKey: string = '__Core__') {
    super(`[REDUCER] : in "${reducerKey}" ${initialError.toString().split('\n')[0]}`);
    Object.setPrototypeOf(this, CoreReducerError.prototype);
  }

  getHelp(): string {
    return [
      `Reducer error : in ${this.reducerKey}`,
      `Initial Error : `,
      this.initialError.toString(),
      ``,
      `Stack : `,
      this.initialError.stack,
    ].join('\n');
  }
}

export class CoreDetectorError extends CoreError {
  constructor(private initialError: any, private detectorKey: string) {
    super(`[DETECTOR] : in "${detectorKey}" ${initialError.toString().split('\n')[0]}`);
    Object.setPrototypeOf(this, CoreDetectorError.prototype);
  }

  getHelp(): string {
    return [
      `Detector error : in ${this.detectorKey}`,
      `Initial Error : `,
      this.initialError.toString(),
      ``,
      `Stack : `,
      this.initialError.stack,
    ].join('\n');
  }
}
