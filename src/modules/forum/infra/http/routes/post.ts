import { createPostController } from "../../../useCases/post/createPost";
import { deletePostController } from "../../../useCases/post/deletePost";
import { downvotePostController } from "../../../useCases/post/downvotePost";
import express from "express";
import { getPopularPostsController } from "../../../useCases/post/getPopularPosts";
import { getPostBySlugController } from "../../../useCases/post/getPostBySlug";
import { getRecentPostsController } from "../../../useCases/post/getRecentPosts";
import { middleware } from "../../../../../shared/infra/http";
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

// postRouter.patch("/:slug", middleware.ensureAuthenticated(), (req, res) =>
//   editPostController.execute(req, res)
// );

export { postRouter };
