import { model } from "mongoose";
import { UsersController } from "../controllers/users.controller";
import { UsersRepository } from "../repositories/users.repositoy";
import { UserSchema } from "../schema/user.schema";
import { UsersServices } from "../services/user.services";

const userModel = model("User", UserSchema);
const repository = new UsersRepository(userModel);
const services = new UsersServices(repository);
export const userController = new UsersController(services);
