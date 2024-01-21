import { Request, Response } from "express";
import { UsersServices } from "../services/user.services";

export class UsersController {
  constructor(private readonly usersServices: UsersServices) {}

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const newUser = await this.usersServices.createUser(req.body);

      return res
        .status(201)
        .json({ mensagem: "Usuario criado com sucess", usuario: newUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensagem: "erro interno no servidor" });
    }
  }

  async findUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const foundUser = await this.usersServices.findUser(id);

      return res.status(201).json({ usuario: foundUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensagem: "erro interno no servidor" });
    }
  }

  async findAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const listUsers = await this.usersServices.findAllUsers();

      return res.status(200).json({ usuarios: listUsers });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensagem: "erro interno no servidor" });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updatedUser = await this.usersServices.updateUser(id, req.body);

      return res.status(200).json({ updatedUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensagem: "erro interno no servidor" });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.usersServices.deleteUser(id);

      return res.status(200).json({ mensagem: "Usuario deletado com sucesso" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensagem: "erro interno no servidor" });
    }
  }
}
