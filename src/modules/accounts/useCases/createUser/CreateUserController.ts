import { Response, Request } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { hash } from "bcryptjs";
import { container } from "tsyringe"

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const {
      name,
      email,
      password,
      picture,
      driver_license,
    } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      picture,
      driver_license,
    }
    )

    return response.json(user)
  }
}