import * as express from "express";

import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { CategoryMap } from "../../../mappers/categoryMap";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { GetTopCategories } from "./GetTopCategories";
import { GetTopCategoriesRequestDTO } from "./GetTopCategoriesRequestDTO";
import { GetTopCategoriesResponseDTO } from "./GetTopCategoriesResponseDTO";

export class GetTopCategoriesController extends BaseController {
  private useCase: GetTopCategories;

  constructor(useCase: GetTopCategories) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    try {
      const dto: GetTopCategoriesRequestDTO = {
        count: +req.query.count,
      };
      const result = await this.useCase.execute(dto);

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
        return this.ok<GetTopCategoriesResponseDTO>(res, {
          categories: categoriesDTO,
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
