const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user.controller");
const userMiddleware = require("../middlewares/user.middleware");
//get nonce
router.get("/", userMiddleware.requireLogin, userController.accessGame);

module.exports = router;
