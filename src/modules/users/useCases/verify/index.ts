import { VerifyController } from "./VerifyController";
import { VerifyUseCase } from "./VerifyUseCase";
import { userRepo } from "../../repos";

const verifyUseCase = new VerifyUseCase(userRepo);
const verifyController = new VerifyController(verifyUseCase);

export { verifyUseCase, verifyController };
