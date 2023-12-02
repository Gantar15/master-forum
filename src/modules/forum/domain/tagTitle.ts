import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface TagTitleProps {
  value: string;
}

export class TagTitle extends ValueObject<TagTitleProps> {
  public static minLength: number = 1;
  public static maxLength: number = 40;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: TagTitleProps) {
    super(props);
  }

  public static create(props: TagTitleProps): Result<TagTitle> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      "tagTitle"
    );

    if (nullGuardResult.isFailure) {
      return Result.fail<TagTitle>(nullGuardResult.getErrorValue());
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (minGuardResult.isFailure) {
      return Result.fail<TagTitle>(minGuardResult.getErrorValue());
    }

    if (maxGuardResult.isFailure) {
      return Result.fail<TagTitle>(maxGuardResult.getErrorValue());
    }

    return Result.ok<TagTitle>(new TagTitle(props));
  }
}
