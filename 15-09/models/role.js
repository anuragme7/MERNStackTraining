const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role', {
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RoleName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: "RoleName"
    }
  }, {
    sequelize,
    tableName: 'role',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RoleId" },
        ]
      },
      {
        name: "RoleName",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RoleName" },
        ]
      },
    ]
  });
};
