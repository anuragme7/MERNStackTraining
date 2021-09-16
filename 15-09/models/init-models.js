var DataTypes = require("sequelize").DataTypes;
var _department = require("./department");
var _role = require("./role");
var _user = require("./user");
var _userinrole = require("./userinrole");

function initModels(sequelize) {
  var department = _department(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var userinrole = _userinrole(sequelize, DataTypes);

  userinrole.belongsTo(role, { as: "Role", foreignKey: "RoleId"});
  role.hasOne(userinrole, { as: "userinrole", foreignKey: "RoleId"});
  userinrole.belongsTo(user, { as: "User", foreignKey: "UserId"});
  user.hasOne(userinrole, { as: "userinrole", foreignKey: "UserId"});

  return {
    department,
    role,
    user,
    userinrole,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
