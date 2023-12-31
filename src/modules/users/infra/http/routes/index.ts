import { createUserController } from "../../../useCases/createUser";
import { deleteUserController } from "../../../useCases/deleteUser";
import express from "express";
import { getCurrentUserController } from "../../../useCases/getCurrentUser";
import { getUserByUserNameController } from "../../../useCases/getUserByUserName";
import { getUsersController } from "../../../useCases/getUsers";
import { loginController } from "../../../useCases/login";
import { logoutController } from "../../../useCases/logout";
import { middleware } from "../../../../../shared/infra/http";
import { refreshAccessTokenController } from "../../../useCases/refreshAccessToken";

const userRouter = express.Router();

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
