import { IPostRepo } from "../postRepo";
import { PostId } from "../../domain/postId";
import { Post } from "../../domain/post";
import { PostMap } from "../../mappers/postMap";
import { PostDetails } from "../../domain/postDetails";
import { PostDetailsMap } from "../../mappers/postDetailsMap";
import { ICommentRepo } from "../commentRepo";
import { IPostVotesRepo } from "../postVotesRepo";
import { PostVotes } from "../../domain/postVotes";
import { Comments } from "../../domain/comments";
import { Tags } from "../../domain/tags";
import { PostTitle } from "../../domain/postTitle";
import { MemberId } from "../../domain/memberId";

export class PostRepo implements IPostRepo {
  private models: any;
  private commentRepo: ICommentRepo;
  private postVotesRepo: IPostVotesRepo;

  constructor(
    models: any,
    commentRepo: ICommentRepo,
    postVotesRepo: IPostVotesRepo
  ) {
    this.models = models;
    this.commentRepo = commentRepo;
    this.postVotesRepo = postVotesRepo;
  }

  private createBaseQuery(): any {
    const models = this.models;
    return {
      where: {},
      include: [
        {
          model: models.Category,
          as: "Category",
        },
        {
          model: models.Tag,
          as: "tags",
        },
      ],
    };
  }

  private createBaseDetailsQuery(): any {
    const models = this.models;
    return {
      where: {},
      include: [
        {
          model: models.Member,
          as: "Member",
          include: [{ model: models.BaseUser, as: "BaseUser" }],
        },
        {
          model: models.Category,
          as: "Category",
        },
        {
          model: models.Tag,
          as: "tags",
        },
      ],
      limit: 15,
      offset: 0,
    };
  }

  public async getPostByPostId(postId: PostId | string): Promise<Post> {
    postId =
      postId instanceof PostId ? (<PostId>postId).getStringValue() : postId;
    const PostModel = this.models.Post;
    const detailsQuery = this.createBaseQuery();
    detailsQuery.where["post_id"] = postId;
    const post = await PostModel.findOne(detailsQuery);
    const found = !!post === true;
    if (!found) throw new Error("Post not found");
    return PostMap.toDomain(post);
  }

  public async getNumberOfCommentsByPostId(
    postId: PostId | string
  ): Promise<number> {
    postId =
      postId instanceof PostId ? (<PostId>postId).getStringValue() : postId;

    const result = await this.models.sequelize.query(
      `SELECT COUNT(*) FROM comment WHERE post_id = "${postId}";`
    );
    const count = result[0][0]["COUNT(*)"];
    return count;
  }

  public async getPostDetailsBySlug(
    slug: string,
    memberId?: MemberId
  ): Promise<PostDetails> {
    const PostModel = this.models.Post;
    const detailsQuery = this.createBaseDetailsQuery();
    detailsQuery.where["slug"] = slug;

    if (!!memberId === true) {
      detailsQuery.include.push({
        model: this.models.PostVote,
        as: "Votes",
        where: { member_id: memberId.getStringValue() },
        required: false,
      });
    }

    const post = await PostModel.findOne(detailsQuery);
    const found = !!post === true;
    if (!found) throw new Error("Post not found");
    return PostDetailsMap.toDomain(post);
  }

  async getPostByTitle(postTitle: PostTitle): Promise<Post> {
    const PostModel = this.models.Post;
    const baseQuery = this.createBaseQuery();
    baseQuery.where["title"] = postTitle.value;
    const postInstance = await PostModel.findOne(baseQuery);
    const found = !!postInstance === true;
    if (!found) throw new Error("Post not found");
    return PostMap.toDomain(postInstance);
  }

  public async getRecentPosts(
    offset?: number,
    memberId?: MemberId
  ): Promise<PostDetails[]> {
    const PostModel = this.models.Post;
    const detailsQuery = this.createBaseDetailsQuery();
    detailsQuery.offset = offset ? offset : detailsQuery.offset;

    if (!!memberId === true) {
      detailsQuery.include.push({
        model: this.models.PostVote,
        as: "Votes",
        where: { member_id: memberId.getStringValue() },
        required: false,
      });
    }

    const posts = await PostModel.findAll(detailsQuery);
    return posts.map((p) => PostDetailsMap.toDomain(p));
  }

  public async getPopularPosts(
    offset?: number,
    memberId?: MemberId
  ): Promise<PostDetails[]> {
    const PostModel = this.models.Post;
    const detailsQuery = this.createBaseDetailsQuery();
    detailsQuery.offset = offset ? offset : detailsQuery.offset;
    detailsQuery["order"] = [["points", "DESC"]];

    if (!!memberId === true) {
      detailsQuery.include.push({
        model: this.models.PostVote,
        as: "Votes",
        where: { member_id: memberId.getStringValue() },
        required: false,
      });
    }

    const posts = await PostModel.findAll(detailsQuery);
    return posts.map((p) => PostDetailsMap.toDomain(p));
  }

  public async getPostBySlug(slug: string): Promise<Post> {
    const PostModel = this.models.Post;
    const detailsQuery = this.createBaseQuery();
    detailsQuery.where["slug"] = slug;
    const post = await PostModel.findOne(detailsQuery);
    const found = !!post === true;
    if (!found) throw new Error("Post not found");
    return PostMap.toDomain(post);
  }

  public async exists(postId: PostId): Promise<boolean> {
    const PostModel = this.models.Post;
    const baseQuery = this.createBaseQuery();
    baseQuery.where["post_id"] = postId.getStringValue();
    const post = await PostModel.findOne(baseQuery);
    const found = !!post === true;
    return found;
  }

  public delete(postId: PostId): Promise<void> {
    const PostModel = this.models.Post;
    return PostModel.destroy({ where: { post_id: postId.getStringValue() } });
  }

  public deleteBySlug(slug: string): Promise<void> {
    const PostModel = this.models.Post;
    return PostModel.destroy({ where: { slug: slug } });
  }

  private saveComments(comments: Comments) {
    return this.commentRepo.saveBulk(comments.getItems());
  }

  private savePostVotes(postVotes: PostVotes) {
    return this.postVotesRepo.saveBulk(postVotes);
  }

  private async setTagsToPost(postId: PostId, tags: Tags) {
    const PostModel = this.models.Post;
    const tagsIds = tags.getItems().map((tag) => tag.id.toString());
    const detailsQuery = this.createBaseQuery();
    detailsQuery.where["post_id"] = postId.getStringValue();
    const postInstance = await PostModel.findOne(detailsQuery);
    return postInstance.setTags(tagsIds);
  }

  public async save(post: Post): Promise<void> {
    const PostModel = this.models.Post;
    const exists = await this.exists(post.postId);
    const isNewPost = !exists;
    const rawSequelizePost = await PostMap.toPersistence(post);

    if (isNewPost) {
      try {
        await PostModel.create(rawSequelizePost);
        await this.saveComments(post.comments);
        await this.savePostVotes(post.getVotes());
        await this.setTagsToPost(post.postId, post.tags);
      } catch (err) {
        await this.delete(post.postId);
        throw new Error(err.toString());
      }
    } else {
      // Save non-aggregate tables before saving the aggregate
      // so that any domain events on the aggregate get dispatched
      await this.saveComments(post.comments);
      await this.savePostVotes(post.getVotes());
      await this.setTagsToPost(post.postId, post.tags);

      await PostModel.update(rawSequelizePost, {
        // To make sure your hooks always run, make sure to include this in
        // the query
        individualHooks: true,
        hooks: true,
        where: { post_id: post.postId.getStringValue() },
      });
    }
  }
}
