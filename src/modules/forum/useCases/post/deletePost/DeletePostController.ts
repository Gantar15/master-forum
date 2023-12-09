import * as express from "express";

import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { DeletePost } from "./DeletePost";
import { DeletePostDTO } from "./DeletePostDTO";
import { DeletePostErrors } from "./DeletePostErrors";

export class DeletePostController extends BaseController {
  private useCase: DeletePost;

  constructor(useCase: DeletePost) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const { userId, managerUser, adminUser } = req.decoded;

    const dto: DeletePostDTO = {
      slug: req.params.slug,
      userId,
      managerUser,
      adminUser,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case DeletePostErrors.PostNotFoundError:
            return this.notFound(res, error.getErrorValue().message);
          case DeletePostErrors.ForbiddenError:
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
