import { deleteCommentController } from "../../../useCases/comments/deleteComment";
import { downvoteCommentController } from "../../../useCases/comments/downvoteComment";
import { editCommentController } from "../../../useCases/comments/editComment";
import express from "express";
import { getCommentByCommentIdController } from "../../../useCases/comments/getCommentByCommentId";
import { getCommentsByPostSlugController } from "../../../useCases/comments/getCommentsByPostSlug";
import { getCommentsByUserController } from "../../../useCases/comments/getCommentsByUser";
import { middleware } from "../../../../../shared/infra/http";
import { replyToCommentController } from "../../../useCases/comments/replyToComment";
import { replyToPostController } from "../../../useCases/comments/replyToPost";
import { upvoteCommentController } from "../../../useCases/comments/upvoteComment";

const commentRouter = express.Router();

commentRouter.get("/", middleware.includeDecodedTokenIfExists(), (req, res) =>
  getCommentsByPostSlugController.execute(req, res)
);

commentRouter.post("/", middleware.ensureAuthenticated(), (req, res) =>
  replyToPostController.execute(req, res)
);

commentRouter.get(
  "/user",
  middleware.includeDecodedTokenIfExists(),
  (req, res) => getCommentsByUserController.execute(req, res)
);

commentRouter.post(
  "/:commentId/reply",
  middleware.ensureAuthenticated(),
  (req, res) => replyToCommentController.execute(req, res)
);

commentRouter.get(
  "/:commentId",
  middleware.includeDecodedTokenIfExists(),
  (req, res) => getCommentByCommentIdController.execute(req, res)
);

commentRouter.post(
  "/:commentId/upvote",
  middleware.ensureAuthenticated(),
  (req, res) => upvoteCommentController.execute(req, res)
);

commentRouter.post(
  "/:commentId/downvote",
  middleware.ensureAuthenticated(),
  (req, res) => downvoteCommentController.execute(req, res)
);

commentRouter.delete(
  "/:commentId",
  middleware.ensureAuthenticated(),
  (req, res) => deleteCommentController.execute(req, res)
);

commentRouter.patch(
  "/:commentId",
  middleware.ensureAuthenticated(),
  (req, res) => editCommentController.execute(req, res)
);

export { commentRouter };
