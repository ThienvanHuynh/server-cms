var db = require("../../src/db");
var Accounts = require("../model/auth.model");
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
  var url = req.file.path;
  req.body.id = shortid.generate();
  req.body.avatar =
    "/" +
    url
      .split("\\")
      .slice(1)
      .join("/");

  try {
    const newUser = new Accounts(req.body);
    Accounts.find({ email: email }).exec(function(err, docs) {
      if (docs.length > 0) {
        res.render("auth/register", {
          error: "Tài khoản đã tồn tại",
          values: req.body
        });
        return;
      } else {
        newUser.save(function(err) {
          if (err) return handleError(err);
          res.render("auth/register", {
            success: "Đăng kí thành công!",
            values: req.body
          });
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
