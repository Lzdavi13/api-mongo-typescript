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
    const newUser = await this.userModel.create(user);

    return newUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find({});

    return users;
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    const userUpdated = await this.userModel.findByIdAndUpdate(id, user);

    return userUpdated as User;
  }
}
