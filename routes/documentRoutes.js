const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Asegúrate de que esta carpeta exista
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname
    cb(null, originalName);
  }
});

const upload = multer({ storage });

router.get('/file/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'uploads', filename);

  // Verificar que el archivo exista
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }

    res.download(filePath); // Fuerza descarga
  });
});

// ==============================
// Rutas
// ==============================

// Obtener todos los documentos
router.get('/', documentController.getAllDocuments);

// Obtener un documento por ID
router.get('/:id', documentController.getDocumentById);

// Crear un nuevo documento (con archivo adjunto)
router.post('/', upload.single('file'), documentController.createDocument);

// Actualizar un documento
router.put('/:id', documentController.updateDocument);

// Eliminar un documento
router.delete('/:id', documentController.deleteDocument);

module.exports = router;
