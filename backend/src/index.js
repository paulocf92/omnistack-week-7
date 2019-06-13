/**
 * This is the entry point for the whole app on the server side.
 * It creates an express app and attach it to node's http server.
 * It also creates a Socket IO instance to share new posts among users
 * currently connected to the app and attach it to the server.
 * It connects to a remote mongodb database using mongoose.
 * The express app adds Socket IO handler to the request, then proceeds.
 * The express app also enables CORS for outside requests, sets up files to
 * be stored in uploads/resized statically, handles routes set up in routes
 * file, and listens requests in port 3333.
 */
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect(
  "mongodb+srv://instagram:z2PCrWiu1TCnT5gg@cluster0-kj0oa.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  req.io = io;

  next();
});

app.use(cors());

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use(require("./routes"));

server.listen(3333);
