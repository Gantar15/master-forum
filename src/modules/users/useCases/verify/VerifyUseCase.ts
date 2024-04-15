import { Either, Result, left, right } from "../../../../shared/core/Result";

import { AppError } from "../../../../shared/core/AppError";
import { IUserRepo } from "../../repos/userRepo";
import { UseCase } from "../../../../shared/core/UseCase";
import { User } from "../../domain/user";
import { VerifyDTO } from "./VerifyDTO";

type Response = Either<AppError.UnexpectedError, Result<void>>;

export class VerifyUseCase implements UseCase<VerifyDTO, Promise<Response>> {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute({ code }: VerifyDTO): Promise<Response> {
    let user: User;

    try {
      try {
        user = await this.userRepo.getUserByEmailVerifyCode(code);
      } catch (err) {
        return left(new AppError.MessageError("User not found"));
      }

      user.setIsEmailVerified(true);
      await this.userRepo.save(user);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err.toString()));
    }
  }
}
