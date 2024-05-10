import { Result } from "../../../../../shared/core/Result";
import { UseCaseError } from "../../../../../shared/core/UseCaseError";

export namespace GetCommentsByUserErrors {
  export class UserNotFoundError extends Result<UseCaseError> {
    constructor(username: string) {
      super(false, {
        message: `Couldn't find a user {${username}}.`,
      } as UseCaseError);
    }
  }
}
