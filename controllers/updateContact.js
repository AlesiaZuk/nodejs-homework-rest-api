const createError = require("http-errors");

const { updateContact } = require("../models/contactsOperations");
const contactsSchema = require("../middlewares");

const changeContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing fields");
    }
    const { id } = req.params;
    const result = await updateContact({ ...req.body, id });
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = changeContact;
