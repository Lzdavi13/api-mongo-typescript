import cors from "cors";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import { connectMongoDB } from "./database/connection";
import { errorHandling } from "./middleware/ErrorHandling";
import routes from "./routes/routes";

const app = express();

connectMongoDB();

app.use(cors());
app.use(express.json());
app.use(routes);
routes.use(errorHandling);

app.listen(3333, () => {
  console.log("servidor iniciado");
});
