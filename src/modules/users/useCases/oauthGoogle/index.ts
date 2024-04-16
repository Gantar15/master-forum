import { OauthGoogleController } from "./OauthGoogleController";
import { OauthGoogleUseCase } from "./OauthGoogleUseCase";
import { authService } from "../../services";
import { userRepo } from "../../repos";

const oauthGoogleUseCase = new OauthGoogleUseCase(userRepo, authService);
const oauthGoogleController = new OauthGoogleController(oauthGoogleUseCase);

export { oauthGoogleController, oauthGoogleUseCase };
