import { Category } from "../domain/category";
import { CategoryDTO } from "../dtos/categoryDTO";
import { CategoryTitle } from "../domain/categoryTitle";
import { PostId } from "../domain/postId";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export interface ICategoryRepo {
  exists(categoryId: string): Promise<boolean>;
  getCategories(): Promise<Category[]>;
  getTopCategories(count: number): Promise<CategoryDTO[]>;
  getCategoryByTitle(categoryTitle: CategoryTitle): Promise<Category>;
  addPostToCategory(categoryId: UniqueEntityID, postId: PostId): Promise<void>;
  delete(categoryId: UniqueEntityID): Promise<void>;
  deleteByTitle(categoryTitle: CategoryTitle): Promise<void>;
  save(category: Category): Promise<void>;
}
