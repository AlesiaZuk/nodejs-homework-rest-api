const createError = require("http-errors");

const { Contact, favoriteJoiSchema } = require("../../models");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = favoriteJoiSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing fields");
    }
    const { id } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
