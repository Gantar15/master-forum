import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { UserName } from "../../users/domain/userName";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface MemberDetailsProps {
  username: UserName;
  reputation: number;
  isAdminUser?: boolean;
  isManagerUser?: boolean;
  isDeleted?: boolean;
  isBanned?: boolean;
}

/**
 * @desc Read model for member
 */

export class MemberDetails extends ValueObject<MemberDetailsProps> {
  get username(): UserName {
    return this.props.username;
  }

  get reputation(): number {
    return this.props.reputation;
  }

  get isAdminUser(): boolean {
    return this.props.isAdminUser;
  }

  get isManagerUser(): boolean {
    return this.props.isManagerUser;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  get isBanned(): boolean {
    return this.props.isBanned;
  }

  private constructor(props: MemberDetailsProps) {
    super(props);
  }

  public static create(props: MemberDetailsProps): Result<MemberDetails> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.username, argumentName: "username" },
      { argument: props.reputation, argumentName: "reputation" },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<MemberDetails>(guardResult.getErrorValue());
    }

    return Result.ok<MemberDetails>(
      new MemberDetails({
        ...props,
        isAdminUser: props.isAdminUser ? props.isAdminUser : false,
        isManagerUser: props.isManagerUser ? props.isManagerUser : false,
        isDeleted: props.isDeleted ? props.isDeleted : false,
        isBanned: props.isBanned ? props.isBanned : false,
      })
    );
  }
}
