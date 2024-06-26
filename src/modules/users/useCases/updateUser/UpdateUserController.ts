import * as express from "express";

import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../infra/http/models/decodedRequest";
import { UpdateUserDTO } from "./UpdateUserDTO";
import { UpdateUserErrors } from "./UpdateUserErrors";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController extends BaseController {
  private useCase: UpdateUserUseCase;

  constructor(useCase: UpdateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: UpdateUserDTO = {
      userId: req.query.userId,
      ...req.body,
      isCurrentUser: req.decoded.userId === req.query.userId,
      isAdminUser: !!req.decoded ? req.decoded.adminUser : false,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case UpdateUserErrors.UserNotFoundError:
            return this.notFound(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        return this.ok(res, result.value.getValue());
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
