import { database } from "database";
import { ICreateCategoryDTO } from "modules/cars/dtos/ICreateCategoryDTO";
import { CategoryModel } from "modules/cars/infra/prisma/model/category";
import { ICategoriesRepository } from "modules/cars/repositories/interfaces/ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  async create({name, description}: ICreateCategoryDTO): Promise<CategoryModel> {
    const category = await database.category.create({
      data: {
        name: name,
        description: description,
      }
    })

    return category
  }

  async findById(id: number): Promise<CategoryModel | null> {
    const category = await database.category.findUnique({
      where: {
        id: Number(id)
      }
    })

    return category;
  }
  
  async findByName(name: string): Promise<CategoryModel | null> {
    const category = await database.category.findUnique({
      where: {
        name: name
      }
    })

    return category;
  }

  async find(): Promise<CategoryModel[] | null> {
    const categories = await database.category.findMany();

    return categories;
  }
}

export { CategoriesRepository }