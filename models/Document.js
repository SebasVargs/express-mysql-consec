const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Document = sequelize.define('Document', {
    source_file: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'El archivo fuente es obligatorio' },
        notEmpty: { msg: 'El archivo fuente no puede estar vacío' }
      }
    },
    date_charge: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'La fecha de carga es obligatoria' },
        isDate: true
      }
    },
    id_consecutive: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'consecutive',
        key: 'id'
      }
    }
  }, {
    tableName: 'document',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    underscored: true
  });

  return Document;
};