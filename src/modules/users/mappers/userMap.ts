import { Mapper } from "../../../shared/infra/Mapper";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { User } from "../domain/user";
import { UserDTO } from "../dtos/userDTO";
import { UserEmail } from "../domain/userEmail";
import { UserName } from "../domain/userName";
import { UserPassword } from "../domain/userPassword";

export class UserMap implements Mapper<User> {
  public static toDTO(user: User): UserDTO {
    return {
      userId: user.userId.getStringValue(),
      username: user.username.value,
      isEmailVerified: user.isEmailVerified,
      emailVerificationCode: user.emailVerificationCode,
      isAdminUser: user.isAdminUser,
      isManagerUser: user.isManagerUser,
      isDeleted: user.isDeleted,
      isBanned: user.isBanned,
      email: user.email.value,
    };
  }

  public static toDomain(raw: any): User {
    const userNameOrError = UserName.create({ name: raw.username });
    const userPasswordOrError = UserPassword.create({
      value: raw.user_password,
      hashed: true,
    });
    const userEmailOrError = UserEmail.create(raw.user_email);

    const userOrError = User.create(
      {
        username: userNameOrError.getValue(),
        isAdminUser: raw.is_admin_user,
        isManagerUser: raw.is_manager_user,
        isDeleted: raw.is_deleted,
        isBanned: raw.is_banned,
        isEmailVerified: raw.is_email_verified,
        emailVerificationCode: raw.email_verification_code,
        password: userPasswordOrError.getValue(),
        email: userEmailOrError.getValue(),
      },
      new UniqueEntityID(raw.base_user_id)
    );

    userOrError.isFailure ? console.log(userOrError.getErrorValue()) : "";

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static async toPersistence(user: User): Promise<any> {
    let password: string = null;
    if (!!user.password === true) {
      if (user.password.isAlreadyHashed()) {
        password = user.password.value;
      } else {
        password = await user.password.getHashedValue();
      }
    }

    return {
      base_user_id: user.userId.getStringValue(),
      user_email: user.email.value,
      is_email_verified: user.isEmailVerified,
      email_verification_code: user.emailVerificationCode,
      username: user.username.value,
      user_password: password,
      is_admin_user: user.isAdminUser,
      is_manager_user: user.isManagerUser,
      is_deleted: user.isDeleted,
      is_banned: user.isBanned,
    };
  }
}
