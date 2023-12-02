import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface CategoryTitleProps {
  value: string;
}

export class CategoryTitle extends ValueObject<CategoryTitleProps> {
  public static minLength: number = 1;
  public static maxLength: number = 50;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: CategoryTitleProps) {
    super(props);
  }

  public static create(props: CategoryTitleProps): Result<CategoryTitle> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      "categoryTitle"
    );

    if (nullGuardResult.isFailure) {
      return Result.fail<CategoryTitle>(nullGuardResult.getErrorValue());
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (minGuardResult.isFailure) {
      return Result.fail<CategoryTitle>(minGuardResult.getErrorValue());
    }

    if (maxGuardResult.isFailure) {
      return Result.fail<CategoryTitle>(maxGuardResult.getErrorValue());
    }

    return Result.ok<CategoryTitle>(new CategoryTitle(props));
  }
}
