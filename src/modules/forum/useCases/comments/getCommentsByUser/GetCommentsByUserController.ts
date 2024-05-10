import * as express from "express";

import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { CommentDetailsMap } from "../../../mappers/commentDetailsMap";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { GetCommentsByUser } from "./GetCommentsByUser";
import { GetCommentsByUserRequestDTO } from "./GetCommentsByUserRequestDTO";
import { GetCommentsByUserResponseDTO } from "./GetCommentsByUserResponseDTO";

export class GetCommentsByUserController extends BaseController {
  private useCase: GetCommentsByUser;

  constructor(useCase: GetCommentsByUser) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: GetCommentsByUserRequestDTO = {
      username: req.query.username,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        const commentDetails = result.value.getValue();
        return this.ok<GetCommentsByUserResponseDTO>(res, {
          comments: commentDetails.map((c) => CommentDetailsMap.toDTO(c)),
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
