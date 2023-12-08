import { Result } from "../../../../../shared/core/Result";
import { UseCaseError } from "../../../../../shared/core/UseCaseError";

export namespace GetPostsByCategoryErrors {
  export class CategoryNotFoundError extends Result<UseCaseError> {
    constructor(slug: string) {
      super(false, {
        message: `Couldn't find a category ${slug}.`,
      } as UseCaseError);
    }
  }
}
