import { User } from "../domain/user";
import { UserEmail } from "../domain/userEmail";
import { UserId } from "../domain/userId";
import { UserName } from "../domain/userName";

export interface IUserRepo {
  exists(userEmail: UserEmail): Promise<boolean>;
  getUserByUserId(userId: string): Promise<User>;
  getUserByUserName(userName: UserName | string): Promise<User>;
  getUserByEmailVerifyCode(code: string): Promise<User>;
  getUsers(): Promise<User[]>;
  delete(userId: UserId): Promise<void>;
  save(user: User): Promise<void>;
}
