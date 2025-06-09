const Joi = require("joi");

const singupValidation = Joi.object({
  name: Joi.string().min(2).max(24).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(16)
    .pattern(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[\W_])[A-Za-z\d\W_]{8,16}$/)
    .required(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(16).required(),
});

module.exports = { singupValidation, loginValidation };
