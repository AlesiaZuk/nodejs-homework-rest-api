const createError = require("http-errors");

const { removeContact } = require("../models/contactsOperations");

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
      throw createError(404, "Not found");
    }
    const data = result[0];
    res.json({
      message: "contact deleted",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
