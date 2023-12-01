import { Either, Result, left, right } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { Comment } from "../../../domain/comment";
import { CommentDetails } from "../../../domain/commentDetails";
import { CommentText } from "../../../domain/commentText";
import { EditCommentDTO } from "./EditCommentDTO";
import { EditCommentErrors } from "./EditCommentErrors";
import { ICommentRepo } from "../../../repos/commentRepo";
import { IMemberRepo } from "../../../repos/memberRepo";
import { UseCase } from "../../../../../shared/core/UseCase";

type Response = Either<
  | EditCommentErrors.CommentNotFoundError
  | EditCommentErrors.ForbiddenError
  | AppError.UnexpectedError
  | Result<Error>,
  Result<CommentDetails>
>;

export class EditComment implements UseCase<EditCommentDTO, Promise<Response>> {
  private commentRepo: ICommentRepo;
  private memberRepo: IMemberRepo;

  constructor(commentRepo: ICommentRepo, memberRepo: IMemberRepo) {
    this.commentRepo = commentRepo;
    this.memberRepo = memberRepo;
  }

  public async execute(req: EditCommentDTO): Promise<Response> {
    const { commentId, comment: commentText, userId } = req;

    try {
      let comment: Comment;
      let commentDetails: CommentDetails;

      try {
        comment = await this.commentRepo.getCommentByCommentId(commentId);
      } catch (err) {
        return left(new EditCommentErrors.CommentNotFoundError(commentId));
      }

      const memberId = await this.memberRepo.getMemberIdByUserId(userId);
      if (!comment.memberId.equals(memberId)) {
        return left(new EditCommentErrors.ForbiddenError(commentId));
      }

      let commentTextModel = CommentText.create({ value: commentText });
      if (commentTextModel.isFailure) {
        //@ts-ignore
        return left(commentTextModel.getErrorValue());
      }
      await this.commentRepo.save(comment);

      try {
        commentDetails = await this.commentRepo.getCommentDetailsByCommentId(
          commentId,
          memberId
        );
      } catch (err) {
        return left(new EditCommentErrors.CommentNotFoundError(commentId));
      }

      return right(Result.ok<CommentDetails>(commentDetails));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
