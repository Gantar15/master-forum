import { Either, Result, left, right } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { GetPostBySlugDTO } from "./GetPostBySlugDTO";
import { GetPostBySlugErrors } from "./GetPostBySlugErrors";
import { IMemberRepo } from "../../../repos/memberRepo";
import { IPostRepo } from "../../../repos/postRepo";
import { MemberId } from "../../../domain/memberId";
import { PostDetails } from "../../../domain/postDetails";
import { UseCase } from "../../../../../shared/core/UseCase";

type Response = Either<
  GetPostBySlugErrors.PostNotFoundError | AppError.UnexpectedError,
  Result<PostDetails>
>;

export class GetPostBySlug implements UseCase<any, Promise<Response>> {
  private postRepo: IPostRepo;
  private memberRepo: IMemberRepo;

  constructor(postRepo: IPostRepo, memberRepo: IMemberRepo) {
    this.postRepo = postRepo;
    this.memberRepo = memberRepo;
  }

  public async execute(req: GetPostBySlugDTO): Promise<Response> {
    let postDetails: PostDetails;
    const { slug } = req;

    try {
      let memberId: MemberId;
      const isAuthenticated = !!req.userId === true;

      if (isAuthenticated) {
        memberId = await this.memberRepo.getMemberIdByUserId(req.userId);
      }

      try {
        postDetails = await this.postRepo.getPostDetailsBySlug(slug, memberId);
      } catch (err) {
        return left(new GetPostBySlugErrors.PostNotFoundError(slug));
      }

      return right(Result.ok<PostDetails>(postDetails));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
