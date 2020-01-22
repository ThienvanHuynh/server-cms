var db = require("../db");
const shortid = require("shortid");

module.exports.search = (req, res) => {
  console.log("2121212121", req.query);
  const value = req.query.name;
  console.log(db.get("users").value());
  const result = db
    .get("users")
    .value()
    .filter(item => {
      return item.name.indexOf(value) !== -1;
    });
  console.log("result=================>", result);
  res.render("users", {
    users: result
  });
};
module.exports.view = (req, res) =>
  res.render("users/view", {
    users: db.get("users").value()
  });
module.exports.index = (req, res) =>
  res.render("users/index", {
    users: db.get("users").value()
  });
module.exports.create = (req, res) => {
  req.body.id = shortid.generate();
  console.log(req.body);
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
};
module.exports.getCreate = (req, res) => {
  res.render("users/create");
};
module.exports.detail = (req, res) => {
  const id = req.params.id;
  const users = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("users/view", {
    user: users
  });
};
module.exports.delete = (req, res) => {
  console.log("resss", res);
  console.log("req", req);
};
