import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express"
import { env } from "process";
import { UsersRepository } from "modules/accounts/infra/prisma/repositories/UsersRepository";
import { AppError } from "shared/errors/AppError";
import auth from "config/auth";
interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [bearer, token] = authHeader.split(" ");

  // Verifica se o token é um Bearer Token
  if (bearer !== 'Bearer') {
    throw new AppError("Malformatted token", 401);
  }

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;
    
    request.user = {
      id: user_id,
    }

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
