import { Either, Result, left, right } from "../../../shared/core/Result";
import { Guard, IGuardArgument } from "../../../shared/core/Guard";

import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Category } from "./category";
import { Comment } from "./comment";
import { CommentPosted } from "./events/commentPosted";
import { CommentVotesChanged } from "./events/commentVotesChanged";
import { Comments } from "./comments";
import { EditPostErrors } from "../useCases/post/editPost/EditPostErrors";
import { MemberId } from "./memberId";
import { PostCreated } from "./events/postCreated";
import { PostId } from "./postId";
import { PostLink } from "./postLink";
import { PostSlug } from "./postSlug";
import { PostText } from "./postText";
import { PostTitle } from "./postTitle";
import { PostType } from "./postType";
import { PostVote } from "./postVote";
import { PostVotes } from "./postVotes";
import { PostVotesChanged } from "./events/postVotesChanged";
import { Tags } from "./tags";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { has } from "lodash";

export type UpdatePostOrLinkResult = Either<
  EditPostErrors.InvalidPostTypeOperationError | Result<any>,
  Result<void>
>;

export interface PostProps {
  memberId: MemberId;
  slug: PostSlug;
  title: PostTitle;
  type: PostType;
  category: Category;
  text?: PostText;
  link?: PostLink;
  comments?: Comments;
  tags: Tags;
  votes?: PostVotes;
  totalNumComments?: number;
  points?: number; // posts can have negative or positive valued points
  dateTimePosted?: string | Date;
}

export class Post extends AggregateRoot<PostProps> {
  get postId(): PostId {
    return PostId.create(this._id).getValue();
  }

  get memberId(): MemberId {
    return this.props.memberId;
  }

  get title(): PostTitle {
    return this.props.title;
  }

  get slug(): PostSlug {
    return this.props.slug;
  }

  get category(): Category {
    return this.props.category;
  }

  get dateTimePosted(): string | Date {
    return this.props.dateTimePosted;
  }

  get comments(): Comments {
    return this.props.comments;
  }

  get points(): number {
    return this.props.points + this.computeVotePoints();
  }

  get tags(): Tags {
    return this.props.tags;
  }

  get link(): PostLink {
    return this.props.link;
  }

  get text(): PostText {
    return this.props.text;
  }

  get type(): PostType {
    return this.props.type;
  }

  get totalNumComments(): number {
    return this.props.totalNumComments;
  }

  public updateTotalNumberComments(numComments: number): void {
    if (numComments >= 0) {
      this.props.totalNumComments = numComments;
    }
  }

  public hasComments(): boolean {
    return this.totalNumComments !== 0;
  }

  public updateTitle(postTitle: PostTitle): UpdatePostOrLinkResult {
    const guardResult = Guard.againstNullOrUndefined(postTitle, "postTitle");

    if (guardResult.isFailure) {
      return left(Result.fail<any>(guardResult.getErrorValue()));
    }

    this.props.title = postTitle;
    return right(Result.ok<void>());
  }

  public updateSlug(postSlug: PostSlug): UpdatePostOrLinkResult {
    const guardResult = Guard.againstNullOrUndefined(postSlug, "postSlug");

    if (guardResult.isFailure) {
      return left(Result.fail<any>(guardResult.getErrorValue()));
    }

    this.props.slug = postSlug;
    return right(Result.ok<void>());
  }

  public updateText(postText: PostText): UpdatePostOrLinkResult {
    if (!this.isTextPost()) {
      return left(new EditPostErrors.InvalidPostTypeOperationError());
    }

    const guardResult = Guard.againstNullOrUndefined(postText, "postText");

    if (guardResult.isFailure) {
      return left(Result.fail<any>(guardResult.getErrorValue()));
    }

    this.props.text = postText;
    return right(Result.ok<void>());
  }

  public updateLink(postLink: PostLink): UpdatePostOrLinkResult {
    if (!this.isLinkPost()) {
      return left(new EditPostErrors.InvalidPostTypeOperationError());
    }

    const guardResult = Guard.againstNullOrUndefined(postLink, "postLink");

    if (guardResult.isFailure) {
      return left(Result.fail<any>(guardResult.getErrorValue()));
    }

    this.props.link = postLink;
    return right(Result.ok<void>());
  }

  public updateCategory(category: Category): UpdatePostOrLinkResult {
    const guardResult = Guard.againstNullOrUndefined(category, "category");

    if (guardResult.isFailure) {
      return left(Result.fail<any>(guardResult.getErrorValue()));
    }

    this.props.category = category;
    return right(Result.ok<void>());
  }

