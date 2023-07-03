import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository"

@injectable()
class FindUserByEmailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  public async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    return user
  }
}

export { FindUserByEmailUseCase }