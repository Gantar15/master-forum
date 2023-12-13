import { Either, Result, left, right } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { Comment } from "../../../domain/comment";
import { CommentId } from "../../../domain/commentId";
import { DeleteCommentDTO } from "./DeleteCommentDTO";
import { DeleteCommentErrors } from "./DeleteCommentErrors";
import { ICommentRepo } from "../../../repos/commentRepo";
import { IMemberRepo } from "../../../repos/memberRepo";
import { IPostRepo } from "../../../repos/postRepo";
import { UniqueEntityID } from "../../../../../shared/domain/UniqueEntityID";
import { UseCase } from "../../../../../shared/core/UseCase";

type Response = Either<
  | DeleteCommentErrors.CommentNotFoundError
  | DeleteCommentErrors.ForbiddenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class DeleteComment
  implements UseCase<DeleteCommentDTO, Promise<Response>>
{
  private postRepo: IPostRepo;
  private commentRepo: ICommentRepo;
  private memberRepo: IMemberRepo;

  constructor(
    commentRepo: ICommentRepo,
    memberRepo: IMemberRepo,
    postRepo: IPostRepo
  ) {
    this.commentRepo = commentRepo;
    this.memberRepo = memberRepo;
    this.postRepo = postRepo;
  }

  public async execute(req: DeleteCommentDTO): Promise<Response> {
    const { commentId, userId, managerUser, adminUser } = req;

    try {
      let comment: Comment;
      try {
        comment = await this.commentRepo.getCommentByCommentId(commentId);
      } catch (err) {
        return left(new DeleteCommentErrors.CommentNotFoundError(commentId));
      }

      const memberId = await this.memberRepo.getMemberIdByUserId(userId);
      if (!managerUser && !adminUser && !comment.memberId.equals(memberId)) {
        return left(new DeleteCommentErrors.ForbiddenError(commentId));
      }

      const commentIdModel = CommentId.create(
        new UniqueEntityID(commentId)
      ).getValue();

      const post = await this.postRepo.getPostByPostId(comment.postId);
      const postResult = post.removeComment(comment);
      if (postResult.isFailure) {
        return left(new AppError.UnexpectedError(postResult.getValue()));
      }
      await this.postRepo.save(post);
      await this.commentRepo.deleteComment(commentIdModel);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
