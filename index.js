const express = require("express");
const app = express();
var Userrouter = require("./views/router/user.router");
var authrouter = require("./views/router/auth.router");
const port = 3003;
var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("views"));

// parse application/json
app.use(bodyParser.json());

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) =>
  res.render("index", {
    name: "Huỳnh Văn Thiện",
    age: 20
  })
);
app.use("/users", Userrouter);
app.use("/auth", authrouter);

app.listen(port, () => console.log(`Hvt ${port}`));
