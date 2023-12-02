import { CategoryTitle } from "./categoryTitle";
import { Entity } from "../../../shared/domain/Entity";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { TagTitle } from "./tagTitle";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

interface TagProps {
  title: TagTitle;
}

export class Tag extends Entity<TagProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get title(): CategoryTitle {
    return this.props.title;
  }

  private constructor(props: TagProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: TagProps, id?: UniqueEntityID): Result<Tag> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.title, argumentName: "title" },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<Tag>(guardResult.getErrorValue());
    } else {
      return Result.ok<Tag>(new Tag(props, id));
    }
  }
}
