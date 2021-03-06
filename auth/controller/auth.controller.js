var db = require("../../src/db");
var Accounts = require("../model/auth.model");
const shortid = require("shortid");
module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var data = Accounts.findOne({ email: email });
  data.exec(function (err, user) {
    if (!user) {
      res.render("auth/login", {
        errors: ["User does not exits"],
        values: req.body,
      });
      return;
    }
    if (user.password !== password) {
      res.render("auth/login", {
        errors: ["Wrong password"],
        values: req.body,
      });
      return;
    }
    res.cookie("userid", user.id, {
      signed: true,
      expires: new Date(Date.now() + 3600000), // cookie will be removed
    });
    res.redirect("/users");
  });
};

module.exports.register = (req, res) => {
  res.render("auth/register");
};

module.exports.postRegister = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  req.body.id = shortid.generate();

  try {
    const newAccount = new Accounts(req.body);
    Accounts.find({ email: email }).exec(function (err, docs) {
      if (docs.length > 0) {
        res.render("auth/register", {
          error: "Email đăng kí đã tồn tại",
          values: req.body,
        });
        return;
      } else {
        newAccount.save(function (err) {
          if (err) return handleError(err);
          res.render("auth/register", {
            success: "Đăng kí thành công!",
            values: req.body,
          });
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports.logout = (req, res, next) => {
  console.log("logout");
  res.clearCookie("userid");
  res.redirect("/");
};
