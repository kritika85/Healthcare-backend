const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createMapping = async (req, res) => {
  try {
    const { patientId, doctorId } = req.body;

    if (!patientId || !doctorId) {
      return res.status(400).json({ error: 'Patient ID and Doctor ID are required' });
    }

    // Check if patient belongs to user
    const patient = await prisma.patient.findFirst({
      where: { 
        id: parseInt(patientId),
        userId: req.user.id
      }
    });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Check if doctor exists
    const doctor = await prisma.doctor.findUnique({
      where: { id: parseInt(doctorId) }
    });

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const mapping = await prisma.patientDoctorMapping.create({
      data: {
        patientId: parseInt(patientId),
        doctorId: parseInt(doctorId)
      },
      include: {
        patient: true,
        doctor: true
      }
    });

    res.status(201).json(mapping);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getMappings = async (req, res) => {
  try {
    const mappings = await prisma.patientDoctorMapping.findMany({
      where: {
        patient: { userId: req.user.id }
      },
      include: {
        patient: true,
        doctor: true
      }
    });

    res.json(mappings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getPatientMappings = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Check if patient belongs to user
    const patient = await prisma.patient.findFirst({
      where: { 
        id: parseInt(patientId),
        userId: req.user.id
      }
    });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const mappings = await prisma.patientDoctorMapping.findMany({
      where: { patientId: parseInt(patientId) },
      include: { doctor: true }
    });

    res.json(mappings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteMapping = async (req, res) => {
  try {
    const { id } = req.params;

    const mapping = await prisma.patientDoctorMapping.findFirst({
      where: { 
        id: parseInt(id),
        patient: { userId: req.user.id }
      }
    });

    if (!mapping) {
      return res.status(404).json({ error: 'Mapping not found' });
    }

    await prisma.patientDoctorMapping.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Mapping deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createMapping, getMappings, getPatientMappings, deleteMapping };