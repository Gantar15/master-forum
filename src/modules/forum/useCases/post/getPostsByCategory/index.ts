import { categoryRepo, memberRepo, postRepo } from "../../../repos";

import { GetPostsByCategory } from "./GetPostsByCategory";
import { GetPostsByCategoryController } from "./GetPopularPostsController";

const getPostsByCategory = new GetPostsByCategory(
  postRepo,
  categoryRepo,
  memberRepo
);

const getPostsByCategoryController = new GetPostsByCategoryController(
  getPostsByCategory
);

export { getPostsByCategory, getPostsByCategoryController };
