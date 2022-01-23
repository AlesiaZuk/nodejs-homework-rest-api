const createError = require("http-errors");

const { addContact } = require("../models/contactsOperations");
const contactsSchema = require("../middlewares");

const addNewContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const result = await addContact({ ...req.body });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addNewContact;
