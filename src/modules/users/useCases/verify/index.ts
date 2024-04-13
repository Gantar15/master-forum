import { LoginController } from "./VerifyController";
import { LoginUserUseCase } from "./VerifyUseCase";
import { authService } from "../../services";
import { userRepo } from "../../repos";

const loginUseCase = new LoginUserUseCase(userRepo, authService);
const loginController = new LoginController(loginUseCase);

export { loginController, loginUseCase };
