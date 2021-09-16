const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: "Email"
    },
    Password: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UserId" },
        ]
      },
      {
        name: "Email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Email" },
        ]
      },
    ]
  });
};
