import { memberRepo, postRepo } from "../../../repos";

import { GetRecentPosts } from "./GetRecentPosts";
import { GetRecentPostsController } from "./GetRecentPostsController";

const getRecentPosts = new GetRecentPosts(postRepo, memberRepo);
const getRecentPostsController = new GetRecentPostsController(getRecentPosts);

export { getRecentPosts, getRecentPostsController };
