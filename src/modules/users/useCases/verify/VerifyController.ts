import * as express from "express";

import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../infra/http/models/decodedRequest";
import { VerifyDTO } from "./VerifyDTO";
import { VerifyUseCase } from "./VerifyUseCase";

export class VerifyController extends BaseController {
  private useCase: VerifyUseCase;

  constructor(useCase: VerifyUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: VerifyDTO = req.body as VerifyDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        return this.fail(res, error.getErrorValue().message);
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
