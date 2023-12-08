import { Either, Result, left, right } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { Category } from "../../../domain/category";
import { CategoryRepo } from "../../../repos/implementations/categoryRepo";
import { CategoryTitle } from "../../../domain/categoryTitle";
import { GetPostsByCategoryErrors } from "./GetPostsByCategoryErrors";
import { GetPostsByCategoryRequestDTO } from "./GetPostsByCategoryRequestDTO";
import { IMemberRepo } from "../../../repos/memberRepo";
import { IPostRepo } from "../../../repos/postRepo";
import { MemberId } from "../../../domain/memberId";
import { MemberRepo } from "../../../repos/implementations/sequelizeMemberRepo";
import { PostDetails } from "../../../domain/postDetails";
import { UseCase } from "../../../../../shared/core/UseCase";

type Response = Either<
  GetPostsByCategoryErrors.CategoryNotFoundError | AppError.UnexpectedError,
  Result<PostDetails[]>
>;

export class GetPostsByCategory
  implements UseCase<GetPostsByCategoryRequestDTO, Promise<Response>>
{
  private postRepo: IPostRepo;
  private categoryRepo: CategoryRepo;
  private memberRepo: MemberRepo;

  constructor(
    postRepo: IPostRepo,
    categoryRepo: CategoryRepo,
    memberRepo: MemberRepo
  ) {
    this.postRepo = postRepo;
    this.categoryRepo = categoryRepo;
    this.memberRepo = memberRepo;
  }

  public async execute(req: GetPostsByCategoryRequestDTO): Promise<Response> {
    try {
      let category: Category;
      const categoryTitleOrError = CategoryTitle.create({
        value: req.categoryTitle,
      });
      if (categoryTitleOrError.isFailure)
        return left(
          new GetPostsByCategoryErrors.CategoryNotFoundError(req.categoryTitle)
        );

      let memberId: MemberId;
      const isAuthenticated = !!req.userId === true;

      if (isAuthenticated) {
        memberId = await this.memberRepo.getMemberIdByUserId(req.userId);
      }

      try {
        category = await this.categoryRepo.getCategoryByTitle(
          categoryTitleOrError.getValue()
        );
      } catch (err) {
        return left(
          new GetPostsByCategoryErrors.CategoryNotFoundError(req.categoryTitle)
        );
      }

      const posts = await this.postRepo.getPostsByCategory(
        category.id,
        memberId
      );
      return right(Result.ok<PostDetails[]>(posts));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
