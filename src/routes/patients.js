const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { 
  createPatient, 
  getPatients, 
  getPatient, 
  updatePatient, 
  deletePatient 
} = require('../controllers/patientController');

const router = express.Router();

// All patient routes require authentication
router.use(authenticateToken);

router.post('/', createPatient);
router.get('/', getPatients);
router.get('/:id', getPatient);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

module.exports = router;