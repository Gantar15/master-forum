import * as express from "express";

import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { EditPost } from "./EditPost";
import { EditPostDTO } from "./EditPostDTO";
import { EditPostErrors } from "./EditPostErrors";
import { TextUtils } from "../../../../../shared/utils/TextUtils";

export class EditPostController extends BaseController {
  private useCase: EditPost;

  constructor(useCase: EditPost) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const { userId } = req.decoded;
    const { slug } = req.params;

    const dto: EditPostDTO = {
      userId: userId,
      slug: slug,
      link: !!req.body.link ? TextUtils.sanitize(req.body.link) : null,
      title: TextUtils.sanitize(req.body.title),
      text: !!req.body.text ? TextUtils.sanitize(req.body.text) : null,
      category: req.body.category,
      tags: req.body.tags.map((tag) => TextUtils.sanitize(tag)),
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case EditPostErrors.PostNotFoundError:
            return this.notFound(res, error.getErrorValue().message);
          case EditPostErrors.InvalidPostTypeOperationError:
            return this.clientError(res, error.getErrorValue().message);
          case EditPostErrors.ForbiddenError:
            return this.forbidden(res, error.getErrorValue().message);
          case EditPostErrors.InvalidTagError:
            return this.clientError(res, error.getErrorValue().message);
          case EditPostErrors.CategoryNotFoundError:
            return this.clientError(res, error.getErrorValue().message);
          case EditPostErrors.PostWithSameTitleExistsError:
            return this.clientError(res, error.getErrorValue().message);
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
