import { Tag } from "../domain/tag";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export interface ITagRepo {
  exists(tagId: string): Promise<boolean>;
  delete(tagId: UniqueEntityID): Promise<void>;
  save(tag: Tag): Promise<void>;
}
