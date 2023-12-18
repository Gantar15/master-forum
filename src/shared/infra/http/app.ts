import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { isProduction } from "../../../config";
import morgan from "morgan";
import { v1Router } from "./api/v1";

const origin = {
  // origin: isProduction ? '' : '*',
  origin: "*",
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(compression());
app.use(helmet());
app.use(morgan("combined"));

app.use("/api/v1", v1Router);

const port = +process.env.PORT || 5500;

app.listen(port, process.env.HOST, () => {
  console.log(`[App]: Listening on ${process.env.HOST}:${port}`);
});
