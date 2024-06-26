import { Comment } from "../../domain/comment";
import { CommentDetails } from "../../domain/commentDetails";
import { CommentDetailsMap } from "../../mappers/commentDetailsMap";
import { CommentId } from "../../domain/commentId";
import { CommentMap } from "../../mappers/commentMap";
import { CommentVotes } from "../../domain/commentVotes";
import { ICommentRepo } from "../commentRepo";
import { ICommentVotesRepo } from "../commentVotesRepo";
import { MemberId } from "../../domain/memberId";

export class CommentRepo implements ICommentRepo {
  private models: any;
  private commentVotesRepo: ICommentVotesRepo;

  constructor(models: any, commentVotesRepo: ICommentVotesRepo) {
    this.models = models;
    this.commentVotesRepo = commentVotesRepo;
  }

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  private createBaseDetailsQuery(): any {
    const models = this.models;
    return {
      where: {},
      include: [
        { model: models.Post, as: "Post", where: {} },
        {
          model: models.Member,
          as: "Member",
          include: [{ model: models.BaseUser, as: "BaseUser" }],
        },
      ],
      limit: 15,
      offset: 0,
    };
  }

  async exists(commentId: string): Promise<boolean> {
    const CommentModel = this.models.Comment;
    const detailsQuery = this.createBaseQuery();
    detailsQuery.where["comment_id"] = commentId;
    const comment = await CommentModel.findOne(detailsQuery);
    const found = !!comment === true;
    return found;
  }

  async getCommentDetailsByPostSlug(
    slug: string,
    memberId?: MemberId
  ): Promise<CommentDetails[]> {
    const CommentModel = this.models.Comment;
    const detailsQuery = this.createBaseDetailsQuery();
    detailsQuery.include[0].where["slug"] = slug;

    if (!!memberId === true) {
      detailsQuery.include.push({
        model: this.models.CommentVote,
        as: "CommentVotes",
        where: { member_id: memberId.getStringValue() },
        required: false,
      });
    }

    const comments = await CommentModel.findAll(detailsQuery);
    return comments.map((c) => CommentDetailsMap.toDomain(c));
  }

  async getCommentsDetailsByMemberId(
    authorId: MemberId,
    viewerId?: MemberId
  ): Promise<CommentDetails[]> {
    const CommentModel = this.models.Comment;
    const detailsQuery = this.createBaseDetailsQuery();
    detailsQuery.where = {
      member_id: authorId.getStringValue(),
    };
    if (viewerId) {
      detailsQuery.include.push({
        model: this.models.CommentVote,
        as: "CommentVotes",
        where: { member_id: viewerId.getStringValue() },
        required: false,
      });
    }
    const comments = await CommentModel.findAll(detailsQuery);
    return comments.map((c) => CommentDetailsMap.toDomain(c));
  }

  async getCommentByCommentId(commentId: string): Promise<Comment> {
    const CommentModel = this.models.Comment;
    const detailsQuery = this.createBaseQuery();
    detailsQuery.where["comment_id"] = commentId;
    const comment = await CommentModel.findOne(detailsQuery);
    const found = !!comment === true;
    if (!found) throw new Error("Comment not found");
    return CommentMap.toDomain(comment);
  }

  async getCommentDetailsByCommentId(
    commentId: string,
    memberId?: MemberId
  ): Promise<CommentDetails> {
    const CommentModel = this.models.Comment;
    const detailsQuery = this.createBaseDetailsQuery();
    detailsQuery.where["comment_id"] = commentId;

    if (!!memberId === true) {
      detailsQuery.include.push({
        model: this.models.CommentVote,
        as: "CommentVotes",
        where: { member_id: memberId.getStringValue() },
        required: false,
      });
    }

    const comment = await CommentModel.findOne(detailsQuery);
    const found = !!comment === true;
    if (!found) throw new Error("Comment not found");
    return CommentDetailsMap.toDomain(comment);
  }

  async deleteComment(commentId: CommentId): Promise<void> {
    const CommentModel = this.models.Comment;
    await CommentModel.destroy({
      where: { parent_comment_id: commentId.getStringValue() },
    });
    await CommentModel.destroy({
      where: { comment_id: commentId.getStringValue() },
    });
  }

  private saveCommentVotes(commentVotes: CommentVotes) {
    return this.commentVotesRepo.saveBulk(commentVotes);
  }

  async save(comment: Comment): Promise<void> {
    const CommentModel = this.models.Comment;
    const exists = await this.exists(comment.commentId.getStringValue());
    const rawSequelizeComment = CommentMap.toPersistence(comment);

    if (!exists) {
      try {
        await CommentModel.create(rawSequelizeComment);
        await this.saveCommentVotes(comment.getVotes());
      } catch (err) {
        throw new Error(err.toString());
      }
    } else {
      await this.saveCommentVotes(comment.getVotes());

      await CommentModel.update(rawSequelizeComment, {
        where: { comment_id: comment.commentId.getStringValue() },
      });
    }
  }

  async saveBulk(comments: Comment[]): Promise<void> {
    for (let comment of comments) {
      await this.save(comment);
    }
  }
}
