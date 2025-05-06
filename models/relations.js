module.exports = (db) => {
  // CONSECUTIVE -> STATUS
  db.Consecutive.belongsTo(db.Status, {
    foreignKey: 'id_status',
    as: 'status'
  });

  // DOCUMENT -> CONSECUTIVE
  db.Document.belongsTo(db.Consecutive, {
    foreignKey: 'id_consecutive',
    as: 'consecutive'
  });
};