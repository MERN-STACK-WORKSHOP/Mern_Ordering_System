const { AbilityBuilder, Ability } = require("@casl/ability");
const { ROLES } = require("./constant");

const defineAbilitiesFor = (user) => {
  const { can, build } = new AbilityBuilder(Ability);
  if (user.role === ROLES.ADMIN) {
    can("manage", "all");
    return build();
  }
  if (user.role === ROLES.USER) {
    can("create", "Order");
    can("read", "Order", { user: user._id });
    can("read", "Payment", { order: { user: user._id } });
    can("create", "Payment", { order: { user: user._id } });
    return build();
  }
};

module.exports = defineAbilitiesFor;
