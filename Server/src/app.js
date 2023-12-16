import express from 'express';
import cors from 'cors';
import Routers from './Routers/Router.js';


const server = express()
const corsOptions = {
  origin: 'http://localhost:5173/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
server.use(cors(corsOptions));
server.use(express.json());
server.use("/api", Routers);

export default server;