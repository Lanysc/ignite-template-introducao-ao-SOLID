import { Response, Request } from "express";
import { container } from "tsyringe";
import { FindAllSpecificationsUseCase } from "./FindAllSpecificationsUseCase";

export class FindAllSpecificationsController {
  async handle(request: Request, response: Response) {

    const findAllSpecifications = container.resolve(FindAllSpecificationsUseCase);

    const Specifications = await findAllSpecifications.execute()

    return response.json(Specifications)
  }
}