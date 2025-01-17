import { ICategoriesRepository } from "modules/cars/repositories/interfaces/ICategoriesRepository";
import { AppError } from "shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
    ) {}
    public async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);
    console.log(categoryAlreadyExists);

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists!");
    }
    
    await this.categoriesRepository.create({
      name,
      description,
    });
  }
}

export { CreateCategoryUseCase }