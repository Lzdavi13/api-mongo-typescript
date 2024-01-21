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

app.get("/users", (request, response) => {
  return userController.findAllUsers(request, response);
});

app.put("/user/:id", (request, response) => {
  return userController.updateUser(request, response);
});

app.delete("/user/:id", (request, response) => {
  return userController.deleteUser(request, response);
});

app.listen(3333, () => {
  console.log("servidor iniciado");
});
