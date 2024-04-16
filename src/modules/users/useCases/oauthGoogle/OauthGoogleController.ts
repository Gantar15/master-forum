import * as express from "express";

import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../infra/http/models/decodedRequest";
import { OauthGoogleDTO } from "./OauthGoogleDTO";
import { OauthGoogleUseCase } from "./OauthGoogleUseCase";

export class OauthGoogleController extends BaseController {
  private useCase: OauthGoogleUseCase;

  constructor(useCase: OauthGoogleUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: OauthGoogleDTO = { code: req.query.code };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        return this.redirect(res, process.env.DDD_FORUM_FRONTEND_URL);
      } else {
        const value = result.value.getValue();
        return this.redirect(
          res,
          process.env.DDD_FORUM_FRONTEND_URL +
            "/oauth/pulluser/" +
            value.username
        );
      }
    } catch (err) {
      return this.redirect(res, process.env.DDD_FORUM_FRONTEND_URL);
    }
  }
}
