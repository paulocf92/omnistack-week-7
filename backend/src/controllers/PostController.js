/**
 * index() => Retrieve all posts, sorting them by createdAt descending order.
 * store() => Catch request body (author, place, description, hashtags) and
 * file property (image to be uploaded). Use lib sharp to resize image to 500px
 * and convert extension to jpg (70% quality), storing it in uploads/resized
 * directory and deleting old, original sized image from uploads dir (using
 * unlinkSync). Store this post to mongodb and forward its info to other users.
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post');

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  },

  async store(req, res) {
    const {
      author, place, description, hashtags,
    } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split('.');

    const fileName = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, 'resized', fileName));

    fs.unlinkSync(req.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName,
    });

    req.io.emit('post', post);

    return res.json(post);
  },
};
