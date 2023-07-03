import { Router } from "express";
import multer from "multer";
import uploadConfig from "config/upload";

import { ensureAuthenticated } from "shared/infra/http/middleware/ensureAuthenticated";
import { CreateUserController } from 'modules/accounts/useCases/createUser/CreateUserController';
import { FindAllUsersController } from 'modules/accounts/useCases/findAllUsers/FindAllUsersController';
import { FindUserByIdController } from 'modules/accounts/useCases/findUserById/FindUserByIdController';
import { UpdateUserPictureController } from "modules/accounts/useCases/updateUserPicture/UpdateUserPictureController";

const usersRoutes = Router();

const uploadPicture = multer(uploadConfig.upload("/tmp/picture"));

const createUser = new CreateUserController();
const findAllUsers = new FindAllUsersController();
const findUserById = new FindUserByIdController();
const updateUserPicture = new UpdateUserPictureController();

usersRoutes.post('/', createUser.handle)
usersRoutes.get('/all', findAllUsers.handle)
usersRoutes.get('/:id', findUserById.handle)
usersRoutes.patch('/picture', ensureAuthenticated, uploadPicture.single("picture"), updateUserPicture.handle)

export { usersRoutes }