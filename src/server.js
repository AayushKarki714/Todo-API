const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDb Connected");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connect(
  "mongodb+srv://aayush:r4pJ8CofJRvQg3vu@cluster0.3n05x.mongodb.net/?retryWrites=true&w=majority"
);

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
