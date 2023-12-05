import { Result } from "../../../../../shared/core/Result";
import { UseCaseError } from "../../../../../shared/core/UseCaseError";

export namespace EditPostErrors {
  export class PostNotFoundError extends Result<UseCaseError> {
    constructor(id: string) {
      super(false, {
        message: `Couldn't find a post by id {${id}}.`,
      } as UseCaseError);
    }
  }

  export class InvalidPostTypeOperationError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `If a post is a text post, we can only edit the text. If it's a link post, we can only edit the link.`,
      } as UseCaseError);
    }
  }

  export class ForbiddenError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `You are not allowed to edit this post.`,
      } as UseCaseError);
    }
  }

  export class CategoryNotFoundError extends Result<UseCaseError> {
    constructor(title: string) {
      super(false, {
        message: `Couldn't find ${title} category.`,
      } as UseCaseError);
    }
  }

  export class InvalidTagError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Invalid tag.`,
      } as UseCaseError);
    }
  }

  export class PostWithSameTitleExistsError extends Result<UseCaseError> {
    constructor(title: string) {
      super(false, {
        message: `Post with title ${title} already exists.`,
      } as UseCaseError);
    }
  }
}
