const bcrypt = require("bcrypt");
const { QueryResultError, errors } = require("pg-promise")(/* initOptions */);

const userModel = require("../models/user.model");

const userRegisterPost = async (req, res) => {
  const { username, email, password } = req.body;

  user = await userModel.CheckUser(username, password);
  if (user == null) {
    // 加密密碼
    const encryptedPassword = bcrypt.hashSync(password, 10);

    userModel.UserRegister(username, email, encryptedPassword);

    req.flash("success_flash", "Congrats. Sign Up Success!");
    res.redirect("/user/signin");
  } else {
    req.flash("error_flash", "Error. Please Change Username");
    res.redirect("/user/register");
  }
};

const userSignInSuss = (req, res) => {
  res.redirect(`/users/id/${req.body.username}`);
};

module.exports = { userSignInSuss, userRegisterPost };
