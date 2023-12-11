import { GetUsers } from "./GetUsers";
import { GetUsersController } from "./GetUsersController";
import { userRepo } from "../../repos";

const getUsers = new GetUsers(userRepo);

const getUsersController = new GetUsersController(getUsers);

export { getUsers, getUsersController };
