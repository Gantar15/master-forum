import { Middleware } from "./utils/Middleware";
import { authService } from "../../../modules/users/services";
import { userRepo } from "../../../modules/users/repos";

const middleware = new Middleware(authService, userRepo);

export { middleware };
