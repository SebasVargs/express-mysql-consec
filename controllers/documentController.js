const db = require('../models');

const createDocument = async (req, res) => {
  try {
    const { id_consecutive, date_charge } = req.body;

    if (!req.file || !id_consecutive || !date_charge) {
      return res.status(400).json({ message: 'Faltan datos o archivo' });
    }

    const newDocument = await db.Document.create({
      source_file: req.file.filename,
      date_charge,
      id_consecutive
    });

    res.status(201).json(newDocument);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el documento', error });
  }
};

// Obtener todos los documentos
const getAllDocuments = async (req, res) => {
  try {
    const documents = await db.Document.findAll({
      include: [
        {
          model: db.Consecutive,
          as: 'consecutive'
        }
      ]
    });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los documentos', error });
  }
};

// Obtener un documento por ID
const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await db.Document.findByPk(id, {
      include: [
        {
          model: db.Consecutive,
          as: 'consecutive'
        }
      ]
    });

    if (!document) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }

    res.json(document);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el documento', error });
  }
};

// Actualizar un documento
const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const [updatedRows] = await db.Document.update(req.body, { where: { id } });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }

    const updatedDocument = await db.Document.findByPk(id);
    res.json(updatedDocument);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el documento', error });
  }
};

// Eliminar un documento
const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await db.Document.destroy({ where: { id } });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }

    res.json({ message: 'Documento eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el documento', error });
  }
};

module.exports = {
  createDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument
};