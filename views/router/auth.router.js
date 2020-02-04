var express = require("express");
var controller = require("../controller/auth.controller");
var router = express.Router();

router.get("/login", controller.login);
router.post("/login", controller.postLogin);
router.get("/register", controller.register);
router.post("/register", controller.postRegister);
module.exports = router;
