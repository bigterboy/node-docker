const express = require("express");

const userControl = require("../controllers/authController");

const router = express.Router();

// router.post("/signUp", userControl.signUp);
router.route("/signUp").post(userControl.signUp);
router.route("/login").post(userControl.login);

module.exports = router;
