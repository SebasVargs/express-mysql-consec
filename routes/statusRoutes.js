const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

// Ruta para obtener todos los estados
router.get('/', statusController.getAllStatuses);

// Ruta para obtener un estado específico por ID
router.get('/:id', statusController.getStatusById);

// Ruta para crear un nuevo estado
router.post('/', statusController.createStatus);

// Ruta para actualizar un estado existente
router.put('/:id', statusController.updateStatus);

// Ruta para eliminar un estado
router.delete('/:id', statusController.deleteStatus);

module.exports = router;