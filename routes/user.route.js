const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user.controller");
//get nonce
router.get("/:address", userController.getNonce);

router.post("/", userController.authenticate);

module.exports = router;
