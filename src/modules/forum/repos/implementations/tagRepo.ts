import { ITagRepo } from "../tagRepo";
import { PostId } from "../../domain/postId";
import { Tag } from "../../domain/tag";
import { TagMap } from "../../mappers/TagMap";
import { TagTitle } from "../../domain/tagTitle";
import { Tags } from "../../domain/tags";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";

export class TagRepo implements ITagRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  async exists(tagId: string): Promise<boolean> {
    const TagModel = this.models.Tag;
    const baseQuery = this.createBaseQuery();
    baseQuery.where["tag_id"] = tagId;
    const tagInstance = await TagModel.findOne(baseQuery);
    const found = !!tagInstance === true;
    return found;
  }

  async getTagByTitle(tagTitle: TagTitle): Promise<Tag> {
    const TagModel = this.models.Tag;
    const baseQuery = this.createBaseQuery();
    baseQuery.where["title"] = tagTitle.value;
    const tagInstance = await TagModel.findOne(baseQuery);
    const found = !!tagInstance === true;
    if (!found) throw new Error("Tag not found");
    return TagMap.toDomain(tagInstance);
  }

  async delete(tagId: UniqueEntityID): Promise<void> {
    const TagModel = this.models.Tag;
    const baseQuery = this.createBaseQuery();
    baseQuery.where["tag_id"] = tagId.toString();
    await TagModel.destroy(baseQuery);
  }

  async save(tag: Tag): Promise<void> {
    const TagModel = this.models.Tag;
    const exists = await this.exists(tag.id.toString());
    const rawSequelizeTag = TagMap.toPersistence(tag);

    if (!exists) {
      try {
        await TagModel.create(rawSequelizeTag);
      } catch (err) {
        throw new Error(err.toString());
      }
    } else {
      const tagInstance = await TagModel.findOne({
        where: { tag_id: tag.id.toString() },
      });
      await tagInstance.update(rawSequelizeTag);
    }
  }
}
