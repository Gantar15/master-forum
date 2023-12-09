import * as express from "express";

import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../infra/http/models/decodedRequest";
import { DeleteUserDTO } from "./DeleteUserDTO";
import { DeleteUserErrors } from "./DeleteUserErrors";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController extends BaseController {
  private useCase: DeleteUserUseCase;

  constructor(useCase: DeleteUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: DeleteUserDTO = { userId: req.params.userId };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case DeleteUserErrors.UserNotFoundError:
            return this.notFound(res, error.getErrorValue().message);
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
