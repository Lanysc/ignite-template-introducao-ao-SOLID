import { Response, Request } from "express";
import { container } from "tsyringe";
import { FindAllCategoriesUseCase } from "./FindAllCategoriesUseCase";

export class FindAllCategoriesController {
  async handle(request: Request, response: Response) {

    const findAllCategories = container.resolve(FindAllCategoriesUseCase);

    const categories = await findAllCategories.execute()

    return response.json(categories)
  }
}