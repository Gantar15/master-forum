import { CreateCategory } from "./CreateCategory";
import { CreateCategoryController } from "./CreateCategoryController";
import { categoryRepo } from "../../../repos";

const createCategory = new CreateCategory(categoryRepo);

const createCategoryController = new CreateCategoryController(createCategory);

export { createCategory, createCategoryController };
