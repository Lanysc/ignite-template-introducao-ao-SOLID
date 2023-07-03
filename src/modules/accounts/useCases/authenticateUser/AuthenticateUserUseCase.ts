import { compare } from "bcryptjs";
import dayjs from "dayjs"
import { sign } from "jsonwebtoken";
import auth from "../../../../../src/config/auth";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/interfaces/IUsersTokensRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string,
    email: string
  };
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository
  ) { }
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, auth.secret_token, {
      subject: user.id.toString(),
      expiresIn: auth.expires_in_token
    });
    const refreshToken = sign({ email }, auth.secret_refresh_token, {
      subject: user.id.toString(),
      expiresIn: auth.expires_in_refresh_token
    });

    await this.usersTokensRepository.create({
      refresh_token: refreshToken,
      user_id: user.id,
      expires_date: dayjs().add(auth.expires_in_refresh_token_days, "days").toDate(),
    })

    const tokenReturn: IResponse = {
      user: {
        name: user.name ?? "",
        email: user.email,
      },
      token: token ?? "",
      refresh_token: refreshToken ?? "",
    }

    return tokenReturn;
  }
}