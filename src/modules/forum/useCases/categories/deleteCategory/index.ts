import { DeleteCategory } from "./DeleteCategory";
import { DeleteCategoryController } from "./DeleteCategoryController";
import { categoryRepo } from "../../../repos";

const deleteCategory = new DeleteCategory(categoryRepo);

const deleteCategoryController = new DeleteCategoryController(deleteCategory);

export { deleteCategory, deleteCategoryController };
