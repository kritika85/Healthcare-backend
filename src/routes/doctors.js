const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { 
  createDoctor, 
  getDoctors, 
  getDoctor, 
  updateDoctor, 
  deleteDoctor 
} = require('../controllers/doctorController');

const router = express.Router();

// All doctor routes require authentication
router.use(authenticateToken);

router.post('/', createDoctor);
router.get('/', getDoctors);
router.get('/:id', getDoctor);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);

module.exports = router;