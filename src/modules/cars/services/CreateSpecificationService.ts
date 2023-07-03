import { AppError } from "shared/errors/AppError";
import { ISpecificationsRepository } from "../repositories/interfaces/ISpecificationsRepository";

interface IRequest {
  name: string,
  description: string,
}

class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository ) {}
  execute({name, description}: IRequest):void {
    const specificationAlreadyExists = this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists");
    }

    this.specificationsRepository.create({
      name, 
      description,
    });
  }
}

export { CreateSpecificationService }