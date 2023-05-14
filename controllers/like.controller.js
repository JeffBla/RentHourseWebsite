const likeModel = require("../models/like.model");

const likeCheck = async (req, res) => {
  try {
    await likeModel.likeCheck(req.user.id, req.body.id);
  } catch (err) {
    return res.send(false);
  }
  return res.send(true);
};

module.exports = { likeCheck };
