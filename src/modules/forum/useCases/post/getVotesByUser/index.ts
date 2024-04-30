import { memberRepo, postRepo } from "../../../repos";

import { GetVotesByUser } from "./getVotesByUser";
import { GetVotesByUserController } from "./getVotesByUserController";
import { userRepo } from "../../../../users/repos";

const getVotesByUser = new GetVotesByUser(postRepo, memberRepo, userRepo);
const getVotesByUserController = new GetVotesByUserController(getVotesByUser);

export { getVotesByUser, getVotesByUserController };
