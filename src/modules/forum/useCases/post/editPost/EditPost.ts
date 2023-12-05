import { Result, left, right } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { Category } from "../../../domain/category";
import { CategoryTitle } from "../../../domain/categoryTitle";
import { EditPostDTO } from "./EditPostDTO";
import { EditPostErrors } from "./EditPostErrors";
import { EditPostResponse } from "./EditPostResponse";
import { ICategoryRepo } from "../../../repos/categoryRepo";
import { IMemberRepo } from "../../../repos/memberRepo";
import { IPostRepo } from "../../../repos/postRepo";
import { ITagRepo } from "../../../repos/tagRepo";
import { Post } from "../../../domain/post";
import { PostLink } from "../../../domain/postLink";
import { PostSlug } from "../../../domain/postSlug";
import { PostText } from "../../../domain/postText";
import { PostTitle } from "../../../domain/postTitle";
import { Tag } from "../../../domain/tag";
import { TagMap } from "../../../mappers/TagMap";
import { Tags } from "../../../domain/tags";
import { UseCase } from "../../../../../shared/core/UseCase";

export class EditPost
  implements UseCase<EditPostDTO, Promise<EditPostResponse>>
{
  private postRepo: IPostRepo;
  private memberRepo: IMemberRepo;
  private categoryRepo: ICategoryRepo;
  private tagRepo: ITagRepo;

  constructor(
    postRepo: IPostRepo,
    memberRepo: IMemberRepo,
    categoryRepo: ICategoryRepo,
    tagRepo: ITagRepo
  ) {
    this.postRepo = postRepo;
    this.memberRepo = memberRepo;
    this.categoryRepo = categoryRepo;
    this.tagRepo = tagRepo;
  }

  public async execute(request: EditPostDTO): Promise<EditPostResponse> {
    const { userId } = request;

    let post: Post;

    let postTextOrError: Result<PostText>;
    let postText: PostText;

    let postTitleOrError: Result<PostTitle>;
    let postTitle: PostTitle;

    let postLinkOrError: Result<PostLink>;
    let postLink: PostLink;

    let postSlugOrError: Result<PostSlug>;
    let postSlug: PostSlug;

    let category: Category;
    let tags: Tags;

    try {
      try {
        post = await this.postRepo.getPostBySlug(request.slug);
      } catch (err) {
        return left(
          new EditPostErrors.PostNotFoundError(post.postId.getStringValue())
        );
      }

      //check is current user is the owner of the post
      const memberId = await this.memberRepo.getMemberIdByUserId(userId);
      if (!post.memberId.equals(memberId)) {
        return left(new EditPostErrors.ForbiddenError());
      }

      if (request.category) {
        const categoryTitleOrError = CategoryTitle.create({
          value: request.category,
        });
        if (categoryTitleOrError.isFailure) {
          return left(categoryTitleOrError);
        }
        try {
          category = await this.categoryRepo.getCategoryByTitle(
            categoryTitleOrError.getValue()
          );
          post.updateCategory(category);
        } catch (err) {
          return left(
            new EditPostErrors.CategoryNotFoundError(
              categoryTitleOrError.getValue().value
            )
          );
        }
      }

      if (request.tags) {
        const domainTags = request.tags.map((tag) =>
          TagMap.toDomain({ title: tag })
        );
        if (domainTags.includes(null))
          return left(new EditPostErrors.InvalidTagError());
        try {
          for (const tag of domainTags) {
            let tagInstance: Tag;
            try {
              tagInstance = await this.tagRepo.getTagByTitle(tag.title);
            } catch (err) {
              await this.tagRepo.save(tag);
              tagInstance = tag;
            }
            tags.add(tagInstance);
          }
          post.updateTags(tags);
        } catch (err) {
          return left(new AppError.UnexpectedError(err));
        }
      }

      if (request.title) {
        postTitleOrError = PostTitle.create({ value: request.title });
        if (postTitleOrError.isFailure) {
          return left(postTitleOrError);
        }
        postTitle = postTitleOrError.getValue();

        const existingPost = await this.postRepo.getPostByTitle(postTitle);
        if (existingPost) {
          return left(
            new EditPostErrors.PostWithSameTitleExistsError(postTitle.value)
          );
        }

        post.updateTitle(postTitle);

        postSlugOrError = PostSlug.create(postTitle);
        if (postSlugOrError.isFailure) {
          return left(postSlugOrError);
        }
        postSlug = postSlugOrError.getValue();
        post.updateSlug(postSlug);
      }

      if (request.text) {
        postTextOrError = PostText.create({ value: request.text });
        if (postTextOrError.isFailure) {
          return left(postTextOrError);
        }
        postText = postTextOrError.getValue();
        post.updateText(postText);
      } else if (request.link) {
        postLinkOrError = PostLink.create({ url: request.link });
        if (postLinkOrError.isFailure) {
          return left(postLinkOrError);
        }
        postLink = postLinkOrError.getValue();
        post.updateLink(postLink);
      }

      await this.postRepo.save(post);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
