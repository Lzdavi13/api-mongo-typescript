import { genSalt, hash } from "bcrypt";
import { ApiError } from "../helpers/ApiError";
import { User } from "../model/users.model";
import { UserDTO } from "../repositories/UserDTO";
import { UsersRepository } from "../repositories/users.repositoy";

export class UsersServices {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(user: User): Promise<UserDTO> {
    if (!user.name) {
      throw new ApiError("Preencha os campos corretamente", 400);
    }

    if (!user.email) {
      throw new ApiError("Preencha os campos corretamente", 400);
    }

    if (!user.password) {
      throw new ApiError("Preencha os campos corretamente", 400);
    }

    const userFound = await this.usersRepository.findByEmail(user.email);

    if (userFound) {
      throw new ApiError("Email já esta cadastrado", 400);
    }

    const saltGenerated = await genSalt(8);

    const encryptedPassword = await hash(user.password, saltGenerated);

    const _user = { ...user, password: encryptedPassword } as User;

    const newUser = await this.usersRepository.createUser(_user);
    if (newUser === null) {
      throw new ApiError("Não foi possivel salvar o usuario", 400);
    }

    return newUser;
  }

  async findUser(id: string): Promise<UserDTO> {
    if (!id) {
      throw new ApiError("Informe um id válido", 400);
    }

    const userFound = await this.usersRepository.findUser(id);

    if (userFound === null) {
      throw new ApiError("Não foi possivel encontrar o usuario", 400);
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
