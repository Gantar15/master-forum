import { Category } from "../../domain/category";
import { CategoryMap } from "../../mappers/categoryMap";
import { CategoryTitle } from "../../domain/categoryTitle";
import { ICategoryRepo } from "../categoryRepo";
import { IPostRepo } from "../postRepo";
import { PostId } from "../../domain/postId";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";

export class CategoryRepo implements ICategoryRepo {
  private models: any;
  private postRepo: IPostRepo;

  constructor(models: any, postRepo: IPostRepo) {
    this.models = models;
    this.postRepo = postRepo;
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
      include: [{ model: models.Post, as: "Posts", where: {} }],
    };
  }

  async exists(categoryId: string): Promise<boolean> {
    const CategoryModel = this.models.Category;
    const baseQuery = this.createBaseQuery();
    baseQuery.where["category_id"] = categoryId;
    const categoryInstance = await CategoryModel.findOne(baseQuery);
    const found = !!categoryInstance === true;
    return found;
  }

  async getCategoryByTitle(categoryTitle: CategoryTitle): Promise<Category> {
    const CategoryModel = this.models.Category;
    const baseQuery = this.createBaseQuery();
    baseQuery.where["title"] = categoryTitle.value;
    const categoryInstance = await CategoryModel.findOne(baseQuery);
    const found = !!categoryInstance === true;
    if (!found) throw new Error("Category not found");
    return CategoryMap.toDomain(categoryInstance);
  }

  async delete(categoryId: UniqueEntityID): Promise<void> {
    const CategoryModel = this.models.Category;
    const baseQuery = this.createBaseQuery();
    baseQuery.where["category_id"] = categoryId.toValue();
    await CategoryModel.destroy(baseQuery);
  }

  async addPostToCategory(
    categoryId: UniqueEntityID,
    postId: PostId
  ): Promise<void> {
    const CategoryModel = this.models.Category;

    const postInstance = await this.postRepo.getNumberOfCommentsByPostId(
      postId
    );
    const baseQuery = this.createBaseQuery();
    baseQuery.where["category_id"] = categoryId.toValue();
    const categoryInstance = await CategoryModel.findOne(baseQuery);

    if (!postInstance) {
      throw new Error(`Post ${postId.getValue()} was not found`);
    }
    if (!categoryInstance) {
      throw new Error(`Category ${categoryId.toValue()} was not found`);
    }

    await categoryInstance.addPost(postInstance);
  }

  async save(category: Category): Promise<void> {
    const CategoryModel = this.models.Category;
    const exists = await this.exists(category.id.toString());
    const rawSequelizeCategory = CategoryMap.toPersistence(category);

    if (!exists) {
      try {
        await CategoryModel.create(rawSequelizeCategory);
      } catch (err) {
        throw new Error(err.toString());
      }
    } else {
      const categoryInstance = await CategoryModel.findOne({
        where: { category_id: category.id.toString() },
      });
      await categoryInstance.update(rawSequelizeCategory);
    }
  }
}
