import { authService } from "../../../services";
import axios from "axios";
import { createUserController } from "../../../useCases/createUser";
import { deleteUserController } from "../../../useCases/deleteUser";
import express from "express";
import { getCurrentUserController } from "../../../useCases/getCurrentUser";
import { getUserByUserNameController } from "../../../useCases/getUserByUserName";
import { getUsersController } from "../../../useCases/getUsers";
import { loginController } from "../../../useCases/login";
import { logoutController } from "../../../useCases/logout";
import { middleware } from "../../../../../shared/infra/http";
import { oauthGoogleController } from "../../../useCases/oauthGoogle";
import querystring from "querystring";
import { refreshAccessTokenController } from "../../../useCases/refreshAccessToken";
import { verifyController } from "../../../useCases/verify";

const userRouter = express.Router();

userRouter.get("/oauth/google/", (req, res) => {
  const params = {
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    redirect_uri: `http://127.0.0.1:${process.env.PORT}/api/v1/users/oauth/google/callback`,
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
    response_type: "code",
  };

  const url = `https://accounts.google.com/o/oauth2/auth?${querystring.stringify(
    params
  )}`;
  res.redirect(url);
});

userRouter.get("/oauth/google/callback", (req, res) =>
  oauthGoogleController.execute(req, res)
);

userRouter.post("/oauth/google/tokens", async (req, res) => {
  const [accessToken, refreshToken] = await authService.getTokens(
    req.body.username
  );
  return res.status(200).json({
    accessToken,
    refreshToken,
  });
});

userRouter.post("/", middleware.includeDecodedTokenIfExists(), (req, res) =>
  createUserController.execute(req, res)
);

userRouter.get("/", middleware.ensureRole(["admin"]), (req, res) =>
  getUsersController.execute(req, res)
);

userRouter.get("/me", middleware.ensureAuthenticated(), (req, res) =>
  getCurrentUserController.execute(req, res)
);

userRouter.post("/login", (req, res) => loginController.execute(req, res));

userRouter.patch("/verify", (req, res) => verifyController.execute(req, res));

userRouter.post("/logout", middleware.ensureAuthenticated(), (req, res) =>
  logoutController.execute(req, res)
);

userRouter.post("/token/refresh", (req, res) =>
  refreshAccessTokenController.execute(req, res)
);

userRouter.delete("/:userId", middleware.ensureRole("admin"), (req, res) =>
  deleteUserController.execute(req, res)
);

userRouter.get("/:username", middleware.ensureAuthenticated(), (req, res) =>
  getUserByUserNameController.execute(req, res)
);

export { userRouter };
