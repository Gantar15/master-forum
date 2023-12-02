import { CategoryTitle } from "./categoryTitle";
import { Entity } from "../../../shared/domain/Entity";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

interface CategoryProps {
  title: CategoryTitle;
}

export class Category extends Entity<CategoryProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get title(): CategoryTitle {
    return this.props.title;
  }

  private constructor(props: CategoryProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: CategoryProps,
    id?: UniqueEntityID
  ): Result<Category> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.title, argumentName: "title" },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<Category>(guardResult.getErrorValue());
    } else {
      return Result.ok<Category>(new Category(props, id));
    }
  }
}
