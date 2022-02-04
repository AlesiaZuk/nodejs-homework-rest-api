const {
  contact: { Contact },
} = require("../../models");

const listAllContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner: _id }, "-createdAt -updatedAt", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = listAllContacts;
