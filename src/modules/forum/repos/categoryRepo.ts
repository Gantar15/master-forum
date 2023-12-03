import { PostId } from "../domain/postId";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export interface ICategoryRepo {
  addPostToCategory(categoryId: UniqueEntityID, postId: PostId): Promise<void>;
}
