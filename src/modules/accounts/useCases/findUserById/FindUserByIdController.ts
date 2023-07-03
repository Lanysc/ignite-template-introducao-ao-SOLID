import { Response, Request } from "express";
import { container } from "tsyringe";
import { FindUserByIdUseCase } from "./FindUserByIdUseCase";

export class FindUserByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findUser  = container.resolve(FindUserByIdUseCase);

    const user = await findUser.execute(
      id
    )

    return response.json(user)
  }
}