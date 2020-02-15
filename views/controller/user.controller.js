var db = require("../db");
var User = require("../model/users.model");
const shortid = require("shortid");

module.exports.search = (req, res) => {
  const value = req.query.name;
  const result = db
    .get("users")
    .value()
    .filter(item => {
      return item.name.indexOf(value) !== -1;
    });
  res.render("users", {
    users: result
  });
};
module.exports.user = (req, res) => {
  // var page = parseInt(req.query.page) || 1;
  // var perPage = 10;
  // var start = (page - 1) * perPage;
  // var end = page * perPage;
  // const data = db
  //   .get("users")
  //   .value()
  //   .slice(start, end);
  // return res.render("users/index", {
  //   users: data,
  //   total: data.length / 10
  // });

  User.find().then(function(users) {
    res.render("users/index", {
      users: users
    });
  });
};

module.exports.index;
module.exports.create = (req, res) => {
  req.body.id = shortid.generate();
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
