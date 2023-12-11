import * as express from "express";

import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { CategoryMap } from "../../../mappers/categoryMap";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { GetCategories } from "./GetCategories";
import { GetCategoriesResponseDTO } from "./GetCategoriesResponseDTO";

export class GetCategoriesController extends BaseController {
  private useCase: GetCategories;

  constructor(useCase: GetCategories) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    try {
      const result = await this.useCase.execute();

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        const categoriesDTO = result.value
          .getValue()
          .map((category) => CategoryMap.toDTO(category));
        return this.ok<GetCategoriesResponseDTO>(res, {
          categories: categoriesDTO,
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
