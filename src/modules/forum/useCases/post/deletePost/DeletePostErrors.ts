import { Result } from "../../../../../shared/core/Result";
import { UseCaseError } from "../../../../../shared/core/UseCaseError";

export namespace DeletePostErrors {
  export class PostNotFoundError extends Result<UseCaseError> {
    constructor(slug: string) {
      super(false, {
        message: `Couldn't find a post by slug {${slug}}.`,
      } as UseCaseError);
    }
  }

  export class ForbiddenError extends Result<UseCaseError> {
    constructor(slug: string) {
      super(false, {
        message: `You are not allowed to delete ${slug} post.`,
      } as UseCaseError);
    }
  }
}
