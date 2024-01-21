import { Model } from "mongoose";
import { User } from "../model/users.model";
import { IUsersRepository } from "./IUsersRepository";
import { UserDTO } from "./UserDTO";

export class UsersRepository implements IUsersRepository {
  constructor(private readonly userModel: Model<User>) {}

  async findUser(id: string): Promise<UserDTO | null> {
    const user = await this.userModel.findOne({ _id: id });
    console.log(user);

    return user;
  }

  async createUser(user: User): Promise<UserDTO> {
    const newUser = this.userModel.create(user);

    return newUser;
  }
}
