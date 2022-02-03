const express = require("express");
const {
  users: { signup },
} = require("../../controllers");

const router = express.Router();

router.post("/signup", signup);
// router.post("/login");
// router.get("/current");
// router.get("/logout");

module.exports = router;
