import * as express from "express";

import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../infra/http/models/decodedRequest";
import { GetUsers } from "./GetUsers";
import { GetUsersResponseDTO } from "./GetUsersResponseDTO";
import { UserMap } from "../../mappers/userMap";

export class GetUsersController extends BaseController {
  private useCase: GetUsers;

  constructor(useCase: GetUsers) {
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
        const usersDTO = result.value
          .getValue()
          .map((user) => UserMap.toDTO(user));
        return this.ok<GetUsersResponseDTO>(res, {
          users: usersDTO,
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
