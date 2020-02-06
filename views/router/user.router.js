var express = require("express");
var router = express.Router();
var authMiddleware = require("../middleware/auth.middleware");

var controller = require("../controller/user.controller");

router.get("/", authMiddleware.requireAuth, controller.user);
router.get("/search", controller.search);
router.post("/create", controller.create);
router.get("/create", controller.getCreate);
router.get("/:id", controller.detail);

module.exports = router;
