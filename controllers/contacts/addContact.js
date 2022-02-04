const createError = require("http-errors");

const {
  contact: { Contact, joiSchema },
} = require("../../models");

const addNewContact = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const { _id } = req.user;
    const result = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addNewContact;
