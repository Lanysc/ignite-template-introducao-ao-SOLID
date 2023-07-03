import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository";

@injectable()
export class FindAllUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  public async execute() {
    const user = await this.usersRepository.find()

    if (!user) {
      throw new AppError("No User found!");
    }

    return user
  }
}
