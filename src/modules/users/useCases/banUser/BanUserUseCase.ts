import { Either, Result, left, right } from "../../../../shared/core/Result";

import { AppError } from "../../../../shared/core/AppError";
import { BanUserDTO } from "./BanUserDTO";
import { BanUserErrors } from "./BanUserErrors";
import { IAuthService } from "../../services/authService";
import { IUserRepo } from "../../repos/userRepo";
import { UseCase } from "../../../../shared/core/UseCase";

type Response = Either<
  AppError.UnexpectedError | BanUserErrors.UserNotFoundError,
  Result<void>
>;

export class BanUserUseCase implements UseCase<BanUserDTO, Promise<Response>> {
  private userRepo: IUserRepo;
  private authService: IAuthService;

  constructor(userRepo: IUserRepo, authService: IAuthService) {
    this.userRepo = userRepo;
    this.authService = authService;
  }

  public async execute(request: BanUserDTO): Promise<any> {
    try {
      const user = await this.userRepo.getUserByUserId(request.userId);
      const userFound = !!user === true;

      if (!userFound) {
        return left(new BanUserErrors.UserNotFoundError());
      }

      user.ban();

      await this.userRepo.save(user);
      await this.authService.deAuthenticateUser(user.username.value);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
