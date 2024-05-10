import { commentRepo, memberRepo } from "../../../repos";

import { GetCommentsByUser } from "./GetCommentsByUser";
import { GetCommentsByUserController } from "./GetCommentsByUserController";

const getCommentsByUser = new GetCommentsByUser(commentRepo, memberRepo);

const getCommentsByUserController = new GetCommentsByUserController(
  getCommentsByUser
);

export { getCommentsByUser, getCommentsByUserController };
