import { createCategoryController } from "../../../useCases/categories/createCategory";
import { deleteCategoryController } from "../../../useCases/categories/deleteCategory";
import express from "express";
import { getCategoriesController } from "../../../useCases/categories/getCategories";
import { getTopCategoriesController } from "../../../useCases/categories/getTopCategories";
import { middleware } from "../../../../../shared/infra/http";

const categoryRouter = express.Router();

categoryRouter.get("/", (req, res) =>
  getCategoriesController.execute(req, res)
);

categoryRouter.get("/top", (req, res) =>
  getTopCategoriesController.execute(req, res)
);

categoryRouter.post(
  "/",
  middleware.ensureRole(["admin", "manager"]),
  (req, res) => createCategoryController.execute(req, res)
);

categoryRouter.delete(
  "/:categoryTitle",
  middleware.ensureRole(["admin", "manager"]),
  (req, res) => deleteCategoryController.execute(req, res)
);

export { categoryRouter };
