import { User } from "../model/users.model";
import { UserDTO } from "../repositories/UserDTO";
import { UsersRepository } from "../repositories/users.repositoy";

export class UsersServices {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(user: User): Promise<UserDTO> {
    if (!user.name) {
      throw new Error("Preencha os campos corretamente");
    }

    if (!user.email) {
      throw new Error("Preencha os campos corretamente");
    }

    if (!user.password) {
      throw new Error("Preencha os campos corretamente");
    }

    const newUser = await this.usersRepository.createUser(user);
    if (newUser === null) {
      throw new Error("Não foi possivel salvar o usuario");
    }

    return newUser;
  }

  async findUser(id: string): Promise<UserDTO> {
    const userFound = await this.usersRepository.findUser(id);

    console.log(userFound);

    if (userFound === null) {
      throw new Error("Não foi possivel encontrar o usuario");
    }

    return userFound;
  }
}