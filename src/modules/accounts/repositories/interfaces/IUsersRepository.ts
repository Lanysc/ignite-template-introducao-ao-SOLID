import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserModel } from "../../infra/prisma/model/UserModel";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<UserModel>;
  update(data: ICreateUserDTO): Promise<UserModel>;
  findById(id: number): Promise<UserModel | null>
  findByEmail(email: string): Promise<UserModel | null>
  find(): Promise<UserModel[] | null>
}
