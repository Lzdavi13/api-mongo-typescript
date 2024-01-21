import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  try {
    if (!authorization) {
      return response.status(401).json({ mensagem: "Não autorizado" });
    }

    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") {
      return response.status(401).json({ mensagem: "token invalido" });
    }

    const id = verify(token, process.env.JWT_SECRET as string);

    if (!id) {
      return response.status(401).json({ mensagem: "Não autorizado" });
    }

    return next();
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
}
