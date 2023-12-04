import { Either, Result, left, right } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { Category } from "../../../domain/category";
import { CategoryMap } from "../../../mappers/categoryMap";
import { CategoryTitle } from "../../../domain/categoryTitle";
import { CreateCategoryDTO } from "./CreateCategoryDTO";
import { ICategoryRepo } from "../../../repos/categoryRepo";
import { UseCase } from "../../../../../shared/core/UseCase";

type Response = Either<AppError.UnexpectedError | Result<any>, Result<void>>;

export class CreateCategory
  implements UseCase<CreateCategoryDTO, Promise<Response>>
{
  private categoryRepo: ICategoryRepo;

  constructor(categoryRepo: ICategoryRepo) {
    this.categoryRepo = categoryRepo;
  }

  public async execute(req: CreateCategoryDTO): Promise<Response> {
    const { title } = req;

    const categoryTitle = CategoryTitle.create({ value: title });
    if (categoryTitle.isFailure) return left(categoryTitle);

    const categoryEntity = Category.create({ title: categoryTitle.getValue() });
    try {
      await this.categoryRepo.save(categoryEntity.getValue());
      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
