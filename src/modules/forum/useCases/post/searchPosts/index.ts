import { memberRepo, postRepo } from "../../../repos";

import { SearchPosts } from "./SearchPosts";
import { SearchPostsController } from "./SearchPostsController";

const searchPosts = new SearchPosts(postRepo, memberRepo);

const searchPostsController = new SearchPostsController(searchPosts);

export { searchPosts, searchPostsController };
