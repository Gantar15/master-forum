import { Result } from "./Result";
import { UseCaseError } from "./UseCaseError";

export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError> {
    public constructor(err: any) {
      super(false, {
        message: `An unexpected error occurred.`,
        error: err,
      } as UseCaseError);
      console.log(`[AppError]: An unexpected error occurred`);
      console.error(err);
    }

    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }

  export class MessageError extends Result<UseCaseError> {
    public constructor(message: any, err?: any) {
      super(false, {
        message: message,
        error: err || new Error(message),
      } as UseCaseError);
      console.log(`[AppError]: ${message}`);
      console.error(err);
    }

    public static create(message: any, err?: any): UnexpectedError {
      return new MessageError(message, err);
    }
  }
}
