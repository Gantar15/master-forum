import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { Post, PostProps } from "../../../domain/post";

import { AppError } from "../../../../../shared/core/AppError";
import { Category } from "../../../domain/category";
import { CategoryTitle } from "../../../domain/categoryTitle";
import { CreatePostDTO } from "./CreatePostDTO";
import { CreatePostErrors } from "./CreatePostErrors";
import { ICategoryRepo } from "../../../repos/categoryRepo";
import { IMemberRepo } from "../../../repos/memberRepo";
import { IPostRepo } from "../../../repos/postRepo";
import { ITagRepo } from "../../../repos/tagRepo";
import { Member } from "../../../domain/member";
import { PostLink } from "../../../domain/postLink";
import { PostSlug } from "../../../domain/postSlug";
import { PostText } from "../../../domain/postText";
import { PostTitle } from "../../../domain/postTitle";
import { Tag } from "../../../domain/tag";
import { TagMap } from "../../../mappers/TagMap";
import { Tags } from "../../../domain/tags";
import { UseCase } from "../../../../../shared/core/UseCase";

type Response = Either<
  | CreatePostErrors.MemberDoesntExistError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class CreatePost implements UseCase<CreatePostDTO, Promise<Response>> {
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

  public async execute(request: CreatePostDTO): Promise<Response> {
    let member: Member;
    let title: PostTitle;
    let text: PostText;
    let link: PostLink;
    let slug: PostSlug;
    let post: Post;
    let category: Category;
    let tags: Tags = Tags.create([]);

    const { userId } = request;

    try {
      try {
        member = await this.memberRepo.getMemberByUserId(userId);
      } catch (err) {
        return left(new CreatePostErrors.MemberDoesntExistError());
      }

      const titleOrError = PostTitle.create({ value: request.title });
      if (titleOrError.isFailure) {
        return left(titleOrError);
      }
      title = titleOrError.getValue();

      const existingPost = await this.postRepo.getPostByTitle(title);
      if (existingPost) {
        return left(
          new CreatePostErrors.PostWithSameTitleExistsError(title.value)
        );
      }

      if (request.postType === "text") {
        const textOrError = PostText.create({ value: request.text });

        if (textOrError.isFailure) {
          return left(textOrError);
        }

        text = textOrError.getValue();
      } else {
        const linkOrError = PostLink.create({ url: request.link });

        if (linkOrError.isFailure) {
          return left(linkOrError);
        }

        link = linkOrError.getValue();
      }

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
      } catch (err) {
        return left(
          new CreatePostErrors.CategoryNotFoundError(
            categoryTitleOrError.getValue().value
          )
        );
      }

      const domainTags = request.tags.map((tag) =>
        TagMap.toDomain({ title: tag })
      );
      if (domainTags.includes(null))
        return left(new CreatePostErrors.InvalidTagError());
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
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }

      const slugOrError = PostSlug.create(title);
      if (slugOrError.isFailure) {
        return left(slugOrError);
      }
      slug = slugOrError.getValue();

      const postProps: PostProps = {
        title,
        slug,
        type: request.postType,
        memberId: member.memberId,
        text,
        link,
        category,
        tags: tags,
      };

      const postOrError = Post.create(postProps);

      if (postOrError.isFailure) {
        return left(postOrError);
      }

      post = postOrError.getValue();

      await this.postRepo.save(post);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
