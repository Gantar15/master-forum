import { createPostController } from "../../../useCases/post/createPost";
import { deletePostController } from "../../../useCases/post/deletePost";
import { downvotePostController } from "../../../useCases/post/downvotePost";
import { editPostController } from "../../../useCases/post/editPost";
import express from "express";
import { getPopularPostsController } from "../../../useCases/post/getPopularPosts";
import { getPostBySlugController } from "../../../useCases/post/getPostBySlug";
import { getPostsByCategoryController } from "../../../useCases/post/getPostsByCategory";
import { getPostsByUserController } from "../../../useCases/post/getPostsByUser";
import { getRecentPostsController } from "../../../useCases/post/getRecentPosts";
import { middleware } from "../../../../../shared/infra/http";
import { searchPostsController } from "../../../useCases/post/searchPosts";
import { upvotePostController } from "../../../useCases/post/upvotePost";

const postRouter = express.Router();

postRouter.post("/", middleware.ensureAuthenticated(), (req, res) =>
  createPostController.execute(req, res)
);

postRouter.get(
  "/recent",
  middleware.includeDecodedTokenIfExists(),
  (req, res) => getRecentPostsController.execute(req, res)
);

postRouter.get(
  "/popular",
  middleware.includeDecodedTokenIfExists(),
  (req, res) => getPopularPostsController.execute(req, res)
);

postRouter.get(
  "/category",
  middleware.includeDecodedTokenIfExists(),
  (req, res) => getPostsByCategoryController.execute(req, res)
);

postRouter.get("/user", (req, res) =>
  getPostsByUserController.execute(req, res)
);

postRouter.get(
  "/search",
  middleware.includeDecodedTokenIfExists(),
  (req, res) => searchPostsController.execute(req, res)
);

postRouter.get("/", middleware.includeDecodedTokenIfExists(), (req, res) =>
  getPostBySlugController.execute(req, res)
);

postRouter.post("/upvote", middleware.ensureAuthenticated(), (req, res) =>
  upvotePostController.execute(req, res)
);

postRouter.post("/downvote", middleware.ensureAuthenticated(), (req, res) =>
  downvotePostController.execute(req, res)
);

postRouter.delete("/:slug", middleware.ensureAuthenticated(), (req, res) =>
  deletePostController.execute(req, res)
);

postRouter.patch("/:slug", middleware.ensureAuthenticated(), (req, res) =>
  editPostController.execute(req, res)
);

export { postRouter };
