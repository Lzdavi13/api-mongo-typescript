import { Router } from "express";
import userLoginController from "../factory/user.login.controller.factory";
import { userController } from "../factory/users.controller.factory";
import { ensureAuthenticated } from "../middleware/EnsureAuthenticated";

const router = Router();

router.post("/user", (request, response) => {
  return userController.createUser(request, response);
});

router.post("/user/login", (request, response) => {
  return userLoginController.handle(request, response);
});

router.use(ensureAuthenticated);

router.get("/user/:id", (request, response) => {
  return userController.findUser(request, response);
});

router.get("/users", (request, response) => {
  return userController.findAllUsers(request, response);
});

router.put("/user/:id", (request, response) => {
  return userController.updateUser(request, response);
});

router.delete("/user/:id", (request, response) => {
  return userController.deleteUser(request, response);
});

export default router;
