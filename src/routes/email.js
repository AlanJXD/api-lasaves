// routes/email.js
const express = require('express');
const { informarRequerimientoInformacion  } = require('../controllers/emailController');
const { testEmail } = require('../config/nodemailer'); // 👈 Importa la función de prueba

const router = express.Router();

// Ruta POST para enviar correos
router.post('/enviarASocios', informarRequerimientoInformacion);

// 👈 Nueva ruta para pruebas
router.get('/test', async (req, res) => {
  try {
    const result = await testEmail();
    res.json({ 
      success: true, 
      message: 'Email de prueba enviado',
      messageId: result.messageId 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error en prueba',
      error: error.message 
    });
  }
});

module.exports = router;