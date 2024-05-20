import { Either, Result, left, right } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { Category } from "../../../domain/category";
import { GetTopCategoriesRequestDTO } from "./GetTopCategoriesRequestDTO";
import { ICategoryRepo } from "../../../repos/categoryRepo";
import { UseCase } from "../../../../../shared/core/UseCase";

type Response = Either<AppError.UnexpectedError, Result<Category[]>>;

export class GetTopCategories implements UseCase<undefined, Promise<Response>> {
  private categoryRepo: ICategoryRepo;

  constructor(categoryRepo: ICategoryRepo) {
    this.categoryRepo = categoryRepo;
  }

  public async execute({
    count,
  }: GetTopCategoriesRequestDTO): Promise<Response> {
    try {
      const categories = await this.categoryRepo.getTopCategories(count);
      return right(Result.ok(categories));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
