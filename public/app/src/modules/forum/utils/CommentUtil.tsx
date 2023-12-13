import { Comment } from '../models/Comment';
import { CommentDTO } from '../dtos/commentDTO';

export class CommentUtil {
  public static maxCommentLength: number = 10000;
  public static minCommentLength: number = 20;

  private static sortByDateDesc(a: Comment, b: Comment) {
    return Number(new Date(a.createdAt)) - Number(new Date(b.createdAt));
  }

  public static toViewModel(dto: CommentDTO): Comment {
    return {
      postSlug: dto.postSlug,
      commentId: dto.commentId,
      parentCommentId: dto.parentCommentId,
      text: dto.text,
      member: {
        username: dto.member.user.username,
        reputation: dto.member.reputation
      },
      wasUpvotedByMe: dto.wasUpvotedByMe,
      wasDownvotedByMe: dto.wasDownvotedByMe,
      createdAt: dto.createdAt,
      childComments: [],
      postTitle: dto.postTitle,
      points: dto.points
    };
  }

  public static computeCommentsAfterUpdate(
    comments: Comment[],
    updateCommentId: string,
    updateComment: (comment: Comment) => Comment
  ): Comment[] {
    return [
      ...comments.map((comment) =>
        comment.commentId === updateCommentId
          ? updateComment(comment)
          : {
              ...comment,
              childComments: [
                ...this.computeCommentsAfterUpdate(
                  comment.childComments,
                  updateCommentId,
                  updateComment
                )
              ]
            }
      )
    ];
  }

  public static computeCommentsAfterDelete(
    comments: Comment[],
    deleteCommentId: string
  ): Comment[] {
    const newComments: Comment[] = [];
    for (let index = 0; index < comments.length; index++) {
      const comment = comments[index];
      if (comment.commentId === deleteCommentId) {
        continue;
      } else {
        const childComments = this.computeCommentsAfterDelete(
          comment.childComments,
          deleteCommentId
        );
        comment.childComments = childComments;
        newComments.push(comment);
      }
    }
    return newComments;
  }

  public static computeCommentAfterUpvote(comment: Comment): Comment {
    return {
      ...comment,
      wasDownvotedByMe: false,
      wasUpvotedByMe: !comment.wasDownvotedByMe,
      points: comment.wasUpvotedByMe ? comment.points : comment.points + 1
    };
  }

  public static computeCommentAfterDownvote(comment: Comment): Comment {
    return {
      ...comment,
      wasUpvotedByMe: false,
      wasDownvotedByMe: !comment.wasUpvotedByMe,
      points: comment.wasDownvotedByMe ? comment.points : comment.points - 1
    };
  }

  public static getSortedComments(comments: Comment[]): Comment[] {
    comments.forEach((c) => {
      const hasParentComment = !!c.parentCommentId === true;
      if (hasParentComment) {
        // get the index of the parent comment
        const parentCommentIndex = comments.findIndex(
          (cc) => cc.commentId === c.parentCommentId
        );

        if (parentCommentIndex !== -1) {
          comments[parentCommentIndex].childComments.push(c);

          // Sort
          comments[parentCommentIndex].childComments = comments[
            parentCommentIndex
          ].childComments.sort(this.sortByDateDesc);
        }
      }
    });

    return comments.filter((c) => !!c.parentCommentId === false);
  }

  public static getThread(
    parentCommentId: string,
    comments: Comment[]
  ): Comment[] {
    const tree = [];

    for (const comment of comments) {
      if (comment.parentCommentId === parentCommentId) {
        const childComments = this.getThread(comment.commentId, comments);
        comment.childComments = childComments;
        tree.push(comment);
      }
    }

    return tree;
  }
}
