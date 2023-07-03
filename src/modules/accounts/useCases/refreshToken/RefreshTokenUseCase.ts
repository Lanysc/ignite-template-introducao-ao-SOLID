import dayjs from "dayjs";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { AppError } from "../../../../shared/errors/AppError";
import { UserTokenModel } from "../../infra/prisma/model/UserTokens";
import { IUsersTokensRepository } from "../../repositories/interfaces/IUsersTokensRepository";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token:string,
  refresh_token:string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository
  ) { }
  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;
    const user_id = Number(sub);

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

    if (!userToken) {
      throw new AppError("Refresh token does not exists!");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refreshToken = sign({ email }, auth.secret_refresh_token, {
      subject: user_id.toString(),
      expiresIn: auth.expires_in_refresh_token
    });

    await this.usersTokensRepository.create({
      refresh_token: refreshToken,
      user_id: user_id,
      expires_date: dayjs().add(auth.expires_in_refresh_token_days, "days").toDate(),
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id.toString(),
      expiresIn: auth.expires_in_token
    });

    return {token: newToken, refresh_token: refreshToken};
  }
}

export { RefreshTokenUseCase };