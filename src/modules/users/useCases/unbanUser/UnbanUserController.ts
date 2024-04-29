import * as express from "express";

import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../infra/http/models/decodedRequest";
import { UnbanUserDTO } from "./UnbanUserDTO";
import { UnbanUserErrors } from "./UnbanUserErrors";
import { UnbanUserUseCase } from "./UnbanUserUseCase";

export class UnbanUserController extends BaseController {
  private useCase: UnbanUserUseCase;

  constructor(useCase: UnbanUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: UnbanUserDTO = { userId: req.params.userId };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case UnbanUserErrors.UserNotFoundError:
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
