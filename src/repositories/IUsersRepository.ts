import { User } from "../model/users.model";
import { UserDTO } from "./UserDTO";

export interface IUsersRepository {
  findUser(id: string): Promise<UserDTO | null>;
  createUser(user: User): Promise<UserDTO>;
  findAll(): Promise<User[]>;
}
