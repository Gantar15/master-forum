import { categoryRepo, memberRepo, postRepo, tagRepo } from "../../../repos";

import { EditPost } from "./EditPost";
import { EditPostController } from "./EditPostController";

const editPost = new EditPost(postRepo, memberRepo, categoryRepo, tagRepo);

const editPostController = new EditPostController(editPost);

export { editPost, editPostController };
