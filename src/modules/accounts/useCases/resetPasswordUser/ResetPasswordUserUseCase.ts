import { hash } from "bcryptjs";
import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/interfaces/IUsersTokensRepository";


interface IRequest {
  token: string;
  password: string;
}
@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }
  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Token invalid!");
    }

    if(dayjs(userToken.expires_date).isBefore(new Date())){
      throw new AppError("Token expired!");
    }

    const user = await this.usersRepository.findById(userToken.userId);
    user!.password = await hash(password, 8);

    await this.usersRepository.update(user!);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase }