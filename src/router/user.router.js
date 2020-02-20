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
// router.get("/view/edit/:id", controller.GETeditUser);
//func edit user
// router.put("/view/edit/:id", controller.PUTeditUser);
//page detail user
router.get("/view/detail/:id", controller.detail);

router
  .route("/view/edit/:id")
  .all(function(req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next();
  })
  .get(controller.GETeditUser)
  .post(controller.PUTeditUser)
  .delete(function(req, res, next) {
    next(new Error("not implemented"));
  });
router.get("/delete/:id", controller.deleteUser);

module.exports = router;
