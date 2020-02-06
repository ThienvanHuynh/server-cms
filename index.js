require("dotenv").config();

const express = require("express");
const app = express();
var Userrouter = require("./views/router/user.router");
var authrouter = require("./views/router/auth.router");
const port = 3004;
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("views"));
app.use(express.static("public"));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser(process.env.SESSION_SECRET));

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => res.render("index"));
app.use("/users", Userrouter);
app.use("/auth", authrouter);

app.listen(port, () => console.log(`Hvt ${port}`));
