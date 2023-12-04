import * as express from "express";

import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { CreateCategory } from "./CreateCategory";
import { CreateCategoryDTO } from "./CreateCategoryDTO";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";

export class CreateCategoryController extends BaseController {
  private useCase: CreateCategory;

  constructor(useCase: CreateCategory) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: CreateCategoryDTO = {
      title: req.body.title,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        this.fail(res, error.getErrorValue().message);
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
