import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export namespace LoginUseCaseErrors {
  export class UserNameDoesntExistError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Username or password incorrect.`,
      } as UseCaseError);
    }
  }

  export class PasswordDoesntMatchError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Password doesnt match error.`,
      } as UseCaseError);
    }
  }

  export class UserWasDeletedError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Sorry, but this user was deleted.`,
      } as UseCaseError);
    }
  }

  export class UserWasBannedError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Sorry, but this user was banned.`,
      } as UseCaseError);
    }
  }

  export class NotVerifiedEmailError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Sorry, but you need to confirm your email in order to log in.`,
      } as UseCaseError);
    }
  }
}
