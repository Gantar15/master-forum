import { Result } from "../../../../../shared/core/Result";
import { UseCaseError } from "../../../../../shared/core/UseCaseError";

export namespace DeletePostErrors {
  export class PostNotFoundError extends Result<UseCaseError> {
    constructor(id: string) {
      super(false, {
        message: `Couldn't find a post by id {${id}}.`,
      } as UseCaseError);
    }
  }

  export class ForbiddenError extends Result<UseCaseError> {
    constructor(id: string) {
      super(false, {
        message: `You are not allowed to delete ${id} post.`,
      } as UseCaseError);
    }
  }
}
