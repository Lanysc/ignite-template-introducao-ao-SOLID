import { Response, Request } from "express";
import { container } from "tsyringe";
import { UpdateUserPictureUseCase } from "./UpdateUserPictureUseCase";

export class UpdateUserPictureController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const pictureFile = request.file!.filename;

    const updateUserPictureUseCase = container.resolve(UpdateUserPictureUseCase);

    await updateUserPictureUseCase.execute(
      { userId: id, pictureFile }
    )

    return response.status(204).send();
  }
}