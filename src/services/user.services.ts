import { genSalt, hash } from "bcrypt";
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

    const userFound = await this.usersRepository.findByEmail(user.email);

    if (userFound) {
      throw new Error("Email já esta cadastrado");
    }

    const saltGenerated = await genSalt(8);

    const encryptedPassword = await hash(user.password, saltGenerated);

    const _user = { ...user, password: encryptedPassword } as User;

    const newUser = await this.usersRepository.createUser(_user);
    if (newUser === null) {
      throw new Error("Não foi possivel salvar o usuario");
    }

    return newUser;
  }

  async findUser(id: string): Promise<UserDTO> {
    const userFound = await this.usersRepository.findUser(id);

    if (userFound === null) {
      throw new Error("Não foi possivel encontrar o usuario");
    }

    return userFound;
  }

  async findAllUsers(): Promise<User[]> {
    const listUsers = await this.usersRepository.findAll();

    return listUsers;
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    await this.findUser(id);

    if (user.password) {
      const saltGenerated = await genSalt(8);

      const encryptedPassword = await hash(user.password, saltGenerated);
      await this.usersRepository.updateUser(id, {
        password: encryptedPassword,
      });
    }

    const { password, ...userForUpdate } = user;

    const userUpdated = await this.usersRepository.updateUser(
      id,
      userForUpdate
    );

    return userUpdated;
  }

  async deleteUser(id: string): Promise<string> {
    await this.findUser(id);
    await this.usersRepository.deleteUser(id);

    return "Usuario deletado com sucesso";
  }
}
