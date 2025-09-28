const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Necesitas instalar: npm install axios
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

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API funcionando', timestamp: new Date().toISOString() });
});

// Función para auto-ping
const autoPing = () => {
  const url = `http://localhost:${PORT}/api/health`;
  
  axios.get(url)
    .then(response => {
      console.log(`✅ Ping exitoso: ${new Date().toLocaleString()}`);
    })
    .catch(error => {
      console.error(`❌ Error en ping: ${error.message}`);
    });
};

// Iniciar auto-ping cada 30 segundos (solo en producción)
if (process.env.NODE_ENV === 'production') {
  console.log('🔄 Iniciando auto-ping cada 30 segundos...');
  setInterval(autoPing, 30000); // 30 segundos
  
  // Primer ping inmediato
  setTimeout(autoPing, 5000);
}

// Ruta por defecto para manejar errores
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