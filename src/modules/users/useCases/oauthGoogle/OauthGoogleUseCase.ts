import { Either, Result, left, right } from "../../../../shared/core/Result";
import { JWTToken, RefreshToken } from "../../domain/jwt";
import { OauthGoogleDTO, OauthGoogleDTOResponse } from "./OauthGoogleDTO";

import { AppError } from "../../../../shared/core/AppError";
import { IAuthService } from "../../services/authService";
import { IUserRepo } from "../../repos/userRepo";
import { UseCase } from "../../../../shared/core/UseCase";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/userEmail";
import { UserName } from "../../domain/userName";
import { UserPassword } from "../../domain/userPassword";
import axios from "axios";
import { generatePassword } from "../../utils/generatePassword";
import querystring from "querystring";

type Response = Either<
  AppError.UnexpectedError,
  Result<OauthGoogleDTOResponse>
>;

export class OauthGoogleUseCase
  implements UseCase<OauthGoogleDTO, Promise<Response>>
{
  private userRepo: IUserRepo;
  private authService: IAuthService;

  constructor(userRepo: IUserRepo, authService: IAuthService) {
    this.userRepo = userRepo;
    this.authService = authService;
  }

  public async execute(request: OauthGoogleDTO): Promise<Response> {
    let user: User;
    let email: UserEmail;

    try {
      const code = request.code;
      const params = {
        code,
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        redirect_uri:
          "http://127.0.0.1:5550/api/v1/users/oauth/google/callback",
        grant_type: "authorization_code",
      };

      const response = await axios.post(
        "https://accounts.google.com/o/oauth2/token",
        querystring.stringify(params),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const googleAccessToken = response.data.access_token;

      const profileResponse = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
          },
        }
      );

      const emailOrError = UserEmail.create(profileResponse.data.email);
      if (emailOrError.isFailure) {
        return left(
          new AppError.MessageError(emailOrError.getErrorValue().toString())
        );
      }
      email = emailOrError.getValue();

      const userAlreadyExists = await this.userRepo.exists(email);

      //Create new user from google account if it doesnt exist
      if (!userAlreadyExists) {
        const passwordOrError = UserPassword.create({
          value: generatePassword(25),
        });
        const usernameOrError = UserName.create({
          name: profileResponse.data.name,
        });

        const dtoResult = Result.combine([passwordOrError, usernameOrError]);

        if (dtoResult.isFailure) {
          return left(
            new AppError.MessageError(dtoResult.getErrorValue().toString())
          );
        }

        const email: UserEmail = emailOrError.getValue();
        const password: UserPassword = passwordOrError.getValue();
        const username: UserName = usernameOrError.getValue();

        try {
          const alreadyCreatedUserByUserName =
            await this.userRepo.getUserByUserName(username);

          const userNameTaken = !!alreadyCreatedUserByUserName === true;

          if (userNameTaken) {
            return left(
              new AppError.UnexpectedError(username.value)
            ) as Response;
          }
        } catch (err) {}

        const userOrError: Result<User> = User.create({
          email,
          password,
          username,
          isEmailVerified: true,
          isAdminUser: false,
          isManagerUser: false,
        });

        if (userOrError.isFailure) {
          return left(
            new AppError.MessageError(userOrError.getErrorValue().toString())
          );
        }

        user = userOrError.getValue();

        await this.userRepo.save(user);
      } else {
        user = await this.userRepo.getUserByUserName(profileResponse.data.name);
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
        Result.ok<OauthGoogleDTOResponse>({
          accessToken,
          refreshToken,
          username: user.username.value,
        })
      );
    } catch (err) {
      return left(new AppError.UnexpectedError(err.toString()));
    }
  }
}
