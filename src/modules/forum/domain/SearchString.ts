import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface SearchStringProps {
  value: string;
}

export class SearchString extends ValueObject<SearchStringProps> {
  public static minLength: number = 2;
  public static maxLength: number = 100;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: SearchStringProps) {
    super(props);
  }

  public static create(props: SearchStringProps): Result<SearchString> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      "SearchString"
    );

    if (nullGuardResult.isFailure) {
      return Result.fail<SearchString>(nullGuardResult.getErrorValue());
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (minGuardResult.isFailure) {
      return Result.fail<SearchString>(minGuardResult.getErrorValue());
    }

    if (maxGuardResult.isFailure) {
      return Result.fail<SearchString>(maxGuardResult.getErrorValue());
    }

    return Result.ok<SearchString>(new SearchString(props));
  }
}
