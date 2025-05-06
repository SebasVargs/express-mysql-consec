const mysql = require('mysql2/promise');
require('dotenv').config();

// Creamos un pool de conexiones para mejor rendimiento
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'conmer',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para conectar y verificar la conexión
const connectDB = async () => {
  try {
    // Verificamos la conexión
    const connection = await pool.getConnection();
    console.log(`MySQL conectado: ${process.env.MYSQL_HOST || 'localhost'}`);
    console.log(`Base de datos: ${process.env.MYSQL_DATABASE || 'appdb'}`);
    console.log('Conexión activa');
    
    // Liberamos la conexión al pool
    connection.release();
    
    // Manejadores para cierre limpio de la aplicación
    const gracefulShutdown = async (msg, callback) => {
      try {
        await pool.end();
        console.log(`MySQL desconectado a través de ${msg}`);
        callback();
      } catch (err) {
        console.error(`Error al cerrar la conexión: ${err.message}`);
        callback();
      }
    };

    process.once('SIGUSR2', () => {
      gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
      });
    });

    process.on('SIGINT', () => {
      gracefulShutdown('terminación de la aplicación', () => {
        process.exit(0);
      });
    });

    process.on('SIGTERM', () => {
      gracefulShutdown('terminación de Heroku', () => {
        process.exit(0);
      });
    });

    return pool;
  } catch (error) {
    console.error(`Error al conectar a MySQL: ${error.message}`);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };