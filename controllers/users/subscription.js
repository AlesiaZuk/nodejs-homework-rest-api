const createError = require("http-errors");
const { User, joiSubscriptionSchema } = require("../../models/user");

const subscription = async (req, res, next) => {
  try {
    const { error } = joiSubscriptionSchema.validate(req.body);
    if (error) {
      throw createError(400, "Error from Joi or another validation library");
    }
    const { subscription } = req.body;
    const { _id, email } = req.user;
    await User.findByIdAndUpdate(_id, { subscription });
    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = subscription;
