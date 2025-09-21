const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const mappingRoutes = require('./routes/mappings');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/mappings', mappingRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Healthcare Backend API is running!',
    endpoints: {
      auth: '/api/auth (register, login)',
      patients: '/api/patients',
      doctors: '/api/doctors', 
      mappings: '/api/mappings'
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err.message);
});