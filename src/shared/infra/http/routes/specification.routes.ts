import { Router } from "express";
import { CreateSpecificationController } from "modules/cars/useCases/specification/createSpecification/CreateSpecificationController";
import { FindAllSpecificationsController } from "modules/cars/useCases/specification/listSpecifications/FindAllSpecificationsController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const findAllSpecificationsController = new FindAllSpecificationsController();

specificationsRoutes.post("/", (request, response) => {
  return createSpecificationController.handle(request, response);
});

specificationsRoutes.get("/", (request, response) => {
  return findAllSpecificationsController.handle(request, response);
});

export { specificationsRoutes }