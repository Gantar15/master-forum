import { Mapper } from "../../../shared/infra/Mapper";
import { Tag } from "../domain/tag";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export class TagMap implements Mapper<Tag> {
  public static toPersistence(tag: Tag): any {
    return {
      tag_id: tag.id.toString(),
      title: tag.title,
    };
  }

  public static toDomain(raw: any): Tag {
    const tagOrError = Tag.create(
      {
        title: raw.title,
      },
      new UniqueEntityID(raw.tag_id)
    );

    tagOrError.isFailure ? console.log(tagOrError.getErrorValue()) : "";

    return tagOrError.isSuccess ? tagOrError.getValue() : null;
  }
}