  public updateTags(tags: Tags): UpdatePostOrLinkResult {
    const guardResult = Guard.againstNullOrUndefined(tags, "tags");

    if (guardResult.isFailure) {
      return left(Result.fail<any>(guardResult.getErrorValue()));
    }

    this.props.tags = tags;
    return right(Result.ok<void>());
  }

  public updateType(type: PostType): UpdatePostOrLinkResult {
    const guardResult = Guard.againstNullOrUndefined(type, "type");

    if (guardResult.isFailure) {
      return left(Result.fail<any>(guardResult.getErrorValue()));
    }

    this.props.type = type;
    return right(Result.ok<void>());
  }

  public updatePostScore(
    numPostUpvotes: number,
    numPostDownvotes: number,
    numPostCommentUpvotes: number,
    numPostCommentDownvotes: number
  ) {
    this.props.points =
      numPostUpvotes -
      numPostDownvotes +
      (numPostCommentUpvotes - numPostCommentDownvotes);
  }

  private computeVotePoints(): number {
    let tally = 0;

    for (let vote of this.props.votes.getNewItems()) {
      if (vote.isUpvote()) {
        tally++;
      }

      if (vote.isDownvote()) {
        tally--;
      }
    }

    for (let vote of this.props.votes.getRemovedItems()) {
      if (vote.isUpvote()) {
        tally--;
      }

      if (vote.isDownvote()) {
        tally++;
      }
    }

    return tally;
  }

  public addVote(vote: PostVote): Result<void> {
    this.props.votes.add(vote);
    this.addDomainEvent(new PostVotesChanged(this, vote));
    return Result.ok<void>();
  }

  public removeVote(vote: PostVote): Result<void> {
    this.props.votes.remove(vote);
    this.addDomainEvent(new PostVotesChanged(this, vote));
    return Result.ok<void>();
  }

  private removeCommentIfExists(comment: Comment): void {
    if (this.props.comments.exists(comment)) {
      this.props.comments.remove(comment);
    }
  }

  public addComment(comment: Comment): Result<void> {
    this.removeCommentIfExists(comment);
    this.props.comments.add(comment);
    this.props.totalNumComments++;
    this.addDomainEvent(new CommentPosted(this, comment));
    return Result.ok<void>();
  }

  public updateComment(comment: Comment): Result<void> {
    this.removeCommentIfExists(comment);
    this.props.comments.add(comment);
    this.addDomainEvent(new CommentVotesChanged(this, comment));
    return Result.ok<void>();
  }

  public isLinkPost(): boolean {
    return this.props.type === "link";
  }

  public isTextPost(): boolean {
    return this.props.type === "text";
  }

  public getVotes(): PostVotes {
    return this.props.votes;
  }

  private constructor(props: PostProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static isValidPostType(rawType: string): boolean {
    const linkType: PostType = "link";
    const textType: PostType = "text";
    return rawType === textType || rawType === linkType;
  }

  public static create(props: PostProps, id?: UniqueEntityID): Result<Post> {
    const guardArgs: IGuardArgument[] = [
      { argument: props.memberId, argumentName: "memberId" },
      { argument: props.slug, argumentName: "slug" },
      { argument: props.title, argumentName: "title" },
      { argument: props.type, argumentName: "type" },
      { argument: props.tags, argumentName: "tags" },
      { argument: props.category, argumentName: "category" },
    ];

    if (props.type === "link") {
      guardArgs.push({ argument: props.link, argumentName: "link" });
    } else {
      guardArgs.push({ argument: props.text, argumentName: "text" });
    }

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);

    if (guardResult.isFailure) {
      return Result.fail<Post>(guardResult.getErrorValue());
    }

    if (!this.isValidPostType(props.type)) {
      return Result.fail<Post>("Invalid post type provided.");
    }

    const defaultValues: PostProps = {
      ...props,
      comments: props.comments ? props.comments : Comments.create([]),
      points: has(props, "points") ? props.points : 0,
      dateTimePosted: props.dateTimePosted ? props.dateTimePosted : new Date(),
      totalNumComments: props.totalNumComments ? props.totalNumComments : 0,
      votes: props.votes ? props.votes : PostVotes.create([]),
    };

    const isNewPost = !!id === false;
    const post = new Post(defaultValues, id);

    if (isNewPost) {
      post.addDomainEvent(new PostCreated(post));

      // Create with initial upvote from whomever created the post
      post.addVote(
        PostVote.createUpvote(props.memberId, post.postId).getValue()
      );
    }

    return Result.ok<Post>(post);
  }
}
