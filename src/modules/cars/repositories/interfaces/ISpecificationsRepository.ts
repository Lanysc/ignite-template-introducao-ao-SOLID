import { ICreateSpecificationDTO } from "modules/cars/dtos/ICreateSpecificationDTO";
import { SpecificationModel } from "../../infra/prisma/model/Specification";

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<SpecificationModel>;
  findById(id: number): Promise<SpecificationModel | null>
  findByName(name: string): Promise<SpecificationModel | null>
  find(): Promise<SpecificationModel[] | null>
}

export {
  ISpecificationsRepository,
}