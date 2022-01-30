const createError = require("http-errors");

const { Contact, joiSchema } = require("../../models");

const addNewContact = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addNewContact;
