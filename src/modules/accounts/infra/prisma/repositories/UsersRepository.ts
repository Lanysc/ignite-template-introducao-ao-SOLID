import { UserModel } from "../model/UserModel";
import { IUsersRepository } from "../../../repositories/interfaces/IUsersRepository";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { database } from "database";

class UsersRepository implements IUsersRepository {
  async create({ name, email, password, picture, driver_license }: ICreateUserDTO): Promise<UserModel> {
    const user = await database.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        driver_license: driver_license,
        picture: picture
      }
    })

    return user
  }

  async update({ id, name, email, password, picture }: ICreateUserDTO): Promise<UserModel> {
    const user = await database.user.update({
      where: { id: id },
      data: {
        name: name,
        email: email,
        password: password,
        picture: picture
      }
    })

    return user
  }

  async findById(id: number): Promise<UserModel | null> {
    const user = await database.user.findUnique({
      where: {
        id: Number(id)
      }
    })

    return user;
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const user = await database.user.findUnique({
      where: {
        email: email
      }
    })

    return user;
  }

  async find(): Promise<UserModel[] | null> {
    const user = await database.user.findMany();

    return user;
  }
}

export { UsersRepository }