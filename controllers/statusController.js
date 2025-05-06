const db = require('../models');

// Crear un nuevo estado
const createStatus = async (req, res) => {
  try {
    const newStatus = await db.Status.create(req.body);
    res.status(201).json(newStatus);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el estado', error });
  }
};

// Obtener todos los estados
const getAllStatuses = async (req, res) => {
  try {
    const statuses = await db.Status.findAll();
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los estados', error });
  }
};

// Obtener un estado por ID
const getStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await db.Status.findByPk(id);

    if (!status) {
      return res.status(404).json({ message: 'Estado no encontrado' });
    }

    res.json(status);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el estado', error });
  }
};

// Actualizar un estado
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await db.Status.update(req.body, { where: { id } });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Estado no encontrado' });
    }

    const updatedStatus = await db.Status.findByPk(id);
    res.json(updatedStatus);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el estado', error });
  }
};

// Eliminar un estado
const deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await db.Status.destroy({ where: { id } });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Estado no encontrado' });
    }

    res.json({ message: 'Estado eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el estado', error });
  }
};

module.exports = {
  createStatus,
  getAllStatuses,
  getStatusById,
  updateStatus,
  deleteStatus
};