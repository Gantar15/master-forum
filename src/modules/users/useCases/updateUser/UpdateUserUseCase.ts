import { Either, Result, left, right } from "../../../../shared/core/Result";

import { AppError } from "../../../../shared/core/AppError";
import { IUserRepo } from "../../repos/userRepo";
import { UpdateUserDTO } from "./UpdateUserDTO";
import { UpdateUserErrors } from "./UpdateUserErrors";
import { UseCase } from "../../../../shared/core/UseCase";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/userEmail";
import { UserName } from "../../domain/userName";
import { UserPassword } from "../../domain/userPassword";

type Response = Either<
  AppError.UnexpectedError | UpdateUserErrors.UserNotFoundError,
  Result<void>
>;

export class UpdateUserUseCase
  implements UseCase<UpdateUserDTO, Promise<Response>>
{
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(request: UpdateUserDTO): Promise<any> {
    try {
      if (request.isCurrentUser === false && request.isAdminUser === false) {
        return left(new AppError.MessageError("Access denied"));
      }

      const user = await this.userRepo.getUserByUserId(request.userId);
      const userFound = !!user === true;

      if (!userFound) {
        return left(new UpdateUserErrors.UserNotFoundError());
      }

      let emailOrError = Result.ok(null);
      let passwordOrError = Result.ok(null);
      let usernameOrError = Result.ok(null);
      if (request.email) {
        emailOrError = UserEmail.create(request.email);
      }
      if (request.password) {
        passwordOrError = UserPassword.create({ value: request.password });
      }
      if (request.username) {
        usernameOrError = UserName.create({ name: request.username });
      }

      const dtoResult = Result.combine([
        emailOrError,
        passwordOrError,
        usernameOrError,
      ]);

      if (dtoResult.isFailure) {
        return left(
          new AppError.MessageError(dtoResult.getErrorValue().toString())
        );
      }

      const email: UserEmail = emailOrError.getValue() || user.email;
      const password: UserPassword =
        passwordOrError.getValue() || user.password;
      const username: UserName = usernameOrError.getValue() || user.username;

      const updatedUser = User.create(
        {
          ...user.props,
          email,
          password,
          username,
          isAdminUser: request.role
            ? request.role === "admin"
            : user.isAdminUser,
          isManagerUser: request.role
            ? request.role === "manager"
            : user.isManagerUser,
        },
        user.userId.getValue()
      );

      await this.userRepo.save(updatedUser.getValue());

      return right(Result.ok(updatedUser));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
