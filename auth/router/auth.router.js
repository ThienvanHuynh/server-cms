var express = require("express");
var multer = require("multer");
var controller = require("../controller/auth.controller");
var router = express.Router();
console.log("auth router");
var upload = multer({ dest: "./public/uploads/" });

router.get("/login", controller.login);
router.post("/login", controller.postLogin);
router.get("/register", controller.register);
router.post("/register", upload.single("avatar"), controller.postRegister);
router.get("/logout", controller.logout);
module.exports = router;
