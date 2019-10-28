const express = require("express");
const app = express();
const port = 3003;

app.set("view engine", "pug");
app.set("views", "./views");
const users = [{ id: 1, name: "AAAAAA" }, { id: 2, name: "BBBBB" }];

app.get("/", (req, res) =>
  res.render("index", {
    name: "Huỳnh Văn Thiện",
    age: 20
  })
);

app.get("/users", (req, res) =>
  res.render("users/index", {
    users: users
  })
);

app.get("/users/search", (req, res) => {
  const value = req.query.q;
  const result = users.filter(item => {
    return item.name.indexOf(value) !== -1;
  });
  res.render("users/index", {
    users: result
  });
});
app.get("/users/create", (req, res) => {
  res.render("users/create");
});

app.listen(port, () => console.log(`Hvt ${port}`));
