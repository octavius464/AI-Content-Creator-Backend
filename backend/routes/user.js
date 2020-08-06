const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.js");

router.post("/signup", UserController.signup_user);
router.post('/login', UserController.login_user);
router.delete('/:userId', UserController.delete_user);

module.exports = router;