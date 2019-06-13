/**
 * store() => Find post by id and increase likes count by add, forwarding
 * updated info to anyone connected to this app.
 */
const Post = require("../models/Post");

module.exports = {
  async store(req, res) {
    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    req.io.emit("like", post);

    return res.json(post);
  }
};
