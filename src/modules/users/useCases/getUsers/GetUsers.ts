import { Either, Result, left, right } from "../../../../shared/core/Result";

import { AppError } from "../../../../shared/core/AppError";
import { IUserRepo } from "../../repos/userRepo";
import { UseCase } from "../../../../shared/core/UseCase";
import { User } from "../../domain/user";

type Response = Either<AppError.UnexpectedError, Result<User[]>>;

export class GetUsers implements UseCase<undefined, Promise<Response>> {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(): Promise<Response> {
    try {
      const users = await this.userRepo.getUsers();
      return right(Result.ok(users));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
