const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { User, joiSignupSchema } = require("../../models/user");
const { sendMail } = require("../../helpers");

const signup = async (req, res, next) => {
  try {
    const { error } = joiSignupSchema.validate(req.body);
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
    const verificationToken = v4();

    const result = await User.create({
      email,
      password: hashPassword,
      verificationToken,
      avatarURL,
    });
    const mail = {
      to: email,
      subject: "Email confirmation",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click to verify your email!</a>`,
    };
    await sendMail(mail);
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
