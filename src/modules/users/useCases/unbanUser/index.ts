import { UnbanUserController } from "./UnbanUserController";
import { UnbanUserUseCase } from "./UnbanUserUseCase";
import { userRepo } from "../../repos";

const unbanUserUseCase = new UnbanUserUseCase(userRepo);
const unbanUserController = new UnbanUserController(unbanUserUseCase);

export { unbanUserUseCase, unbanUserController };
