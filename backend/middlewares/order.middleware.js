const orderValodation = require("../validations/order.validator");

const orderValodationMiddleware = (req, res, next) => {
  const { error } = orderValodation.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Validation error:".concat(error.details[0].message) });
  }
  next();
};

module.exports = orderValodationMiddleware;
