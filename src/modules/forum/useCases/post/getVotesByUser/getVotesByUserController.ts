import * as express from "express";

import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { GetVotesByUser } from "./getVotesByUser";
import { GetVotesByUserDTO } from "./getVotesByUserDTO";
import { PostDTO } from "../../../dtos/postDTO";
import { PostDetailsMap } from "../../../mappers/postDetailsMap";

export class GetVotesByUserController extends BaseController {
  private useCase: GetVotesByUser;

  constructor(useCase: GetVotesByUser) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: GetVotesByUserDTO = {
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
        const postsDetails = result.value.getValue();
        const postsDetailsDTO = postsDetails.map((postDetails) =>
          PostDetailsMap.toDTO(postDetails)
        );
        return this.ok<{ posts: PostDTO[] }>(res, {
          posts: postsDetailsDTO,
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
