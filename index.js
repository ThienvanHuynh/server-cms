const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var Userrouter = require("./views/router/user.router");
const port = 3003;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(port, () => console.log(`Hvt ${port}`));
