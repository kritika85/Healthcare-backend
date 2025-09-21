const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { 
  createMapping, 
  getMappings, 
  getPatientMappings, 
  deleteMapping 
} = require('../controllers/mappingController');

const router = express.Router();

// All mapping routes require authentication
router.use(authenticateToken);

router.post('/', createMapping);
router.get('/', getMappings);
router.get('/:patientId', getPatientMappings);
router.delete('/:id', deleteMapping);

module.exports = router;