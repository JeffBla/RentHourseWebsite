const likeModel = require("../models/like.model");

const likeCheck = async (req, res) => {
  if (req.user == null) {
    return res.redirect("/user/signin");
  }
  try {
    await likeModel.likeCheck(req.user.id, req.body.rent_info_id);
  } catch (err) {
    return res.send(false);
  }
  return res.send(true);
};

const likeUncheck = async (req, res) => {
  try {
    let err = await likeModel.likeUncheck(req.user.id, req.body.rent_info_id);
  } catch (err) {
    return res.send(false);
  }
  return res.send(true);
};

// const userLikeRentInfo = (req, res)=>{

// }

module.exports = { likeCheck, likeUncheck };
