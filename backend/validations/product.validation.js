const Joi = require("joi");
const mongoose = require("mongoose");

const productValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow("").optional(),
  price: Joi.number().required(),
  stock: Joi.number().integer().min(0).default(0),
  discount: Joi.number().min(0).default(0),
  tags: Joi.array().items(Joi.string()).default([]),
  category: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "ObjectId Validation")
    .required(),
});

module.exports = productValidation;
