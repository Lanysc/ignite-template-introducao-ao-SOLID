import { database } from "database";
import { ICreateSpecificationDTO } from "modules/cars/dtos/ICreateSpecificationDTO";
import { SpecificationModel } from "modules/cars/infra/prisma/model/Specification";
import { ISpecificationsRepository } from "modules/cars/repositories/interfaces/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  async create({name, description}: ICreateSpecificationDTO): Promise<SpecificationModel> {
    const specification = await database.specification.create({
      data: {
        name: name,
        description: description,
      }
    })

    return specification
  }

  async findById(id: number): Promise<SpecificationModel | null> {
    const specification = await database.specification.findUnique({
      where: {
        id: Number(id)
      }
    })

    return specification;
  }
  
  async findByName(name: string): Promise<SpecificationModel | null> {
    const specification = await database.specification.findUnique({
      where: {
        name: name
      }
    })

    return specification;
  }

  async find(): Promise<SpecificationModel[] | null> {
    const categories = await database.specification.findMany();

    return categories;
  }
}

export { SpecificationsRepository }