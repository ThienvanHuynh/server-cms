var express = require("express");
var router = express.Router();

var controller = require("../controller/index");
router.get("/", controller.index);
router.get("/view", controller.view);
router.get("/search", controller.search);
router.post("/create", controller.create);
router.get("/create", controller.getCreate);

router.get("/:id", controller.detail);

module.exports = router;
