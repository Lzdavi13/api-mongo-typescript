import { Request, Response } from "express";
import { UserLoginServices } from "./../services/user.login.servies";

export class UserLoginController {
  constructor(private UserLoginServices: UserLoginServices) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const user = await this.UserLoginServices.execute(email, password);

    return response.status(200).json({ ...user });
  }
}
