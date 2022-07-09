const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;
const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDb Connected");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
}

startServer();
