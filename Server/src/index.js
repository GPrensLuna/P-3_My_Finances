
import server from "./app.js";
import './database.js'
import { PORT, LOCALHOST } from "./config.js";

const startServer = async () => {
  try {
    server.listen(PORT, LOCALHOST, () => {

      console.log(`Server is listening at http://${LOCALHOST}:${PORT}/api : `);

      //console.log("https://printcraft3d.up.railway.app");
    });
  } catch (error) {
    console.error(" Error starting the server:", error);
  }
};

startServer();