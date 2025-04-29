import fs from "fs";
import cors from "cors";
import https from "https";
import express from "express";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

import routeTriangulo from "./routes/route.triangulo.js";

const port = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = ["https://seusite.com.br"];

  if (origin && allowedOrigins.includes(origin)) {
    cors({
      origin: origin,
      credentials: true,
    })(req, res, next);
  } else {
    next();
  }
});

app.use(routeTriangulo);

app.get("/", (req, res) => {
  res.send("API Node js");
});

if (process.env.HTTPS === "false") {
  app.listen(port, () => {
    console.log("Servidor rodando na porta: " + port);
  });
} else {
  https
    .createServer(
      {
        key: fs.readFileSync("CAMINHO_ARQUIVO-KEY"),
        cert: fs.readFileSync("CAMINHO_ARQUIVO-CERT"),
      },
      app
    )
    .listen(port, () => {
      console.log("Servidor HTTPS rodando na porta: " + port);
    });
}
