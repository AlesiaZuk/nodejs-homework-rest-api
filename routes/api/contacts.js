const express = require("express");

const {
  listAllContacts,
  listContactById,
  addNewContact,
  changeContact,
  updateStatusContact,
  deleteContact,
} = require("../../controllers/contacts");

const { checkToken } = require("../../middlewares");

const router = express.Router();

router.get("/", checkToken, listAllContacts);

router.get("/:id", checkToken, listContactById);

router.post("/", checkToken, addNewContact);

router.put("/:id", checkToken, changeContact);

router.patch("/:id/favorite", checkToken, updateStatusContact);

router.delete("/:id", checkToken, deleteContact);

module.exports = router;
