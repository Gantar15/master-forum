import { memberRepo, postRepo } from "../../../repos";

import { GetPostsByUser } from "./getPostsByUser";
import { GetPostsByUserController } from "./getPostsByUserController";
import { userRepo } from "../../../../users/repos";

const getPostsByUser = new GetPostsByUser(postRepo, memberRepo, userRepo);
const getPostsByUserController = new GetPostsByUserController(getPostsByUser);

export { getPostsByUser, getPostsByUserController };
