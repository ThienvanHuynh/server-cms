var mongoose = require("mongoose");
//khai báo các field object trong DB
var Accounts = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  avatar: String
});

var Accounts = mongoose.model("Accounts", Accounts, "auths");

module.exports = Accounts;
