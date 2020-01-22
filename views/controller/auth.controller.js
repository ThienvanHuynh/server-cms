var db = require("../db");

module.exports.login = (req, res) => {
  res.render("auth/login");
};
module.exports.postLogin = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  var user = db
    .get("users")
    .find({ email: email })
    .value();

  console.log("user", user.email);
  console.log("pass", user.password);
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
  res.redirect("/users");
};
