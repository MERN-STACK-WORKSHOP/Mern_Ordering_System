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
  price: Joi.number().positive().required(),
});

const orderValidation = Joi.object({
  user: Joi.string().length(24).required(),
  items: Joi.array().items(orderItemValidation).min(1).required(),
  totalAmount: Joi.number().positive().required(),
  status: Joi.string().valid("pending", "paid", "failed").optional(),
});

module.exports = orderValidation;
