import { container } from "tsyringe";

import { ICategoriesRepository } from "../../modules/cars/repositories/interfaces/ICategoriesRepository";
import { CategoriesRepository } from "modules/cars/infra/prisma/repositories/CategoriesRepository";
import { ISpecificationsRepository } from "modules/cars/repositories/interfaces/ISpecificationsRepository";
import { SpecificationsRepository } from "modules/cars/infra/prisma/repositories/SpecificationsRepository";
import { IUsersTokensRepository } from "modules/accounts/repositories/interfaces/IUsersTokensRepository";
import { UsersTokensRepository } from "modules/accounts/infra/prisma/repositories/UsersTokensRepository";
import { IUsersRepository } from "modules/accounts/repositories/interfaces/IUsersRepository";
import { UsersRepository } from "modules/accounts/infra/prisma/repositories/UsersRepository";

container.register<ISpecificationsRepository>("SpecificationsRepository", {
  useClass: SpecificationsRepository,
});

container.register<IUsersRepository>("UsersRepository", {
  useClass: UsersRepository,
});

container.register<IUsersTokensRepository>("UsersTokensRepository", {
  useClass: UsersTokensRepository,
});

container.register<ICategoriesRepository>("CategoriesRepository", {
  useClass: CategoriesRepository,
});


