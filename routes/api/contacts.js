const express = require("express");

const {
  listAllContacts,
  listContactById,
  addNewContact,
  changeContact,
  updateStatusContact,
  deleteContact,
} = require("../../controllers/contacts");

const checkToken = require("../../middlewares/checkToken");

const router = express.Router();

router.get("/", checkToken, listAllContacts);

router.get("/:id", listContactById);

router.post("/", checkToken, addNewContact);

router.put("/:id", changeContact);

router.patch("/:id/favorite", updateStatusContact);

router.delete("/:id", deleteContact);

module.exports = router;
