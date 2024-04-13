import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { emailService } from "../../services";
import { userRepo } from "../../repos";

const createUserUseCase = new CreateUserUseCase(userRepo, emailService);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
