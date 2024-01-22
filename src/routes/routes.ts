import { Router } from "express";
import { errorHandling } from "../middleware/ErrorHandling";
import router from "./user.routes";

const routes = Router();

routes.use(router);
routes.use(errorHandling);

export default routes;
