const createError = require("http-errors");

const { Contact } = require("../../models");

const listContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id, "-createdAt -updatedAt");
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 404;
    }
    next(error);
  }
};

module.exports = listContactById;
