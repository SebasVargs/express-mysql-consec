const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

// Ruta para obtener todos los documentos
router.get('/', documentController.getAllDocuments);

// Ruta para obtener un documento específico por ID
router.get('/:id', documentController.getDocumentById);

// Ruta para crear un nuevo documento
router.post('/', documentController.createDocument);

// Ruta para actualizar un documento existente
router.put('/:id', documentController.updateDocument);

// Ruta para eliminar un documento
router.delete('/:id', documentController.deleteDocument);

module.exports = router;