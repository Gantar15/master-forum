import { createCategoryController } from "../../../useCases/categories/createCategory";
import { deleteCategoryController } from "../../../useCases/categories/deleteCategory";
import express from "express";
import { middleware } from "../../../../../shared/infra/http";

const categoryRouter = express.Router();

categoryRouter.post("/", middleware.ensureAuthenticated(), (req, res) =>
  createCategoryController.execute(req, res)
);

categoryRouter.delete(
  "/:categoryId",
  middleware.ensureAuthenticated(),
  (req, res) => deleteCategoryController.execute(req, res)
);

export { categoryRouter };
