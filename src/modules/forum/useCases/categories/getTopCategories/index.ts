import { GetTopCategories } from "./GetTopCategories";
import { GetTopCategoriesController } from "./GetTopCategoriesController";
import { categoryRepo } from "../../../repos";

const getTopCategories = new GetTopCategories(categoryRepo);

const getTopCategoriesController = new GetTopCategoriesController(
  getTopCategories
);

export { getTopCategories, getTopCategoriesController };
