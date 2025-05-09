const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Status = sequelize.define('Status', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'El nombre del estado es obligatorio' },
        notEmpty: { msg: 'El nombre del estado no puede estar vacío' }
      }
    }
  }, {
    tableName: 'status',
    timestamps: false,
    underscored: true
  });

  return Status;
};