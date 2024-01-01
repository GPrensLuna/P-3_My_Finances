import express from "express";
import Routers from "./Routers/Router.js";

import configureMiddleware from "./middlewares/auth.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const server = express();

configureMiddleware(server);

server.use(express.json());
// server.use("/", (req, res) => {
//   res.json("Hola");
// });

server.use("/api", Routers);
server.use(errorMiddleware);

export default server;
