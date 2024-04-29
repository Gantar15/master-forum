import { Either, Result, left, right } from "../../../../shared/core/Result";

import { AppError } from "../../../../shared/core/AppError";
import { IAuthService } from "../../services/authService";
import { IUserRepo } from "../../repos/userRepo";
import { UnbanUserDTO } from "./UnbanUserDTO";
import { UnbanUserErrors } from "./UnbanUserErrors";
import { UseCase } from "../../../../shared/core/UseCase";

type Response = Either<
  AppError.UnexpectedError | UnbanUserErrors.UserNotFoundError,
  Result<void>
>;

export class UnbanUserUseCase
  implements UseCase<UnbanUserDTO, Promise<Response>>
{
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(request: UnbanUserDTO): Promise<any> {
    try {
      const user = await this.userRepo.getUserByUserId(request.userId);
      const userFound = !!user === true;

      if (!userFound) {
        return left(new UnbanUserErrors.UserNotFoundError());
      }

      user.unban();

      await this.userRepo.save(user);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
