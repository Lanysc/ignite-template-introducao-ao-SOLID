import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError"
import { deleteFile } from "../../../../../utils/file";
import { IUsersRepository } from "../../repositories/interfaces/IUsersRepository"

interface IRequest {
  userId: string;
  pictureFile: string | null;
}

@injectable()
class UpdateUserPictureUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  public async execute({ userId, pictureFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(Number(userId))

    if (!user) {
      throw new AppError("User not found")
    }

    if (user.picture) {
      await deleteFile(`./tmp/picture/${user.picture}`);
    }

    user.picture = pictureFile;

    await this.usersRepository.update(user);
  }
}

export { UpdateUserPictureUseCase }