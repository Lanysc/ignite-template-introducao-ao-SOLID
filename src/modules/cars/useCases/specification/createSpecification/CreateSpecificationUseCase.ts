import { ICategoriesRepository } from "modules/cars/repositories/interfaces/ICategoriesRepository";
import { AppError } from "shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private categoriesRepository: ICategoriesRepository) { }
  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError("Specification already exists!");
    }

    await this.categoriesRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase }