import { commentRepo, memberRepo } from "../../../repos";

import { DeleteComment } from "./DeleteComment";
import { DeleteCommentController } from "./DeleteCommentController";

const deleteComment = new DeleteComment(commentRepo, memberRepo);

const deleteCommentController = new DeleteCommentController(deleteComment);

export { deleteComment, deleteCommentController };
