const createError = require("http-errors");

const { getContactById } = require("../models/contactsOperations");

const listContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = listContactById;
