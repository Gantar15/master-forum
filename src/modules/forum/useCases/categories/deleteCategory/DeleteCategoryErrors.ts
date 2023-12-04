import { Result } from "../../../../../shared/core/Result";
import { UseCaseError } from "../../../../../shared/core/UseCaseError";

export namespace DeleteCategoryErrors {
  export class CategoryNotFoundError extends Result<UseCaseError> {
    constructor(categoryId: string) {
      super(false, {
        message: `Couldn't find a category by categoryId {${categoryId}}.`,
      } as UseCaseError);
    }
  }
}
