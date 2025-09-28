const nodemailer = require('nodemailer');

// Crear el transporter para Hostinger
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Función para verificar la configuración
const verifyTransporter = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return transporter;
  } catch (error) {
    throw error;
  }
};

// Función para probar el envío
const testEmail = async () => {
  try {
    const transporter = createTransporter();
    
    const testMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Email de prueba - Estancia Las Aves',
      text: 'Este es un email de prueba enviado desde tu aplicación.',
      html: '<h1>Email de prueba</h1><p>Este es un email de prueba enviado desde tu aplicación.</p>'
    };

    const info = await transporter.sendMail(testMailOptions);
    return info;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTransporter,
  verifyTransporter,
  testEmail
};