import { database } from "database";
import { ICreateUserTokenDTO } from "../../../../../../src/modules/accounts/dtos/ICreateUserTokensDTO";
import { IUsersTokensRepository } from "../../../../../../src/modules/accounts/repositories/interfaces/IUsersTokensRepository";
import { UserTokenModel } from "../model/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  async create({ expires_date, user_id, refresh_token }: ICreateUserTokenDTO): Promise<UserTokenModel> {
    const userToken = await database.userToken.create({
      data: {
        expires_date: expires_date,
        userId: user_id,
        refresh_token: refresh_token,
      }
    })
    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id: number, refresh_token: string): Promise<UserTokenModel | null> {
    const userToken = await database.userToken.findFirst({
      where: {
        userId: user_id,
        refresh_token: refresh_token
      }
    })
    return userToken;
  }

  async deleteById(id: number): Promise<void> {
    await database.userToken.delete({
      where: {
        id: id
      }
    })
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokenModel | null> {
    const userToken = await database.userToken.findFirst({
      where: {
        refresh_token: refresh_token
      }
    })
    return userToken;
  }
}

export { UsersTokensRepository }