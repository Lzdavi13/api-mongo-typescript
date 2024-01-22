import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      return response
        .status(401)
        .json({ mensagem: "Não autorizado", statusCode: 401 });
    }

    const [type, token] = authorization.split(" ");
    if (!token) {
      return response
        .status(401)
        .json({ mensagem: "Não autorizado", statusCode: 401 });
    }

    if (type !== "Bearer") {
      return response
        .status(401)
        .json({ mensagem: "token invalido", statusCode: 401 });
    }

    const id = verify(token, process.env.JWT_SECRET as string);

    if (!id) {
      return response
        .status(401)
        .json({ mensagem: "Não autorizado", statusCode: 401 });
    }

    return next();
  } catch (error: any) {
    return response.status(500).json({ message: error.message });
  }
}
