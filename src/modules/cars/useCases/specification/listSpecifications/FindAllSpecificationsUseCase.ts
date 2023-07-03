import { ISpecificationsRepository } from "modules/cars/repositories/interfaces/ISpecificationsRepository";
import { AppError } from "shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private SpecificationsRepository: ISpecificationsRepository
  ) {}

  public async execute() {
    const Specifications = await this.SpecificationsRepository.find()

    if(!Specifications) {
      throw new AppError("No specification found!");
    }

    return Specifications;
  }
}
