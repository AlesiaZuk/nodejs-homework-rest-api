const { listContacts } = require("../models/contactsOperations");

const listAllContacts = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = listAllContacts;
