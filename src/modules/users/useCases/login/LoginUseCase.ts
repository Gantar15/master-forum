import { Either, Result, left, right } from "../../../../shared/core/Result";
import { JWTToken, RefreshToken } from "../../domain/jwt";
import { LoginDTO, LoginDTOResponse } from "./LoginDTO";

import { AppError } from "../../../../shared/core/AppError";
import { IAuthService } from "../../services/authService";
import { IUserRepo } from "../../repos/userRepo";
import { LoginUseCaseErrors } from "./LoginErrors";
import { UseCase } from "../../../../shared/core/UseCase";
import { User } from "../../domain/user";
import { UserName } from "../../domain/userName";
import { UserPassword } from "../../domain/userPassword";

type Response = Either<
  | LoginUseCaseErrors.PasswordDoesntMatchError
  | LoginUseCaseErrors.UserNameDoesntExistError
  | LoginUseCaseErrors.NotVerifiedEmailError
  | AppError.UnexpectedError,
  Result<LoginDTOResponse>
>;

export class LoginUserUseCase implements UseCase<LoginDTO, Promise<Response>> {
  private userRepo: IUserRepo;
  private authService: IAuthService;

  constructor(userRepo: IUserRepo, authService: IAuthService) {
    this.userRepo = userRepo;
    this.authService = authService;
  }

  public async execute(request: LoginDTO): Promise<Response> {
    let user: User;
    let userName: UserName;
    let password: UserPassword;

    try {
      const usernameOrError = UserName.create({ name: request.username });
      const passwordOrError = UserPassword.create({ value: request.password });
      const payloadResult = Result.combine([usernameOrError, passwordOrError]);

      if (payloadResult.isFailure) {
        return left(Result.fail<any>(payloadResult.getErrorValue()));
      }

      userName = usernameOrError.getValue();
      password = passwordOrError.getValue();

      try {
        user = await this.userRepo.getUserByUserName(userName);
      } catch (err) {
        return left(new LoginUseCaseErrors.UserNameDoesntExistError());
      }

      if (!user.isEmailVerified) {
        return left(new LoginUseCaseErrors.NotVerifiedEmailError());
      }

      const passwordValid = await user.password.comparePassword(password.value);

      if (!passwordValid) {
        return left(new LoginUseCaseErrors.PasswordDoesntMatchError());
      }

      const accessToken: JWTToken = this.authService.signJWT({
        username: user.username.value,
        email: user.email.value,
        isEmailVerified: user.isEmailVerified,
        userId: user.userId.getStringValue(),
        adminUser: user.isAdminUser,
        managerUser: user.isManagerUser,
      });

      const refreshToken: RefreshToken = this.authService.createRefreshToken();

      user.setAccessToken(accessToken, refreshToken);

      await this.authService.saveAuthenticatedUser(user);

      return right(
        Result.ok<LoginDTOResponse>({
          accessToken,
          refreshToken,
        })
      );
    } catch (err) {
      return left(new AppError.UnexpectedError(err.toString()));
    }
  }
}
