import * as express from "express";

import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateUserDTO } from "./CreateUserDTO";
import { CreateUserErrors } from "./CreateUserErrors";
import { CreateUserResponseDTO } from "./CreateUserResponseDTO";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { DecodedExpressRequest } from "../../infra/http/models/decodedRequest";
import { TextUtils } from "../../../../shared/utils/TextUtils";
import { UserMap } from "../../mappers/userMap";

export class CreateUserController extends BaseController {
  private useCase: CreateUserUseCase;

  constructor(useCase: CreateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    let dto: CreateUserDTO = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    dto = {
      username: TextUtils.sanitize(dto.username),
      email: TextUtils.sanitize(dto.email),
      password: dto.password,
      role: req.body.role,
      isAdminUser: !!req.decoded ? req.decoded.adminUser : false,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateUserErrors.UsernameTakenError:
            return this.conflict(res, error.getErrorValue().message);
          case CreateUserErrors.EmailAlreadyExistsError:
            return this.conflict(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        const user = result.value.getValue();
        return this.ok<CreateUserResponseDTO>(res, {
          user: UserMap.toDTO(user),
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
