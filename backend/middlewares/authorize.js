const { ForbiddenError } = require("@casl/ability");
const defineAbilitiesFor = require("../utils/ability");

/**
 * @param {...string} allowedRoles
 * @returns {function} middleware
 * @description Middleware to check if the user has the required role using custom logic
 */

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(401)
        .json({ message: "Unauthorized insufficent permissions" });
    }
    next();
  };
};

/**
 * @param {string} action
 * @param {string} subject
 * @returns {function} middleware
 * @description Middleware to check if the user has the required permission using casl
 */
const authorizeAbility = (action, subject) => {
  return async (req, res, next) => {
    try {
      const ability = defineAbilitiesFor(req.user);
      ForbiddenError.from(ability).throwUnlessCan(action, subject);
      next();
    } catch (error) {
      console.error(error);
      res.status(403).json({
        error: "Forbidden",
        message: "You don't have permission to access this resource",
      });
    }
  };
};

module.exports = {
  authorize,
  authorizeAbility,
};
