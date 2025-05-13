const express = require('express');
const db = require('./models'); // Importar correctamente los modelos
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')

// Inicializamos Express
const app = express();

app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // o restringe a tu frontend: http://localhost:4200
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(express.json());
app.use(cors({
    origin: ['http://192.168.1.16:4200', 'http://localhost:4200'],
    credentials: true
}));

// Middleware para parsear JSON
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Importa las rutas de los modelos (ajusta las rutas según tu estructura de carpetas)
const consecutiveRoutes = require('./routes/consecutiveRoutes');
const documentRoutes = require('./routes/documentRoutes');
const statusRoutes = require('./routes/statusRoutes');

// Definir rutas
app.use('/api/consecutives', consecutiveRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/status', statusRoutes);

// Ruta básica para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.json({ message: 'API de Consecutivos funcionando correctamente' });
});

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error del servidor', error: err.message });
});

// Levantamos el servidor
const startServer = async () => {
  try {
    // Conexión con la base de datos
    await db.sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');

    // Sincronización de modelos (si quieres que sequelize maneje la creación de tablas)
    await db.sequelize.sync({ force: false }); // Usa force: true solo si quieres eliminar las tablas previas

    // Levantar el servidor
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });

  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

// Iniciar el servidor
startServer();