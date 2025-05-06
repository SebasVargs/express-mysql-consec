const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Consecutive = sequelize.define('Consecutive', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date_soli: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'La fecha de solicitud es obligatoria' },
        isDate: true
      }
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: false,
      validate: {
        notNull: { msg: 'La descripción es obligatoria' },
        len: {
          args: [1, 300],
          msg: 'La descripción no puede exceder los 300 caracteres'
        }
      }
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'El id del usuario es obligatoria'},
      }
    },
    id_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'status', // Asegúrate de que este sea el nombre correcto de la tabla
        key: 'id'
      }
    },
  }, {
    tableName: 'consecutive',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    underscored: true
  });

  return Consecutive;
};