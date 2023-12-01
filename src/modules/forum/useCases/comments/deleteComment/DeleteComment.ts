import { Either, Result, left, right } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { Comment } from "../../../domain/comment";
import { CommentId } from "../../../domain/commentId";
import { DeleteCommentDTO } from "./DeleteCommentDTO";
import { DeleteCommentErrors } from "./DeleteCommentErrors";
import { ICommentRepo } from "../../../repos/commentRepo";
import { IMemberRepo } from "../../../repos/memberRepo";
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
  private commentRepo: ICommentRepo;
  private memberRepo: IMemberRepo;

  constructor(commentRepo: ICommentRepo, memberRepo: IMemberRepo) {
    this.commentRepo = commentRepo;
    this.memberRepo = memberRepo;
  }

  public async execute(req: DeleteCommentDTO): Promise<Response> {
    const { commentId, userId } = req;

    try {
      let comment: Comment;
      try {
        comment = await this.commentRepo.getCommentByCommentId(commentId);
      } catch (err) {
        return left(new DeleteCommentErrors.CommentNotFoundError(commentId));
      }

      const memberId = await this.memberRepo.getMemberIdByUserId(userId);
      if (!comment.memberId.equals(memberId)) {
        return left(new DeleteCommentErrors.ForbiddenError(commentId));
      }

      const commentIdModel = CommentId.create(
        new UniqueEntityID(commentId)
      ).getValue();
      await this.commentRepo.deleteComment(commentIdModel);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
