require("dotenv").config();

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const express = require("express");
const app = express();
var Userrouter = require("./src/router/user.router");
var authrouter = require("./auth/router/auth.router");
const port = 3880;
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("src"));
app.use(express.static("public"));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser(process.env.SESSION_SECRET));

app.set("view engine", "pug");
app.set("views", "./src/views");

app.get("/", (req, res) => res.render("index"));
app.use("/users", Userrouter);
app.use("/auth", authrouter);

// Catch 404 Errors and forward them to error handler
// app.use((req, res, next) => {
//   const err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

app.listen(port, () => console.log(`Express-Mongo ${port}`));
