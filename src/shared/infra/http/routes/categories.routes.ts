import { Router } from "express";
import { CreateCategoryController } from "modules/cars/useCases/category/createCategory/CreateCategoryController";
import { FindAllCategoriesController } from "modules/cars/useCases/category/findCategories/FindAllCategoriesController";
import { ImportCategoryController } from "modules/cars/useCases/category/importCategory/ImportCategoryController";
import multer from "multer";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const findAllCategoriesController = new FindAllCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.get("/", (request, response) => {
  return findAllCategoriesController.handle(request, response);
});

categoriesRoutes.use(ensureAuthenticated);

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  return importCategoryController.handle(request, response);
});

export { categoriesRoutes }