import express, {json } from 'express';
import Routers from './Routers/Router.js';

import configureMiddleware from "./middlewares/auth.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const server = express()

configureMiddleware(server)

server.use(json());
router.get("/", (req, res) => {
  return res.json("Init");
});

server.use("/api", Routers);
server.use(errorMiddleware);

export default server;