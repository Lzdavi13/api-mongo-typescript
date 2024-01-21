import { Request, Response } from "express";
import { UsersServices } from "../services/user.services";

export class UsersController {
  constructor(private readonly usersServices: UsersServices) {}

  async createUser(req: Request, res: Response): Promise<Response> {
    const newUser = await this.usersServices.createUser(req.body);

    return res
      .status(201)
      .json({ mensagem: "Usuario criado com sucess", usuario: newUser });
  }

  async findUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const foundUser = await this.usersServices.findUser(id);

    return res.status(201).json({ usuario: foundUser });
  }
}
