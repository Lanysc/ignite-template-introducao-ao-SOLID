import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError"
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository"

@injectable()
class FindUserByIdUseCase {
  constructor(
    @inject("UsersRepository") 
    private usersRepository: IUsersRepository
  ) {}

  public async execute(id: string) {
    const user = await this.usersRepository.findById(Number(id))

    if(!user) {
      throw new AppError("User not found")
    }

    return user
  }
}

export { FindUserByIdUseCase }