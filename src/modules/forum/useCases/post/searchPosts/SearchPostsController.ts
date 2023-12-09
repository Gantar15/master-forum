import * as express from "express";

import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import { PostDetailsMap } from "../../../mappers/postDetailsMap";
import { SearchPosts } from "./SearchPosts";
import { SearchPostsErrors } from "./SearchPostsErrors";
import { SearchPostsRequestDTO } from "./SearchPostsRequestDTO";
import { SearchPostsResponseDTO } from "./SearchPostsResponseDTO";

export class SearchPostsController extends BaseController {
  private useCase: SearchPosts;

  constructor(useCase: SearchPosts) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: SearchPostsRequestDTO = {
      searchString: req.body.searchString,
      userId: !!req.decoded === true ? req.decoded.userId : null,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case SearchPostsErrors.InvalidSearchStringError:
            return this.clientError(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        const postDetails = result.value.getValue();
        return this.ok<SearchPostsResponseDTO>(res, {
          posts: postDetails.map((d) => PostDetailsMap.toDTO(d)),
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
