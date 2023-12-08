import { memberRepo, postRepo } from "../../../repos";

import { GetPopularPosts } from "./GetPopularPosts";
import { GetPopularPostsController } from "./GetPopularPostsController";

const getPopularPosts = new GetPopularPosts(postRepo, memberRepo);

const getPopularPostsController = new GetPopularPostsController(
  getPopularPosts
);

export { getPopularPosts, getPopularPostsController };
