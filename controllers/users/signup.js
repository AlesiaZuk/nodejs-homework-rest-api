const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User, joiSignupSchema } = require("../../models/user");

const signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const { error } = joiSignupSchema.validate(req.body);
    console.log(error);
    if (error) {
      throw createError(400, "Error from Joi or another validation library");
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, "Email in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const avatarURL = gravatar.url(email);
    const result = await User.create({
      email,
      password: hashPassword,
      avatarURL,
    });
    res.status(201).json({
      user: {
        email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
