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
module.exports.create = (req, res, next) => {
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

module.exports.GETeditUser = (req, res, next) => {
  console.log("----------->");
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

module.exports.PUTeditUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = req.body;
    await User.findByIdAndUpdate({ _id: id }, data);
    res.redirect("/users");
  } catch (err) {
    next(err);
  }
};

module.exports.detail = (req, res, next) => {
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

module.exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    console.log("--------->", id);
    await User.findByIdAndDelete({ _id: id });
    User.find().then(function(users) {
      res.render("user/index", {
        users: users
      });
    });
  } catch (err) {
    next(err);
  }
};
