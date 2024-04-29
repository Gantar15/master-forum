import * as express from "express";

import { BanUserDTO } from "./BanUserDTO";
import { BanUserErrors } from "./BanUserErrors";
import { BanUserUseCase } from "./BanUserUseCase";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../infra/http/models/decodedRequest";

export class BanUserController extends BaseController {
  private useCase: BanUserUseCase;

  constructor(useCase: BanUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: BanUserDTO = { userId: req.params.userId };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case BanUserErrors.UserNotFoundError:
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
