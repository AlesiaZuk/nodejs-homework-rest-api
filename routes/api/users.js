const express = require("express");
const {
  users: { signup, login, current, logout, subscription, avatars },
} = require("../../controllers");
const { checkToken, upload } = require("../../middlewares");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/current", checkToken, current);
router.get("/logout", checkToken, logout);
router.patch("/", checkToken, subscription);
router.patch("/avatars", checkToken, upload.single("avatar"), avatars);

module.exports = router;
