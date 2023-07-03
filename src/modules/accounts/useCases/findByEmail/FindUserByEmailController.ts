import { Response, Request } from "express";
import { container } from "tsyringe";
import { FindUserByEmailUseCase } from "./FindUserByEmailUseCase";

export class FindUserByEmailController {
  async handle(request: Request, response: Response) {
    const { email } = request.params;

    const findUser  = container.resolve(FindUserByEmailUseCase);

    const user = await findUser.execute(
      email
    )

    return response.json(user)
  }
}