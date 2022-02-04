const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const {
  user: { User },
} = require("../models");

const { SECRET_KEY } = process.env;

const checkToken = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw createError(401, "Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    console.log(id);
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      throw createError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = checkToken;
