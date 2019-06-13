/**
 * Use Express' Router to handle all requests to the appropriate controllers.
 * The POST route "/posts" will additionally pass through the upload middleware
 * to allow/handle file uploading in PostController's store method.
 * The upload middleware is an instance of multer using the multerConfig (namely
 * uploadConfig) created previously.
 */
const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

const PostController = require("./controllers/PostController");
const LikeController = require("./controllers/LikeController");

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get("/posts", PostController.index);
routes.post("/posts", upload.single("image"), PostController.store);

routes.post("/posts/:id/like", LikeController.store);

module.exports = routes;
