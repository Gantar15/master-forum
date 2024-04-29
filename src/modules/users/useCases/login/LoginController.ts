import * as express from "express";

import { LoginDTO, LoginDTOResponse } from "./LoginDTO";

import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../infra/http/models/decodedRequest";
import { LoginUseCaseErrors } from "./LoginErrors";
import { LoginUserUseCase } from "./LoginUseCase";

export class LoginController extends BaseController {
  private useCase: LoginUserUseCase;

  constructor(useCase: LoginUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(
    req: DecodedExpressRequest,
    res: express.Response
  ): Promise<any> {
    const dto: LoginDTO = req.body as LoginDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case LoginUseCaseErrors.UserNameDoesntExistError:
            return this.notFound(res, error.getErrorValue().message);
          case LoginUseCaseErrors.PasswordDoesntMatchError:
            return this.clientError(res, error.getErrorValue().message);
          case LoginUseCaseErrors.NotVerifiedEmailError:
            return this.forbidden(res, error.getErrorValue().message);
          case LoginUseCaseErrors.UserWasDeletedError:
            return this.notFound(res, error.getErrorValue().message);
          case LoginUseCaseErrors.UserWasBannedError:
            return this.notFound(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        const dto: LoginDTOResponse =
          result.value.getValue() as LoginDTOResponse;
        return this.ok<LoginDTOResponse>(res, dto);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
