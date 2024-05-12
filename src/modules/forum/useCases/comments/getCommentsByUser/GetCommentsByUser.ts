import { Either, Result, left, right } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { CommentDetails } from "../../../domain/commentDetails";
import { GetCommentsByUserErrors } from "./GetCommentsByUserErrors";
import { GetCommentsByUserRequestDTO } from "./GetCommentsByUserRequestDTO";
import { ICommentRepo } from "../../../repos/commentRepo";
import { IMemberRepo } from "../../../repos/memberRepo";
import { Member } from "../../../domain/member";
import { MemberId } from "../../../domain/memberId";
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
    let authorMember: Member;
    let viewerMember: Member;
    let viewerId: MemberId | undefined = undefined;
    let comments: CommentDetails[];
    const { authorUsername } = req;

    try {
      authorMember = await this.memberRepo.getMemberByUserName(authorUsername);
    } catch (err) {
      return left(
        new GetCommentsByUserErrors.UserNotFoundError(authorUsername)
      );
    }
    const authorId = authorMember.memberId;

    if (req.viewerUserId) {
      try {
        viewerMember = await this.memberRepo.getMemberByUserId(
          req.viewerUserId
        );
      } catch (err) {
        return left(
          new GetCommentsByUserErrors.UserNotFoundError(req.viewerUserId)
        );
      }
      viewerId = viewerMember.memberId;
    }

    try {
      comments = await this.commentRepo.getCommentsDetailsByMemberId(
        authorId,
        viewerId
      );

      return right(Result.ok<CommentDetails[]>(comments));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
