const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createPatient = async (req, res) => {
  try {
    const { name, age } = req.body;

    if (!name || !age) {
      return res.status(400).json({ error: 'Name and age are required' });
    }

    const patient = await prisma.patient.create({
      data: {
        name,
        age: parseInt(age),
        userId: req.user.id
      }
    });

    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await prisma.patient.findMany({
      where: { userId: req.user.id }
    });

    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getPatient = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await prisma.patient.findFirst({
      where: { 
        id: parseInt(id),
        userId: req.user.id
      }
    });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age } = req.body;

    const patient = await prisma.patient.findFirst({
      where: { 
        id: parseInt(id),
        userId: req.user.id
      }
    });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const updatedPatient = await prisma.patient.update({
      where: { id: parseInt(id) },
      data: { name, age: parseInt(age) }
    });

    res.json(updatedPatient);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await prisma.patient.findFirst({
      where: { 
        id: parseInt(id),
        userId: req.user.id
      }
    });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    await prisma.patient.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createPatient, getPatients, getPatient, updatePatient, deletePatient };