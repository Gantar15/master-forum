import { Either, Result, left, right } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { GetRecentPostsRequestDTO } from "./GetRecentPostsRequestDTO";
import { IMemberRepo } from "../../../repos/memberRepo";
import { IPostRepo } from "../../../repos/postRepo";
import { MemberId } from "../../../domain/memberId";
import { PostDetails } from "../../../domain/postDetails";
import { UseCase } from "../../../../../shared/core/UseCase";

type Response = Either<AppError.UnexpectedError, Result<PostDetails[]>>;

export class GetRecentPosts
  implements UseCase<GetRecentPostsRequestDTO, Promise<Response>>
{
  private postRepo: IPostRepo;
  private memberRepo: IMemberRepo;

  constructor(postRepo: IPostRepo, memberRepo: IMemberRepo) {
    this.postRepo = postRepo;
    this.memberRepo = memberRepo;
  }

  public async execute(req: GetRecentPostsRequestDTO): Promise<Response> {
    try {
      let memberId: MemberId;
      const isAuthenticated = !!req.userId === true;

      if (isAuthenticated) {
        memberId = await this.memberRepo.getMemberIdByUserId(req.userId);
      }

      const posts = await this.postRepo.getRecentPosts(req.offset, memberId);
      return right(Result.ok<PostDetails[]>(posts));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
