import { Either, Result, left, right } from "../../../../shared/core/Result";
import { JWTToken, RefreshToken } from "../../domain/jwt";

import { AppError } from "../../../../shared/core/AppError";
import { IAuthService } from "../../services/authService";
import { IUserRepo } from "../../repos/userRepo";
import { RefreshAccessTokenDTO } from "./RefreshAccessTokenDTO";
import { RefreshAccessTokenErrors } from "./RefreshAccessTokenErrors";
import { UseCase } from "../../../../shared/core/UseCase";
import { User } from "../../domain/user";

type Response = Either<
  RefreshAccessTokenErrors.RefreshTokenNotFound | AppError.UnexpectedError,
  Result<JWTToken>
>;

export class RefreshAccessToken
  implements UseCase<RefreshAccessTokenDTO, Promise<Response>>
{
  private userRepo: IUserRepo;
  private authService: IAuthService;

  constructor(userRepo: IUserRepo, authService: IAuthService) {
    this.userRepo = userRepo;
    this.authService = authService;
  }

  public async execute(req: RefreshAccessTokenDTO): Promise<Response> {
    const { refreshToken } = req;
    let user: User;
    let username: string;

    try {
      // Get the username for the user that owns the refresh token
      try {
        username = await this.authService.getUserNameFromRefreshToken(
          refreshToken
        );
      } catch (err) {
        return left(new RefreshAccessTokenErrors.RefreshTokenNotFound());
      }

      try {
        // get the user by username
        user = await this.userRepo.getUserByUserName(username);
      } catch (err) {
        return left(new RefreshAccessTokenErrors.UserNotFoundOrDeletedError());
      }

      const accessToken: JWTToken = this.authService.signJWT({
        username: user.username.value,
        email: user.email.value,
        isEmailVerified: user.isEmailVerified,
        userId: user.userId.getStringValue(),
        adminUser: user.isAdminUser,
        managerUser: user.isManagerUser,
      });

      // sign a new jwt for that user
      user.setAccessToken(accessToken, refreshToken);

      // save it
      await this.authService.saveAuthenticatedUser(user);

      // return the new access token
      return right(Result.ok<JWTToken>(accessToken));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
