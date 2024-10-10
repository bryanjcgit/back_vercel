const Signo = require('../models/signo');


const getAllSignos = async (req, res) => {
  try {
    const signos = await Signo.find();
    res.json(signos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los signos' });
  }
};


const getOneSigno = async (req, res) => {
  const { nombre } = req.params;

  try {
    const signo = await Signo.findOne({ nombre });

    if (!signo) {
      return res.status(404).json({ message: 'Signo no encontrado' });
    }

    res.json(signo);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el signo' });
  }
};


const updateSigno = async (req, res) => {
  const { nombre } = req.params;
  const { descripcion } = req.body;

  try {
    const signo = await Signo.findOneAndUpdate({ nombre }, { descripcion }, { new: true });

    if (!signo) {
      return res.status(404).json({ message: 'Signo no encontrado' });
    }

    res.json({ message: "Signo actualizado correctamente", signo });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el signo' });
  }
};


const createSigno = async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    const newSigno = new Signo({ nombre, descripcion });
    await newSigno.save();
    res.status(201).json({ message: "Signo creado exitosamente", newSigno });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: `El signo '${nombre}' ya está registrado` });
    }
    res.status(500).json({ message: 'Error al crear el signo' });
  }
};


const deleteSigno = async (req, res) => {
  const { nombre } = req.params;

  try {
    const signo = await Signo.findOneAndDelete({ nombre });

    if (!signo) {
      return res.status(404).json({ message: 'Signo no encontrado' });
    }

    res.json({ message: 'Signo eliminado correctamente', signo });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el signo' });
  }
};

module.exports = {
  getAllSignos,
  getOneSigno,
  updateSigno,
  createSigno,
  deleteSigno
};
