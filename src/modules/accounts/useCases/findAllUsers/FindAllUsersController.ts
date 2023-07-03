import { Response, Request } from "express";
import { container } from "tsyringe";
import { FindAllUsersUseCase } from "./FindAllUsersUseCase";

export class FindAllUsersController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findAllUsers = container.resolve(FindAllUsersUseCase);

    const user = await findAllUsers.execute()

    return response.json(user)
  }
}