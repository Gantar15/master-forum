import { IUserRepo } from "../userRepo";
import { UserName } from "../../domain/userName";
import { User } from "../../domain/user";
import { UserMap } from "../../mappers/userMap";
import { UserEmail } from "../../domain/userEmail";
import { UserId } from "../../domain/userId";

export class SequelizeUserRepo implements IUserRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  async exists(userEmailOrId: UserEmail): Promise<boolean>;
  async exists(userId: UserId): Promise<boolean>;
  async exists(userEmailOrId: UserEmail | UserId): Promise<boolean> {
    const BaseUserModel = this.models.BaseUser;

    if (userEmailOrId instanceof UserEmail) {
      const baseUser = await BaseUserModel.findOne({
        where: {
          user_email: userEmailOrId.value,
        },
      });
      return !!baseUser === true;
    } else if (userEmailOrId instanceof UserId) {
      const baseUser = await BaseUserModel.findOne({
        where: {
          base_user_id: userEmailOrId.getStringValue(),
        },
      });
      return !!baseUser === true;
    }
  }

  async getUserByUserName(userName: UserName | string): Promise<User> {
    const BaseUserModel = this.models.BaseUser;
    const nameString =
      userName instanceof UserName ? (<UserName>userName).value : userName;
    const baseUser = await BaseUserModel.findOne({
      where: {
        username: nameString,
      },
    });
    if (!!baseUser === false) throw new Error("User not found.");
    return UserMap.toDomain(baseUser);
  }

  async getUserByUserId(userId: string): Promise<User> {
    const BaseUserModel = this.models.BaseUser;
    const baseUser = await BaseUserModel.findOne({
      where: {
        base_user_id: userId,
      },
    });
    if (!!baseUser === false) throw new Error("User not found.");
    return UserMap.toDomain(baseUser);
  }

  async getUserByEmailVerifyCode(code: string) {
    const BaseUserModel = this.models.BaseUser;
    const baseUser = await BaseUserModel.findOne({
      where: {
        email_verification_code: code,
      },
    });
    if (!!baseUser === false) throw new Error("User not found.");
    return UserMap.toDomain(baseUser);
  }

  async getUsers(): Promise<User[]> {
    const BaseUserModel = this.models.BaseUser;
    const baseUsers = await BaseUserModel.findAll({
      where: {
        is_admin_user: false,
        is_deleted: false,
      },
      order: [["created_at", "DESC"]],
    });
    return baseUsers.map(UserMap.toDomain);
  }

  async delete(userId: UserId): Promise<void> {
    const UserModel = this.models.BaseUser;
    return UserModel.update(
      {
        is_deleted: true,
      },
      {
        where: { base_user_id: userId.getStringValue() },
      }
    );
  }

  async save(user: User): Promise<void> {
    const UserModel = this.models.BaseUser;
    const exists = await this.exists(user.userId);
    const rawSequelizeUser = await UserMap.toPersistence(user);

    if (!exists) {
      await UserModel.create(rawSequelizeUser);
    } else {
      await UserModel.update(rawSequelizeUser, {
        // To make sure your hooks always run, make sure to include this in
        // the query
        individualHooks: true,
        hooks: true,
        where: { base_user_id: user.userId.getStringValue() },
      });
    }

    return;
  }
}
