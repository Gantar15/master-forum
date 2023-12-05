import { categoryRepo, memberRepo, postRepo, tagRepo } from "../../../repos";

import { CreatePost } from "./CreatePost";
import { CreatePostController } from "./CreatePostController";

const createPost = new CreatePost(postRepo, memberRepo, categoryRepo, tagRepo);
const createPostController = new CreatePostController(createPost);

export { createPost, createPostController };
