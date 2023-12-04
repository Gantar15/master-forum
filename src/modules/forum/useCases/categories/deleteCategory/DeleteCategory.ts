import { Either, Result, left, right } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { DeleteCategoryDTO } from "./DeleteCategoryDTO";
import { DeleteCategoryErrors } from "./DeleteCategoryErrors";
import { ICategoryRepo } from "../../../repos/categoryRepo";
import { UniqueEntityID } from "../../../../../shared/domain/UniqueEntityID";
import { UseCase } from "../../../../../shared/core/UseCase";

type Response = Either<
  | DeleteCategoryErrors.CategoryNotFoundError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class DeleteCategory
  implements UseCase<DeleteCategoryDTO, Promise<Response>>
{
  private categoryRepo: ICategoryRepo;

  constructor(categoryRepo: ICategoryRepo) {
    this.categoryRepo = categoryRepo;
  }

  public async execute(req: DeleteCategoryDTO): Promise<Response> {
    const { categoryId } = req;

    const categoryEntityId = new UniqueEntityID(categoryId);
    try {
      try {
        await this.categoryRepo.delete(categoryEntityId);
      } catch (err) {
        return left(new DeleteCategoryErrors.CategoryNotFoundError(categoryId));
      }

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
