import { Either, Result, left, right } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { DeletePostDTO } from "./DeletePostDTO";
import { DeletePostErrors } from "./DeletePostErrors";
import { IMemberRepo } from "../../../repos/memberRepo";
import { IPostRepo } from "../../../repos/postRepo";
import { Post } from "../../../domain/post";
import { UseCase } from "../../../../../shared/core/UseCase";

type Response = Either<
  | DeletePostErrors.PostNotFoundError
  | DeletePostErrors.ForbiddenError
  | AppError.UnexpectedError,
  Result<void>
>;

export class DeletePost implements UseCase<DeletePostDTO, Promise<Response>> {
  private postRepo: IPostRepo;
  private memberRepo: IMemberRepo;

  constructor(postRepo: IPostRepo, memberRepo: IMemberRepo) {
    this.postRepo = postRepo;
    this.memberRepo = memberRepo;
  }

  public async execute(req: DeletePostDTO): Promise<Response> {
    const { slug, userId, managerUser, adminUser } = req;

    try {
      let post: Post;
      try {
        post = await this.postRepo.getPostBySlug(slug);
      } catch (err) {
        return left(new DeletePostErrors.PostNotFoundError(slug));
      }

      const memberId = await this.memberRepo.getMemberIdByUserId(userId);
      if (!managerUser && !adminUser && !post.memberId.equals(memberId)) {
        return left(new DeletePostErrors.ForbiddenError(slug));
      }

      await this.postRepo.deleteBySlug(slug);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
