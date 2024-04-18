import { Either, Result, left, right } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { GetPostsByUserDTO } from "./getPostsByUserDTO";
import { IMemberRepo } from "../../../repos/memberRepo";
import { IPostRepo } from "../../../repos/postRepo";
import { IUserRepo } from "../../../../users/repos/userRepo";
import { PostDetails } from "../../../domain/postDetails";
import { UseCase } from "../../../../../shared/core/UseCase";
import { User } from "../../../../users/domain/user";

type Response = Either<AppError.UnexpectedError, Result<PostDetails[]>>;

export class GetPostsByUser implements UseCase<any, Promise<Response>> {
  private postRepo: IPostRepo;
  private memberRepo: IMemberRepo;
  private userRepo: IUserRepo;

  constructor(
    postRepo: IPostRepo,
    memberRepo: IMemberRepo,
    userRepo: IUserRepo
  ) {
    this.postRepo = postRepo;
    this.memberRepo = memberRepo;
    this.userRepo = userRepo;
  }

  public async execute(req: GetPostsByUserDTO): Promise<Response> {
    const { username } = req;

    try {
      let user: User;
      try {
        user = await this.userRepo.getUserByUserName(username);
      } catch (err) {
        return left(new AppError.MessageError("User was not found"));
      }
      const memberId = await this.memberRepo.getMemberIdByUserId(
        user.userId.getStringValue()
      );

      const postsDetails = await this.postRepo.getPostsByMemberId(memberId);

      return right(Result.ok<PostDetails[]>(postsDetails));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
