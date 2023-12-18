import { Result, left, right } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { DownvotePostDTO } from "./DownvotePostDTO";
import { DownvotePostErrors } from "./DownvotePostErrors";
import { DownvotePostResponse } from "./DownvotePostResponse";
import { IMemberRepo } from "../../../repos/memberRepo";
import { IPostRepo } from "../../../repos/postRepo";
import { IPostVotesRepo } from "../../../repos/postVotesRepo";
import { Member } from "../../../domain/member";
import { Post } from "../../../domain/post";
import { PostService } from "../../../domain/services/postService";
import { PostVote } from "../../../domain/postVote";
import { UseCase } from "../../../../../shared/core/UseCase";

export class DownvotePost
  implements UseCase<DownvotePostDTO, Promise<DownvotePostResponse>>
{
  private memberRepo: IMemberRepo;
  private postRepo: IPostRepo;
  private postVotesRepo: IPostVotesRepo;
  private postService: PostService;

  constructor(
    memberRepo: IMemberRepo,
    postRepo: IPostRepo,
    postVotesRepo: IPostVotesRepo,
    postService: PostService
  ) {
    this.memberRepo = memberRepo;
    this.postRepo = postRepo;
    this.postVotesRepo = postVotesRepo;
    this.postService = postService;
  }

  public async execute(req: DownvotePostDTO): Promise<DownvotePostResponse> {
    let member: Member;
    let post: Post;
    let existingVotesOnPostByMember: PostVote[];

    try {
      try {
        member = await this.memberRepo.getMemberByUserId(req.userId);
      } catch (err) {
        return left(new DownvotePostErrors.MemberNotFoundError());
      }

      try {
        post = await this.postRepo.getPostBySlug(req.slug);
      } catch (err) {
        return left(new DownvotePostErrors.PostNotFoundError(req.slug));
      }

      existingVotesOnPostByMember =
        await this.postVotesRepo.getVotesForPostByMemberId(
          post.postId,
          member.memberId
        );

      const downvotePostResult = this.postService.downvotePost(
        post,
        member,
        existingVotesOnPostByMember
      );

      if (downvotePostResult.isLeft()) {
        return left(downvotePostResult.value);
      }

      await this.postRepo.save(post);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
