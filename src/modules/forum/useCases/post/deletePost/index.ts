import { memberRepo, postRepo } from "../../../repos";

import { DeletePost } from "./DeletePost";
import { DeletePostController } from "./DeletePostController";

const deletePost = new DeletePost(postRepo, memberRepo);
const deletePostController = new DeletePostController(deletePost);

export { deletePost, deletePostController };
