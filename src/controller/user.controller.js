var User = require("../model/user.model");
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
  User.find().then(function(users) {
    res.render("user/index", {
      users: users
    });
  });
};

module.exports.index;
module.exports.create = (req, res) => {
  req.body.id = shortid.generate();
  try {
    const newUser = new User(req.body);
    newUser.save(function(err) {
      if (err) {
        alert("Create user failed!");
      }
    });
  } catch (err) {
    next(err);
  }
  res.redirect("/users");
};
module.exports.getCreate = (req, res) => {
  res.render("user/create");
};

module.exports.GETeditUser = (req, res) => {
  const id = req.params.id;
  try {
    const data = User.findOne({ _id: id });
    data.exec(function(err, user) {
      if (!user) {
        alert("user not exis");
        return;
      } else {
        res.render("user/edit", {
          user: user
        });
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports.PUTeditUser = (req, res) => {
  console.log("helllo");
  const id = req.params.id;
  console.log("body:", body);
  try {
    const data = User.f;
    User.findByIdAndUpdate(id, data, function(res) {
      console.log("resssssss:", res);
    });
  } catch (err) {
    next(err);
  }
};

module.exports.detail = (req, res) => {
  const id = req.params.id;

  try {
    const data = User.findOne({ _id: id });
    data.exec(function(err, user) {
      if (!user) {
        alert("user not exis");
        return;
      } else {
        res.render("user/detail", {
          user: user
        });
      }
    });
  } catch (err) {
    next(err);
  }
};
