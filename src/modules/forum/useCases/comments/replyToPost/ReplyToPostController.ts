import * as express from "express";

import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { ReplyToPost } from "./ReplyToPost";
import { ReplyToPostDTO } from "./ReplyToPostDTO";
import { ReplyToPostErrors } from "./ReplyToPostErrors";
import { TextUtils } from "../../../../../shared/utils/TextUtils";

export class ReplyToPostController extends BaseController {
  private useCase: ReplyToPost;

  constructor(useCase: ReplyToPost) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const { userId } = req.decoded;

    const dto: ReplyToPostDTO = {
      comment: TextUtils.sanitize(req.body.comment),
      userId: userId,
      slug: req.query.slug,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case ReplyToPostErrors.PostNotFoundError:
            return this.notFound(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue());
        }
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
