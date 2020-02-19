var mongoose = require("mongoose");
//khai báo các field object trong DB
var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});

var User = mongoose.model("Users", userSchema, "users");

module.exports = User;
