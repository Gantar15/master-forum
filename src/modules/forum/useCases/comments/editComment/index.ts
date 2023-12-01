import { commentRepo, memberRepo } from "../../../repos";

import { EditComment } from "./EditComment";
import { EditCommentController } from "./EditCommentController";

const editComment = new EditComment(commentRepo, memberRepo);

const editCommentController = new EditCommentController(editComment);

export { editComment, editCommentController };
