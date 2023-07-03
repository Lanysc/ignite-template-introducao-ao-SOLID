import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { hash } from "bcryptjs";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  public async execute({
    name,
    email,
    password,
    driver_license,
    picture
  }: ICreateUserDTO) {

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) throw new AppError("User Already Exists");

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      picture,
      driver_license,
    })

    return user;
  }
}

export { CreateUserUseCase }