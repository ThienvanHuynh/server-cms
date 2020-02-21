var Accounts = require("../model/auth.model");
module.exports.requireAuth = function(req, res, next) {
  if (!req.signedCookies.userid) {
    res.redirect("/auth/login");
    return;
  }
  const data = Accounts.findOne({ _id: req.signedCookies.userid });
  data.exec(function(err, user) {
    if (!user) {
      res.redirect("/auth/login");
      return;
    }
    res.locals.user = user;
  });
  next();
};
