const { Contact } = require("../../models");

const listAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = listAllContacts;