import { DeleteUserController } from "./DeleteUserController";
import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { authService } from "../../services";
import { userRepo } from "../../repos";

const deleteUserUseCase = new DeleteUserUseCase(userRepo, authService);
const deleteUserController = new DeleteUserController(deleteUserUseCase);

export { deleteUserUseCase, deleteUserController };
