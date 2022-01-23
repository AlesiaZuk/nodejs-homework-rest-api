const listAllContacts = require("./listContacts");
const listContactById = require("./getContactById");
const addNewContact = require("./addContact");
const changeContact = require("./updateContact");
const deleteContact = require("./removeContact");

module.exports = {
  listAllContacts,
  listContactById,
  addNewContact,
  changeContact,
  deleteContact,
};
