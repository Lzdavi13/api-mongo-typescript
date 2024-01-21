import express from "express";
import { database } from "./database/connection";
import { userController } from "./factory/users.controller.factory";

const app = express();
app.use(express.json());

database._connect();

app.post("/user", (request, response) => {
  return userController.createUser(request, response);
});

app.get("/user/:id", (request, response) => {
  return userController.findUser(request, response);
});

app.listen(3333, () => {
  console.log("servidor iniciado");
});
