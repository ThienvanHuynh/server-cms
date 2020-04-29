require("dotenv").config();

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

const express = require("express");
const app = express();
var Userrouter = require("./src/router/user.router");
var authrouter = require("./auth/router/auth.router");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
var path = require("path");

const { secretOrKey } = require("./key");
const port = process.env.PORT || 3880;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("src"));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/styles", express.static(path.join(__dirname, "public/styles")));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser(process.env.SESSION_SECRET));

app.set("view engine", "pug");
app.set("views", "./src/views");

app.get("/", (req, res) => {
  console.log("errr");
  return res.render("index");
});
app.use("/users", Userrouter);
app.use("/auth", authrouter);
/** Default route */
app.all("/*", (req, res) => {
  res.send("Have a good day!");
});
app.listen(port, () => console.log(`Express-Mongo ${port}`));
