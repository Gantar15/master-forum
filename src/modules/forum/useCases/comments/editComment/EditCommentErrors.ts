import { Result } from "../../../../../shared/core/Result";
import { UseCaseError } from "../../../../../shared/core/UseCaseError";

export namespace EditCommentErrors {
  export class CommentNotFoundError extends Result<UseCaseError> {
    constructor(commentId: string) {
      super(false, {
        message: `Couldn't find a comment by commentId {${commentId}}.`,
      } as UseCaseError);
    }
  }

  export class ForbiddenError extends Result<UseCaseError> {
    constructor(commentId: string) {
      super(false, {
        message: `You are not allowed to edit ${commentId} comment.`,
      } as UseCaseError);
    }
  }
}
