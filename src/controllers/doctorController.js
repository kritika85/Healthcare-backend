const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createDoctor = async (req, res) => {
  try {
    const { name, specialization } = req.body;

    if (!name || !specialization) {
      return res.status(400).json({ error: 'Name and specialization are required' });
    }

    const doctor = await prisma.doctor.create({
      data: { name, specialization }
    });

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await prisma.doctor.findUnique({
      where: { id: parseInt(id) }
    });

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialization } = req.body;

    const doctor = await prisma.doctor.findUnique({
      where: { id: parseInt(id) }
    });

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const updatedDoctor = await prisma.doctor.update({
      where: { id: parseInt(id) },
      data: { name, specialization }
    });

    res.json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await prisma.doctor.findUnique({
      where: { id: parseInt(id) }
    });

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    await prisma.doctor.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createDoctor, getDoctors, getDoctor, updateDoctor, deleteDoctor };