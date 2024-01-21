import { model } from "mongoose";
import { UserLoginController } from "../controllers/user.login.controller";
import { UsersRepository } from "../repositories/users.repositoy";
import { UserSchema } from "../schema/user.schema";
import { UserLoginServices } from "../services/user.login.servies";

const userModel = model("User", UserSchema);
const usersRepository = new UsersRepository(userModel);
const userLoginServices = new UserLoginServices(usersRepository);
const userLoginController = new UserLoginController(userLoginServices);

export default userLoginController;
