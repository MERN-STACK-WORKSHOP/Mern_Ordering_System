/**
 * @param {...string} allowedRoles
 * @returns {function} middleware
 * @description Middleware to check if the user has the required role
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
