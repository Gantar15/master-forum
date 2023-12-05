import { Result } from "../../../../../shared/core/Result";
import { UseCaseError } from "../../../../../shared/core/UseCaseError";

export namespace CreatePostErrors {
  export class MemberDoesntExistError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `A forum member doesn't exist for this account.`,
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
