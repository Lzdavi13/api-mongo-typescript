import { sign } from "jsonwebtoken";

import { compare } from "bcrypt";
import { IUsersRepository } from "./../repositories/IUsersRepository";

interface IUserLogin {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  token: string;
}

export class UserLoginServices {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(email: string, password: string): Promise<IUserLogin> {
    const user = await this.usersRepository.findByEmail(email);
    console.log(user);

    if (!user) {
      throw new Error("Usuario não encontrado");
    }

    const decryptedPassword = await compare(password, user.password);

    if (!decryptedPassword) {
      throw new Error("Senha incorreta");
    }

    const jwtToken = sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "8h",
    });

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token: jwtToken,
    };
  }
}
