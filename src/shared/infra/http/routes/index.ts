import { Router } from "express";
import { categoriesRoutes } from "shared/infra/http/routes/categories.routes";
import { specificationsRoutes } from "shared/infra/http/routes/specification.routes";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use(authenticateRoutes);

export { router };