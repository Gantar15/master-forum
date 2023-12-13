import { commentRepo, memberRepo, postRepo } from "../../../repos";

import { DeleteComment } from "./DeleteComment";
import { DeleteCommentController } from "./DeleteCommentController";

const deleteComment = new DeleteComment(commentRepo, memberRepo, postRepo);

const deleteCommentController = new DeleteCommentController(deleteComment);

export { deleteComment, deleteCommentController };
