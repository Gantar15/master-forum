import { Category } from "../domain/category";
import { PostId } from "../domain/postId";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export interface ICategoryRepo {
  exists(categoryId: string): Promise<boolean>;
  addPostToCategory(categoryId: UniqueEntityID, postId: PostId): Promise<void>;
  delete(categoryId: UniqueEntityID): Promise<void>;
  save(category: Category): Promise<void>;
}
