const express = require("express");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const app = express();
var bodyParser = require('body-parser')
const port = 3003;

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) =>
  res.render("index", {
    name: "Huỳnh Văn Thiện",
    age: 20
  })
);

app.get("/users", (req, res) =>
  res.render("users/index", {
    users: db.get('users').value()
  })
);

app.get("/users/search", (req, res) => {
  const value = req.query.q;
  const result = db.get('users').filter(item => {
    return item.name.indexOf(value) !== -1;
  });
  console.log(result)
  res.render("users", {
    users: result
  });
});
app.post("/users/create", (req, res) => {
  console.log(req, res)
  db.get('users').push(req.body).write();
  res.redirect('/users');
});
app.get("/users/create", (req, res) => {
  res.render("users/create");
});

app.listen(port, () => console.log(`Hvt ${port}`));
