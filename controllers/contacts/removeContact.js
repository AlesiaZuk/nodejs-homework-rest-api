const createError = require("http-errors");

const {
  contact: { Contact },
} = require("../../models");

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    console.log(result);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json({
      message: "contact deleted",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
