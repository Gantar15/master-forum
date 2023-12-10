import { Either, Result, left, right } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { IMemberRepo } from "../../../repos/memberRepo";
import { IPostRepo } from "../../../repos/postRepo";
import { MemberId } from "../../../domain/memberId";
import { PostDetails } from "../../../domain/postDetails";
import { SearchPostsErrors } from "./SearchPostsErrors";
import { SearchPostsRequestDTO } from "./SearchPostsRequestDTO";
import { SearchString } from "../../../domain/SearchString";
import { UseCase } from "../../../../../shared/core/UseCase";

type Response = Either<
  SearchPostsErrors.InvalidSearchStringError | AppError.UnexpectedError,
  Result<PostDetails[]>
>;

export class SearchPosts
  implements UseCase<SearchPostsRequestDTO, Promise<Response>>
{
  private postRepo: IPostRepo;
  private memberRepo: IMemberRepo;

  constructor(postRepo: IPostRepo, memberRepo: IMemberRepo) {
    this.postRepo = postRepo;
    this.memberRepo = memberRepo;
  }

  public async execute(req: SearchPostsRequestDTO): Promise<Response> {
    try {
      let memberId: MemberId;
      const searchStringOrError = SearchString.create({
        value: req.searchString,
      });
      const isAuthenticated = !!req.userId === true;

      if (isAuthenticated) {
        memberId = await this.memberRepo.getMemberIdByUserId(req.userId);
      }

      if (searchStringOrError.isFailure) {
        return left(
          new SearchPostsErrors.InvalidSearchStringError(req.searchString)
        );
      }

      const posts = await this.postRepo.searchByEs(
        searchStringOrError.getValue(),
        memberId
      );
      return right(Result.ok<PostDetails[]>(posts));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
