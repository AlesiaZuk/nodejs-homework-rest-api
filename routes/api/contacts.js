const express = require("express");

const {
  listAllContacts,
  listContactById,
  addNewContact,
  changeContact,
  deleteContact,
} = require("../../controllers");

const router = express.Router();

router.get("/", listAllContacts);

router.get("/:id", listContactById);

router.post("/", addNewContact);

router.put("/:id", changeContact);

router.delete("/:id", deleteContact);

module.exports = router;
