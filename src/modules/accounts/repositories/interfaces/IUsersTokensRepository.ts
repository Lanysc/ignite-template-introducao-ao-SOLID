import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokensDTO";
import { UserTokenModel } from "../../infra/prisma/model/UserTokens"

interface IUsersTokensRepository {
  create({ expires_date, user_id, refresh_token }: ICreateUserTokenDTO): Promise<UserTokenModel>;
  findByUserIdAndRefreshToken(user_id: number, refresh_token: string): Promise<UserTokenModel | null> ;
  deleteById(id: number): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserTokenModel | null>;
}
export { IUsersTokensRepository }