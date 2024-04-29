import { BanUserController } from "./BanUserController";
import { BanUserUseCase } from "./BanUserUseCase";
import { authService } from "../../services";
import { userRepo } from "../../repos";

const banUserUseCase = new BanUserUseCase(userRepo, authService);
const banUserController = new BanUserController(banUserUseCase);

export { banUserUseCase, banUserController };
