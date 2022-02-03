const express = require("express");

const {
  listAllContacts,
  listContactById,
  addNewContact,
  changeContact,
  updateStatusContact,
  deleteContact,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", listAllContacts);

router.get("/:id", listContactById);

router.post("/", addNewContact);

router.put("/:id", changeContact);

router.patch("/:id/favorite", updateStatusContact);

router.delete("/:id", deleteContact);

module.exports = router;
