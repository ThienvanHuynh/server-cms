var db = require("../db");
const shortid = require("shortid");
module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  var user = db
    .get("accounts")
    .find({ email: email })
    .value();
  console.log(user);
  if (!user) {
    res.render("auth/login", {
      errors: ["User does not exits"],
      values: req.body
    });
    return;
  }
  if (user.password !== password) {
    res.render("auth/login", {
      errors: ["Wrong password"],
      values: req.body
    });
    return;
  }
  res.cookie("userid", user.id, {
    signed: true,
    expires: new Date(Date.now() + 360000) // cookie will be removed
  });
  res.redirect("/users");
};

module.exports.register = (req, res) => {
  res.render("auth/register");
};

module.exports.postRegister = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  req.body.id = shortid.generate();
  var account = db
    .get("accounts")
    .find({ email: email })
    .value();
  console.log(account);
  if (account) {
    res.render("auth/register", {
      error: "Tài khoản đã tồn tại",
      values: req.body
    });
    return;
  } else {
    db.get("accounts")
      .push(req.body)
      .write();
    res.render("auth/register", {
      success: "Đăng kí thành công!",
      values: req.body
    });
  }
};
