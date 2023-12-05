import { Tag } from "../domain/tag";
import { TagTitle } from "../domain/tagTitle";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export interface ITagRepo {
  exists(tagId: string): Promise<boolean>;
  getTagByTitle(tagTitle: TagTitle): Promise<Tag>;
  delete(tagId: UniqueEntityID): Promise<void>;
  save(tag: Tag): Promise<void>;
}
