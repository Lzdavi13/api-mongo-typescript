import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { ApiError } from "../helpers/ApiError";
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

    if (!user) {
      throw new ApiError("Usuario não encontrado", 404);
    }

    const decryptedPassword = await compare(password, user.password);

    if (!decryptedPassword) {
      throw new ApiError("Senha incorreta", 400);
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
