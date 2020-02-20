var express = require("express");
var router = express.Router();
var authMiddleware = require("../../auth/middleware/auth.middleware");
var controller = require("../controller/user.controller");

router.get("/", authMiddleware.requireAuth, controller.user);
//func search user
router.get("/search", controller.search);
//func create user
router.post("/create", controller.create);
//page create user
router.get("/create", controller.getCreate);
//page edit user
router.get("/view/edit/:id", controller.GETeditUser);
//page detail user
router.get("/view/detail/:id", controller.detail);
//func edit user
router.put("/view/edit/:id", controller.PUTeditUser);

module.exports = router;
