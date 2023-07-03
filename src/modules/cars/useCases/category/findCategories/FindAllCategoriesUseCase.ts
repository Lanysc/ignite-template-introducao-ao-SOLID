import { ICategoriesRepository } from "modules/cars/repositories/interfaces/ICategoriesRepository";
import { AppError } from "shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  public async execute() {
    const categories = await this.categoriesRepository.find()

    if(!categories) {
      throw new AppError("No Category found!");
    }

    return categories;
  }
}
