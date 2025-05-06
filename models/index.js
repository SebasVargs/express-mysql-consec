const { Sequelize } = require('sequelize');

// Puedes mover esta configuración a un archivo separado si lo prefieres
const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'mysql',
  username: 'root',    
  password: '',    
  database: 'conmer',
});

const db = {};

// Importar modelos
db.Status = require('./status')(sequelize);
db.Consecutive = require('./consecutive')(sequelize);
db.Document = require('./document')(sequelize);
// Si tienes un modelo User, inclúyelo así:
// db.User = require('./user')(sequelize);

// Configurar relaciones después de cargar todos los modelos
require('./relations')(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;