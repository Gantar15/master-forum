import { GetCategories } from "./GetCategories";
import { GetCategoriesController } from "./GetCategoriesController";
import { categoryRepo } from "../../../repos";

const getCategories = new GetCategories(categoryRepo);

const getCategoriesController = new GetCategoriesController(getCategories);

export { getCategories, getCategoriesController };
