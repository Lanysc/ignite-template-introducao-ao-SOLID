import dayjs from "dayjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/interfaces/IUsersTokensRepository";
import { EtherealMailProvider } from "shared/container/providers/MailProvider/implementations/EtherealMailProvider"
import { IMailProvider } from "shared/container/providers/MailProvider/IMailProvider";
import { resolve } from "path";
import { AppError } from "shared/errors/AppError";

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider,
  ) { }
  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs");

    if (!user) {
      throw new AppError("User does not exists!");
    }

    const token = sign({}, auth.secret_refresh_token, {
      subject: user.id.toString(),
      expiresIn: auth.expires_in_refresh_token
    });

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: dayjs().add(3, "hour").toDate(),
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    }

    await this.mailProvider.sendMail(email, "Recuperação de senha", variables, templatePath);
  }
}