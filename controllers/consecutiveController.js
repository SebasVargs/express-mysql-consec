const db = require('../models');

// Crear un nuevo consecutivo
const createConsecutive = async (req, res) => {
  try {
    const newConsecutive = await db.Consecutive.create(req.body);
    res.status(201).json(newConsecutive);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el consecutivo', error });
  }
};

// Obtener todos los consecutivos
const getAllConsecutives = async (req, res) => {
  try {
    const consecutives = await db.Consecutive.findAll({
      include: [
        {
          model: db.Status,
          as: 'status'
        }
      ]
    });
    res.json(consecutives);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los consecutivos', error });
  }
};

// Obtener un consecutivo por ID
const getConsecutiveById = async (req, res) => {
  try {
    const { id } = req.params;
    const consecutive = await db.Consecutive.findByPk(id, {
      include: [
        {
          model: db.Status,
          as: 'status'
        }
      ]
    });

    if (!consecutive) {
      return res.status(404).json({ message: 'Consecutivo no encontrado' });
    }

    res.json(consecutive);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el consecutivo', error });
  }
};

// Actualizar un consecutivo
const updateConsecutive = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await db.Consecutive.update(req.body, { where: { id } });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Consecutivo no encontrado' });
    }

    const updatedConsecutive = await db.Consecutive.findByPk(id);
    res.json(updatedConsecutive);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el consecutivo', error });
  }
};

// Eliminar un consecutivo
const deleteConsecutive = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await db.Consecutive.destroy({ where: { id } });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Consecutivo no encontrado' });
    }

    res.json({ message: 'Consecutivo eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el consecutivo', error });
  }
};

// Actualizar solo el estado de un consecutivo
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_status } = req.body;
    
    // Validar que se proporcione el id_status
    if (id_status === undefined) {
      return res.status(400).json({ message: 'Se requiere el campo id_status' });
    }
    
    // Buscar el consecutivo
    const consecutive = await db.Consecutive.findByPk(id);
    
    if (!consecutive) {
      return res.status(404).json({ message: 'Consecutivo no encontrado' });
    }
    
    // Actualizar solo el estado
    consecutive.id_status = id_status;
    await consecutive.save();
    
    // Obtener el consecutivo actualizado con la información de estado
    const updatedConsecutive = await db.Consecutive.findByPk(id, {
      include: [
        {
          model: db.Status,
          as: 'status'
        }
      ]
    });
    
    res.json(updatedConsecutive);
  } catch (error) {
    console.error('Error al actualizar el estado del consecutivo:', error);
    res.status(400).json({ message: 'Error al actualizar el estado del consecutivo', error: error.message });
  }
};

module.exports = {
  createConsecutive,
  getAllConsecutives,
  getConsecutiveById,
  updateConsecutive,
  deleteConsecutive,
  updateStatus
};