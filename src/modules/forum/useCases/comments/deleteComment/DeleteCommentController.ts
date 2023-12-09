import * as express from "express";

import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { DeleteComment } from "./DeleteComment";
import { DeleteCommentDTO } from "./DeleteCommentDTO";
import { DeleteCommentErrors } from "./DeleteCommentErrors";

export class DeleteCommentController extends BaseController {
  private useCase: DeleteComment;

  constructor(useCase: DeleteComment) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const { userId, managerUser, adminUser } = req.decoded;

    const dto: DeleteCommentDTO = {
      commentId: req.params.commentId,
      managerUser,
      adminUser,
      userId,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case DeleteCommentErrors.CommentNotFoundError:
            return this.notFound(res, error.getErrorValue().message);
          case DeleteCommentErrors.ForbiddenError:
            return this.forbidden(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
