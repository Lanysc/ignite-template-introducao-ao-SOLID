import { ICreateCategoryDTO } from "modules/cars/dtos/ICreateCategoryDTO";
import { CategoryModel } from "modules/cars/infra/prisma/model/category";


interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<CategoryModel>;
  findById(id: number): Promise<CategoryModel | null>
  findByName(name: string): Promise<CategoryModel | null>
  find(): Promise<CategoryModel[] | null>
}

export { ICategoriesRepository }

