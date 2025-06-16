const Joi = require("joi");
const mongoose = require("mongoose");

const orderItemValidation = Joi.object({
  product: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "ObjectId Validation")
    .required(),
  quantity: Joi.number().integer().min(1).required(),
});

const orderValidation = Joi.object({
  items: Joi.array().items(orderItemValidation).min(1).required(),
  totalAmount: Joi.number().positive().required(),
  status: Joi.string().valid("pending", "paid", "failed").default("pending"),
});

module.exports = orderValidation;
