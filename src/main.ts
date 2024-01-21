import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectMongoDB } from "./database/connection";
import routes from "./routes/routes";

const app = express();

connectMongoDB();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log("servidor iniciado");
});
