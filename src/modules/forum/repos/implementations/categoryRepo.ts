import { ICategoryRepo } from "../categoryRepo";
import { PostId } from "../../domain/postId";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";

export class CategoryRepo implements ICategoryRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  async addPostToCategory(
    categoryId: UniqueEntityID,
    postId: PostId
  ): Promise<void> {
    const CategoryModel = this.models.Category;
    CategoryModel.add;
  }
}
