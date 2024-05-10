import { Either, Result, left, right } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { CommentDetails } from "../../../domain/commentDetails";
import { GetCommentsByUserErrors } from "./GetCommentsByUserErrors";
import { GetCommentsByUserRequestDTO } from "./GetCommentsByUserRequestDTO";
import { ICommentRepo } from "../../../repos/commentRepo";
import { IMemberRepo } from "../../../repos/memberRepo";
import { Member } from "../../../domain/member";
import { UseCase } from "../../../../../shared/core/UseCase";

type Response = Either<
  GetCommentsByUserErrors.UserNotFoundError | AppError.UnexpectedError,
  Result<CommentDetails[]>
>;

export class GetCommentsByUser implements UseCase<any, Promise<Response>> {
  private commentRepo: ICommentRepo;
  private memberRepo: IMemberRepo;

  constructor(commentRepo: ICommentRepo, memberRepo: IMemberRepo) {
    this.commentRepo = commentRepo;
    this.memberRepo = memberRepo;
  }

  public async execute(req: GetCommentsByUserRequestDTO): Promise<Response> {
    let member: Member;
    let comments: CommentDetails[];
    const { username } = req;

    try {
      member = await this.memberRepo.getMemberByUserName(username);
    } catch (err) {
      return left(new GetCommentsByUserErrors.UserNotFoundError(username));
    }
    const memberId = member.memberId;

    try {
      try {
        comments = await this.commentRepo.getCommentsDetailsByMemberId(
          memberId
        );
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }

      return right(Result.ok<CommentDetails[]>(comments));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
