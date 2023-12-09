import { Result } from "../../../../../shared/core/Result";
import { UseCaseError } from "../../../../../shared/core/UseCaseError";

export namespace SearchPostsErrors {
  export class InvalidSearchStringError extends Result<UseCaseError> {
    constructor(searchString: string) {
      super(false, {
        message: `Invalid search string ${searchString}.`,
      } as UseCaseError);
    }
  }
}
