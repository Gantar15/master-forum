import { Either, Result, left, right } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { Category } from "../../../domain/category";
import { ICategoryRepo } from "../../../repos/categoryRepo";
import { UseCase } from "../../../../../shared/core/UseCase";

type Response = Either<AppError.UnexpectedError, Result<Category[]>>;

export class GetCategories implements UseCase<undefined, Promise<Response>> {
  private categoryRepo: ICategoryRepo;

  constructor(categoryRepo: ICategoryRepo) {
    this.categoryRepo = categoryRepo;
  }

  public async execute(): Promise<Response> {
    try {
      const categories = await this.categoryRepo.getCategories();
      return right(Result.ok(categories));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
