import * as express from "express";

import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { CommentDetailsMap } from "../../../mappers/commentDetailsMap";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { EditComment } from "./EditComment";
import { EditCommentDTO } from "./EditCommentDTO";
import { EditCommentErrors } from "./EditCommentErrors";

export class EditCommentController extends BaseController {
  private useCase: EditComment;

  constructor(useCase: EditComment) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const { userId } = req.decoded;

    const dto: EditCommentDTO = {
      commentId: req.params.commentId,
      comment: req.body.comment,
      userId,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        if (error instanceof EditCommentErrors.CommentNotFoundError) {
          return this.notFound(res, error.getErrorValue().message);
        }
        if (error instanceof EditCommentErrors.ForbiddenError) {
          return this.forbidden(res, error.getErrorValue().message);
        } else {
          return this.fail(res, error.getErrorValue().message);
        }
      } else {
        const commentDetails = result.value.getValue();
        return this.ok(res, CommentDetailsMap.toDTO(commentDetails));
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
