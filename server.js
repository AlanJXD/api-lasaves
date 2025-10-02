const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const emailRoutes = require('./src/routes/email');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/email', emailRoutes);

// Ruta de salud para monitoreo
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API funcionando',
    timestamp: new Date().toISOString()
  });
});

// Ruta por defecto para manejar errores 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
