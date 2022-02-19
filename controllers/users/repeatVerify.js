const createError = require("http-errors");
const { sendMail } = require("../../helpers");

const { User, joiVerifyEmailSchema } = require("../../models/user");

const repeatVerify = async (req, res, next) => {
  try {
    const { error } = joiVerifyEmailSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing required field email");
    }
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user.verify) {
      throw createError(400, "Verification has already been passed");
    }
    const mail = {
      to: email,
      subject: "Email confirmation",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click to verify your email!</a>`,
    };
    sendMail(mail);
    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = repeatVerify;
