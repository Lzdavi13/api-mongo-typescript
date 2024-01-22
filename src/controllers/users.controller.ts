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

  async findAllUsers(req: Request, res: Response): Promise<Response> {
    const listUsers = await this.usersServices.findAllUsers();

    return res.status(200).json({ usuarios: listUsers });
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const updatedUser = await this.usersServices.updateUser(id, req.body);

    return res.status(200).json({ user: updatedUser });
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.usersServices.deleteUser(id);

    return res.status(200).json({ mensagem: "Usuario deletado com sucesso" });
  }
}
