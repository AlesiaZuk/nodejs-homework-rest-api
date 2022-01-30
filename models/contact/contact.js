const { Schema, model } = require("mongoose");
const Joi = require("joi");

const phoneRegexp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){9,14}(\s*)?$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema,
};
