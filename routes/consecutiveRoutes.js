const express = require('express');
const router = express.Router();
const consecutiveController = require('../controllers/consecutiveController');

// Ruta para obtener todos los consecutivos
router.get('/', consecutiveController.getAllConsecutives);

// Ruta para obtener un consecutivo específico por ID
router.get('/:id', consecutiveController.getConsecutiveById);

// Ruta para crear un nuevo consecutivo
router.post('/', consecutiveController.createConsecutive);

// Ruta para actualizar un consecutivo existente
router.put('/:id', consecutiveController.updateConsecutive);

// Ruta para eliminar un consecutivo
router.delete('/:id', consecutiveController.deleteConsecutive);

router.patch('/:id', consecutiveController.updateStatus);


module.exports = router;