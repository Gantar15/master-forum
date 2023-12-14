import { Either, Result, left, right } from "../../../../shared/core/Result";

import { AppError } from "../../../../shared/core/AppError";
import { CreateUserDTO } from "./CreateUserDTO";
import { CreateUserErrors } from "./CreateUserErrors";
import { IUserRepo } from "../../repos/userRepo";
import { UseCase } from "../../../../shared/core/UseCase";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/userEmail";
import { UserName } from "../../domain/userName";
import { UserPassword } from "../../domain/userPassword";

type Response = Either<
  | CreateUserErrors.EmailAlreadyExistsError
  | CreateUserErrors.UsernameTakenError
  | AppError.UnexpectedError
  | AppError.MessageError,
  Result<User>
>;

export class CreateUserUseCase
  implements UseCase<CreateUserDTO, Promise<Response>>
{
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(request: CreateUserDTO): Promise<Response> {
    const emailOrError = UserEmail.create(request.email);
    const passwordOrError = UserPassword.create({ value: request.password });
    const usernameOrError = UserName.create({ name: request.username });

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

    const email: UserEmail = emailOrError.getValue();
    const password: UserPassword = passwordOrError.getValue();
    const username: UserName = usernameOrError.getValue();

    try {
      const userAlreadyExists = await this.userRepo.exists(email);

      if (userAlreadyExists) {
        return left(
          new CreateUserErrors.EmailAlreadyExistsError(email.value)
        ) as Response;
      }

      try {
        const alreadyCreatedUserByUserName =
          await this.userRepo.getUserByUserName(username);

        const userNameTaken = !!alreadyCreatedUserByUserName === true;

        if (userNameTaken) {
          return left(
            new CreateUserErrors.UsernameTakenError(username.value)
          ) as Response;
        }
      } catch (err) {}

      const userOrError: Result<User> = User.create({
        email,
        password,
        username,
        isAdminUser: request.isAdminUser && request.role === "admin",
        isManagerUser: request.isAdminUser && request.role === "manager",
      });

      if (userOrError.isFailure) {
        return left(
          new AppError.MessageError(userOrError.getErrorValue().toString())
        );
      }

      const user: User = userOrError.getValue();

      await this.userRepo.save(user);

      return right(Result.ok<User>(user));
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
