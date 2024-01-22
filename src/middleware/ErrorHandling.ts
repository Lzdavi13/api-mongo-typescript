import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/ApiError";

export async function errorHandling(
  error: Error & ApiError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Erro interno do servidor";

  return response.json({ message, statusCode });
}
