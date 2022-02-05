const express = require("express");
const {
  users: { signup, login, current, logout },
} = require("../../controllers");
const checkToken = require("../../middlewares/checkToken");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/current", checkToken, current);
router.get("/logout", checkToken, logout);

module.exports = router;
